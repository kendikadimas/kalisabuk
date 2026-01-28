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
        Schema::create('village_stats', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul statistik: "Jumlah Penduduk", "Luas Wilayah", dll
            $table->string('value'); // Nilai: bisa angka atau text
            $table->string('unit')->nullable(); // Satuan: "jiwa", "Ha", "unit", dll
            $table->string('icon')->default('chart-bar'); // Nama icon dari lucide
            $table->string('color')->default('emerald'); // emerald, blue, purple, orange, pink
            $table->enum('size', ['small', 'medium', 'large'])->default('medium'); // Ukuran card
            $table->text('description')->nullable(); // Deskripsi tambahan
            $table->string('category')->nullable(); // Kategori: demografi, geografis, ekonomi, dll
            $table->integer('order')->default(0); // Urutan tampilan
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('village_stats');
    }
};
