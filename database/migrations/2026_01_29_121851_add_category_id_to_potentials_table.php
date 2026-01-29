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
        Schema::table('potentials', function (Blueprint $table) {
            $table->foreignId('potential_category_id')->nullable()->constrained()->onDelete('set null')->after('name');
            // We'll keep the old category column for now but make it nullable if it wasn't already (it wasn't)
            $table->string('category')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('potentials', function (Blueprint $table) {
            //
        });
    }
};
