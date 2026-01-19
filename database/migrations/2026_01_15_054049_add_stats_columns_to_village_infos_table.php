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
            $table->string('area_size')->nullable()->after('email')->comment('Luas Wilayah, e.g. 120 Ha');
            $table->integer('founded_year')->nullable()->after('area_size')->comment('Tahun Berdiri');
            $table->string('village_status')->nullable()->after('founded_year')->comment('Status Desa, e.g. Mandiri');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('village_infos', function (Blueprint $table) {
            $table->dropColumn(['area_size', 'founded_year', 'village_status']);
        });
    }
};
