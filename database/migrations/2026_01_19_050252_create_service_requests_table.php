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
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_code')->unique(); // SR-YYYYMMDD-XXX
            $table->foreignId('service_type_id')->constrained('service_types')->onDelete('cascade');
            $table->string('citizen_nik');
            $table->string('citizen_name');
            $table->string('citizen_phone')->nullable();
            $table->text('details')->nullable(); // Specific request details
            $table->enum('status', ['pending', 'processed', 'completed', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_requests');
    }
};
