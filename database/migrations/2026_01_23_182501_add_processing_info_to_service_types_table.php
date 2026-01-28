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
        Schema::table('service_types', function (Blueprint $table) {
            $table->string('processing_time')->nullable()->after('requirements'); // e.g. "3 Hari Kerja"
            $table->string('fee')->nullable()->after('processing_time'); // e.g. "Gratis" or "Rp 10.000"
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_types', function (Blueprint $table) {
            $table->dropColumn(['processing_time', 'fee']);
        });
    }
};
