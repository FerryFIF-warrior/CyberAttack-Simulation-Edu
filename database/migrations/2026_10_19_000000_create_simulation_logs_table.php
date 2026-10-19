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
        Schema::create('simulation_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('simulation_id');
            $table->unsignedTinyInteger('level_number');
            $table->unsignedTinyInteger('floor_number');
            $table->string('event')->default('floor_attempt');
            $table->string('choice_id')->nullable();
            $table->smallInteger('points')->default(0);
            $table->timestamp('created_at')->nullable();

            $table->index(['user_id', 'simulation_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulation_logs');
    }
};
