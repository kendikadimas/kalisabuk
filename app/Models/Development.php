<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Development extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'location',
        'budget',
        'year',
        'description',
        'contractor',
        'status',
        'image_before',
        'image_progress',
        'image_after'
    ];

    protected $casts = [
        'image_progress' => 'array',
        'budget' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            if ($model->image_after && $model->status !== 'completed') {
                $model->status = 'completed';
            }
        });
    }
}
