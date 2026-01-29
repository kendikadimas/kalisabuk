<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function categoryData()
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }
}
