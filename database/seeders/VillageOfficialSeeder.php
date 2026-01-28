<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VillageOfficial;

class VillageOfficialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $officials = [
            [
                'name' => 'H. Ahmad Sudarsono',
                'position' => 'Kepala Desa',
                'nip' => '196512311988031009',
                'phone' => '081234567890',
                'address' => 'Desa Kalisabuk RT 01 RW 02',
                'education' => 'S1 Administrasi Negara',
                'periode_start' => '2020-01-01',
                'periode_end' => '2026-01-01',
                'order' => 1,
                'is_active' => true,
                'is_head' => true,
                'welcome_message' => 'Selamat datang di portal resmi Desa Kalisabuk. Website ini kami dedikasikan untuk seluruh warga sebagai sarana informasi dan pelayanan yang lebih dekat dan mudah diakses.

Kami berkomitmen untuk mewujudkan tata kelola pemerintahan yang bersih, transparan, dan akuntabel. Mari bersama-sama kita wujudkan Kalisabuk yang mandiri, sejahtera, dan harmonis dalam keberagaman.',
            ],
            [
                'name' => 'Siti Rahmawati, S.Sos',
                'position' => 'Sekretaris Desa',
                'nip' => '197203151995032004',
                'phone' => '081234567891',
                'address' => 'Desa Kalisabuk RT 02 RW 01',
                'education' => 'S1 Sosiologi',
                'periode_start' => '2020-01-01',
                'periode_end' => '2026-01-01',
                'order' => 2,
                'is_active' => true,
                'is_head' => false,
            ],
            [
                'name' => 'Bambang Susilo',
                'position' => 'Kaur Keuangan',
                'nip' => '198005102005011003',
                'phone' => '081234567892',
                'address' => 'Desa Kalisabuk RT 03 RW 01',
                'education' => 'D3 Akuntansi',
                'periode_start' => '2020-01-01',
                'periode_end' => '2026-01-01',
                'order' => 3,
                'is_active' => true,
                'is_head' => false,
            ],
            [
                'name' => 'Rina Wulandari',
                'position' => 'Kaur Umum',
                'nip' => '198506222010012008',
                'phone' => '081234567893',
                'address' => 'Desa Kalisabuk RT 01 RW 03',
                'education' => 'SMA',
                'periode_start' => '2020-01-01',
                'periode_end' => '2026-01-01',
                'order' => 4,
                'is_active' => true,
                'is_head' => false,
            ],
            [
                'name' => 'Muhammad Fauzi',
                'position' => 'Kaur Pembangunan',
                'nip' => '199001152015021001',
                'phone' => '081234567894',
                'address' => 'Desa Kalisabuk RT 04 RW 02',
                'education' => 'S1 Teknik Sipil',
                'periode_start' => '2020-01-01',
                'periode_end' => '2026-01-01',
                'order' => 5,
                'is_active' => true,
                'is_head' => false,
            ],
            [
                'name' => 'Dewi Lestari',
                'position' => 'Kasi Kesejahteraan',
                'nip' => '199208102017012002',
                'phone' => '081234567895',
                'address' => 'Desa Kalisabuk RT 02 RW 03',
                'education' => 'S1 Kesehatan Masyarakat',
                'periode_start' => '2020-01-01',
                'periode_end' => '2026-01-01',
                'order' => 6,
                'is_active' => true,
                'is_head' => false,
            ],
        ];

        foreach ($officials as $official) {
            VillageOfficial::create($official);
        }
    }
}
