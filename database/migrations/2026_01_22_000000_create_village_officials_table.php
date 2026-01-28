<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('village_officials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position'); // Jabatan: Kepala Desa, Sekretaris Desa, Kaur, dll
            $table->string('nip')->nullable(); // Nomor Induk Pegawai
            $table->string('photo')->nullable(); // Path to photo
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('education')->nullable(); // Pendidikan terakhir
            $table->date('periode_start')->nullable(); // Awal masa jabatan
            $table->date('periode_end')->nullable(); // Akhir masa jabatan
            $table->integer('order')->default(0); // Urutan tampilan
            $table->boolean('is_active')->default(true);
            $table->boolean('is_head')->default(false); // Apakah kepala desa
            $table->text('welcome_message')->nullable(); // Pesan sambutan khusus untuk kepala desa
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('village_officials');
    }
};
