<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VillageOfficial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'nip',
        'photo',
        'phone',
        'address',
        'education',
        'periode_start',
        'periode_end',
        'order',
        'is_active',
        'is_head',
        'welcome_message',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_head' => 'boolean',
        'periode_start' => 'date',
        'periode_end' => 'date',
    ];

    /**
     * Scope untuk mengambil perangkat yang aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope untuk mengambil kepala desa
     */
    public function scopeHead($query)
    {
        return $query->where('is_head', true);
    }

    /**
     * Scope untuk mengurutkan berdasarkan order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Get initials for avatar
     */
    public function getInitialsAttribute()
    {
        $names = explode(' ', $this->name);
        if (count($names) >= 2) {
            return strtoupper(substr($names[0], 0, 1) . substr($names[1], 0, 1));
        }
        return strtoupper(substr($this->name, 0, 2));
    }

    /**
     * Get formatted periode
     */
    public function getPeriodeAttribute()
    {
        if ($this->periode_start && $this->periode_end) {
            return $this->periode_start->format('Y') . ' - ' . $this->periode_end->format('Y');
        }
        return '-';
    }
}
