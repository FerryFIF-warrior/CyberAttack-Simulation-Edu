<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LearningModule extends Model
{
    protected $fillable = ['title', 'attack_type', 'difficulty', 'summary', 'content', 'sort_order', 'status', 'document_path', 'document_name'];
}
