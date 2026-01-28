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
        Schema::create('developments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('location');
            $table->decimal('budget', 15, 2)->nullable();
            $table->string('year'); // e.g. "2024"
            $table->text('description')->nullable();
            $table->string('contractor')->nullable();
            $table->enum('status', ['planned', 'progress', 'completed'])->default('planned');
            $table->string('image_before');
            $table->json('image_progress')->nullable();
            $table->string('image_after')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developments');
    }
};
