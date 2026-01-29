<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityCategory extends Model
{
    protected $guarded = [];

    public function items()
    {
        return $this->hasMany(FacilityItem::class);
    }
}
