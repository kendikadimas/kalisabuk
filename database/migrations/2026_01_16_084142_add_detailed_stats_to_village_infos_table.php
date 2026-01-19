<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('village_infos', function (Blueprint $table) {
            $table->integer('rt_count')->default(0)->after('population')->comment('Jumlah RT');
            $table->integer('rw_count')->default(0)->after('rt_count')->comment('Jumlah RW');
            $table->integer('hamlet_count')->default(0)->after('rw_count')->comment('Jumlah Dusun');

            $table->string('boundary_north')->nullable()->after('hamlet_count')->comment('Batas Utara');
            $table->string('boundary_south')->nullable()->after('boundary_north')->comment('Batas Selatan');
            $table->string('boundary_east')->nullable()->after('boundary_south')->comment('Batas Timur');
            $table->string('boundary_west')->nullable()->after('boundary_east')->comment('Batas Barat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('village_infos', function (Blueprint $table) {
            $table->dropColumn([
                'rt_count',
                'rw_count',
                'hamlet_count',
                'boundary_north',
                'boundary_south',
                'boundary_east',
                'boundary_west'
            ]);
        });
    }
};
