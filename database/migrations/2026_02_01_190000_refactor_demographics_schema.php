<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 1. Buat tabel kategori baru
        Schema::create('demographic_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Judul Card
            $table->timestamps();
        });

        // 2. Tambahkan kolom FK ke tabel demographics
        Schema::table('demographics', function (Blueprint $table) {
            $table->foreignId('demographic_type_id')->nullable()->after('id')->constrained('demographic_types')->onDelete('cascade');
        });

        // 3. Migrate data lama (Mapping Enum lama ke Tabel Baru)
        $types = [
            'job' => 'Pekerjaan',
            'education' => 'Pendidikan',
            'religion' => 'Agama',
            'gender' => 'Jenis Kelamin'
        ];

        foreach ($types as $key => $name) {
            // Cek apakah ada data dengan tipe ini
            $exists = DB::table('demographics')->where('type', $key)->exists();

            if ($exists) {
                // Buat kategori
                $id = DB::table('demographic_types')->insertGetId([
                    'name' => $name,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                // Update records
                DB::table('demographics')->where('type', $key)->update(['demographic_type_id' => $id]);
            }
        }

        // 4. Drop kolom type lama yang berupa enum
        Schema::table('demographics', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }

    public function down(): void
    {
        // Revert is complex due to data loss on dropColumn. 
        // For development, we assume forward-only fix.
        Schema::table('demographics', function (Blueprint $table) {
            $table->enum('type', ['gender', 'job', 'education', 'religion'])->nullable();
            $table->dropForeign(['demographic_type_id']);
            $table->dropColumn('demographic_type_id');
        });
        Schema::dropIfExists('demographic_types');
    }
};
