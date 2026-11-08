<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('learning_modules')) {
            Schema::create('learning_modules', function (Blueprint $t) {
                $t->id();
                $t->string('title', 200);
                $t->string('attack_type', 30);
                $t->string('difficulty', 20)->default('Beginner');
                $t->string('summary', 500)->nullable();
                $t->longText('content')->nullable();
                $t->unsignedInteger('sort_order')->default(0);
                $t->string('status', 20)->default('draft');
                $t->timestamps();
            });
        }

        if (! Schema::hasTable('quiz_questions')) {
            Schema::create('quiz_questions', function (Blueprint $t) {
                $t->id();
                $t->string('attack_type', 30);
                $t->string('difficulty', 20)->default('Beginner');
                $t->text('question');
                $t->json('options');
                $t->string('correct_answer', 300);
                $t->text('explanation')->nullable();
                $t->timestamps();
            });
        }

        if (! Schema::hasTable('badge_definitions')) {
            Schema::create('badge_definitions', function (Blueprint $t) {
                $t->id();
                $t->string('name', 100);
                $t->string('description', 300);
                $t->string('criteria', 300);
                $t->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('badge_definitions');
        Schema::dropIfExists('quiz_questions');
        Schema::dropIfExists('learning_modules');
    }
};
