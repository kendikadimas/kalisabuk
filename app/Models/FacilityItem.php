<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityItem extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(FacilityCategory::class, 'facility_category_id');
    }
}
