<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = ['attack_type', 'difficulty', 'question', 'options', 'correct_answer', 'explanation'];

    protected $casts = ['options' => 'array'];
}
