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
        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('post_category_id')->nullable()->constrained()->onDelete('set null')->after('content');
            // Change existing enum category to string nullable for compatibility/migration if needed, or keep as is but allow null if we move away from it.
            // For now, let's keep it but make it nullable if it wasn't (mysql enums are tricky to change to nullable if they aren't, but let's try modifying).
            // Actually, best to just add the new column first.
            // If we want to replace the functionality, we might eventually drop 'category'.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            //
        });
    }
};
