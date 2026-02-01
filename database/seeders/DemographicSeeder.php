<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Demographic;

class DemographicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Demographic::truncate();

        // Data Pekerjaan
        $jobs = [
            ['label' => 'Petani', 'value' => 450, 'type' => 'job'],
            ['label' => 'Buruh', 'value' => 300, 'type' => 'job'],
            ['label' => 'Wiraswasta', 'value' => 200, 'type' => 'job'],
            ['label' => 'PNS / TNI / Polri', 'value' => 80, 'type' => 'job'],
            ['label' => 'Pedagang', 'value' => 150, 'type' => 'job'],
            ['label' => 'Ibu Rumah Tangga', 'value' => 350, 'type' => 'job'],
            ['label' => 'Pelajar / Mahasiswa', 'value' => 400, 'type' => 'job'],
            ['label' => 'Belum Bekerja', 'value' => 100, 'type' => 'job'],
        ];

        foreach ($jobs as $job) {
            Demographic::create($job);
        }

        // Data Gender (untuk cadangan jika diperlukan nanti)
        $genders = [
            ['label' => 'Laki-laki', 'value' => 1050, 'type' => 'gender'],
            ['label' => 'Perempuan', 'value' => 980, 'type' => 'gender'],
        ];

        foreach ($genders as $gender) {
            Demographic::create($gender);
        }
    }
}
