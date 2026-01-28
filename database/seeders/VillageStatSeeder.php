<?php

namespace Database\Seeders;

use App\Models\VillageStat;
use Illuminate\Database\Seeder;

class VillageStatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stats = [
            [
                'title' => 'Jumlah Penduduk',
                'value' => '5420',
                'unit' => 'jiwa',
                'icon' => 'users',
                'color' => 'emerald',
                'size' => 'large',
                'description' => 'Total penduduk yang terdaftar dalam sistem kependudukan desa',
                'category' => 'Demografi',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Luas Wilayah',
                'value' => '850',
                'unit' => 'Ha',
                'icon' => 'map-pin',
                'color' => 'blue',
                'size' => 'medium',
                'description' => 'Luas total wilayah administratif desa',
                'category' => 'Geografis',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Jumlah Kepala Keluarga',
                'value' => '1420',
                'unit' => 'KK',
                'icon' => 'home',
                'color' => 'purple',
                'size' => 'medium',
                'description' => 'Total kepala keluarga yang tercatat',
                'category' => 'Demografi',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Jumlah Dusun',
                'value' => '8',
                'unit' => 'dusun',
                'icon' => 'building-2',
                'color' => 'orange',
                'size' => 'small',
                'description' => 'Pembagian wilayah administratif desa',
                'category' => 'Geografis',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Sekolah',
                'value' => '12',
                'unit' => 'unit',
                'icon' => 'graduation-cap',
                'color' => 'pink',
                'size' => 'small',
                'description' => 'Total institusi pendidikan dari PAUD hingga SMA',
                'category' => 'Pendidikan',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Fasilitas Kesehatan',
                'value' => '5',
                'unit' => 'unit',
                'icon' => 'heart',
                'color' => 'red',
                'size' => 'small',
                'description' => 'Puskesmas, Posyandu, dan klinik kesehatan',
                'category' => 'Kesehatan',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'UMKM Terdaftar',
                'value' => '248',
                'unit' => 'unit',
                'icon' => 'store',
                'color' => 'yellow',
                'size' => 'medium',
                'description' => 'Usaha mikro kecil menengah yang aktif beroperasi',
                'category' => 'Ekonomi',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Tingkat Literasi',
                'value' => '98.5',
                'unit' => '%',
                'icon' => 'chart-bar',
                'color' => 'indigo',
                'size' => 'small',
                'description' => 'Persentase penduduk yang dapat membaca dan menulis',
                'category' => 'Pendidikan',
                'order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($stats as $stat) {
            VillageStat::create($stat);
        }
    }
}
