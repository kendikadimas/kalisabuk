<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use App\Models\VillageInfo;
use App\Models\Post;
use App\Models\Potential;
use App\Models\Institution;
use App\Models\Demographic;
use App\Models\Budget;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Call specific seeders
        $this->call([
            VillageOfficialSeeder::class,
            VillageStatSeeder::class,
        ]);

        $faker = Faker::create('id_ID');

        // Village Info
        VillageInfo::truncate();
        VillageInfo::create([
            'name' => 'Desa Kalisabuk',
            'description' => 'Desa yang subur, makmur, dan menjunjung tinggi nilai gotong royong.',
            'vision' => 'Terwujudnya masyarakat yang beriman, bertaqwa kepada Tuhan Yang Maha Esa, Aman, Tentram, Damai dan Sejahtera dengan memiliki pemikiran yang tinggi untuk maju dan mandiri untuk membangun.',
            'mission' => "BIDANG PEMERINTAHAN\n\n1. Meningkatkan sumber daya perangkat desa agar lebih efektif dan efisien dalam melaksanakan tugas fungsi dan pokoknya sebagai perangkat desa.\n\n2. Memfungsikan lembaga-lembaga desa yang ada baiknya dalam proses perencanaan maupun pelaksanaan pembangunan/melaksanakan pelayanan kepada masyarakat secara prima.\n\nBIDANG KEAMANAN\n\n1. Menumbuh kembangkan sistem keamanan lingkungan terpadu.\n\n2. Memperbaiki sarana dan prasarana lingkungan.\n\n3. Menciptakan sarana keamanan dengan meningkatkan hubungan baik antar desa dan dinas terkait.\n\n4. Meningkatkan persatuan dan kesatuan serta toleransi beragama demi terwujudnya kedamaian, ketentraman, keamanan, kenyamanan dan ketertiban dalam kehidupan bermasyarakat berbangsa dan bernegara.",
            'history' => 'Nama "Kalisabuk" konon berasal dari aliran sungai yang meliuk indah mengelilingi desa layaknya sebuah sabuk pelindung. Filosofi ini tertanam kuat dalam karakter masyarakatnya: melindungi sesama, mengikat persaudaraan, dan menjaga harmoni alam.',
            'address' => 'Jl. Raya Kalisabuk No. 1, Kec. Kesugihan, Kab. Cilacap, Jawa Tengah',
            'phone' => '(0282) 123-4567',
            'email' => 'admin@kalisabuk.desa.id',
            'logo_path' => null,
        ]);

        // Posts
        Post::truncate();
        $newsTitles = [
            'Penyaluran BLT Dana Desa Tahap I Tahun 2024 Berjalan Lancar',
            'Kegiatan Kerja Bakti Massal Membersihkan Saluran Irigasi',
            'Musrenbangdes Tetapkan Prioritas Pembangunan Tahun Depan',
            'Pelatiham UMKM: Strategi Pemasaran Digital untuk Produk Lokal',
            'Posyandu Lansia: Menjaga Kesehatan Warga Senior',
            'Festival Budaya Desa Kalisabuk Meriahkan HUT RI ke-79',
            'Desa Kalisabuk Raih Penghargaan Desa Sadar Hukum',
            'Pembangunan Jalan Usaha Tani Dusun Melati Resmi Dimulai',
        ];

        $newsImages = [
            'https://images.unsplash.com/photo-1565514020176-13d85ee8d617?w=1200&q=80', // Money/Hand
            'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=1200&q=80', // Work/Construction
            'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&q=80', // Meeting
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', // UMKM/Food
            'https://images.unsplash.com/photo-1584515933487-98db75f56f18?w=1200&q=80', // Health
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80', // Festival
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&q=80', // Law/Award
            'https://images.unsplash.com/photo-1625246333195-f819634473ce?w=1200&q=80', // Rice field
        ];

        foreach ($newsTitles as $index => $title) {
            Post::create([
                'title' => $title,
                'slug' => Str::slug($title) . '-' . Str::random(5),
                'content' => $faker->paragraphs(5, true),
                'category' => 'news', // 'news', 'announcement', etc
                'published_at' => $faker->dateTimeBetween('-6 months', 'now'),
                'image_path' => $newsImages[$index] ?? null,
                'views' => $faker->numberBetween(50, 500),
            ]);
        }

        // Potentials
        Potential::truncate();
        $potentials = [
            ['name' => 'Wisata Alam Curug Indah', 'category' => 'Wisata Alam', 'desc' => 'Air terjun alami dengan pemandangan pegunungan yang asri.'],
            ['name' => 'Kerajinan Anyaman Bambu', 'category' => 'Produk UMKM', 'desc' => 'Produk kerajinan tangan berkualitas ekspor buatan warga lokal.'],
            ['name' => 'Kopi Robusta Kalisabuk', 'category' => 'Pertanian', 'desc' => 'Kopi asli yang ditanam di dataran tinggi desa dengan cita rasa khas.'],
            ['name' => 'Sentra Kuliner Tradisional', 'category' => 'Produk UMKM', 'desc' => 'Pusat jajanan pasar dan makanan tradisional khas desa.'],
            ['name' => 'Agrowisata Petik Jeruk', 'category' => 'Wisata Alam', 'desc' => 'Kebun jeruk luas yang menawarkan pengalaman memetik buah langsung dari pohon.'],
        ];

        foreach ($potentials as $p) {
            Potential::create([
                'name' => $p['name'],
                'category' => $p['category'],
                'description' => $p['desc'],
                'location' => $faker->address,
                'contact_info' => $faker->phoneNumber,
                'image_path' => null,
            ]);
        }

        // Institutions
        Institution::truncate();
        $orgs = [
            ['name' => 'Badan Permusyawaratan Desa', 'abbr' => 'BPD', 'leader' => 'Bpk. Sutrisno'],
            ['name' => 'Lembaga Pemberdayaan Masyarakat Desa', 'abbr' => 'LPMD', 'leader' => 'Ibu Hartini'],
            ['name' => 'Pemberdayaan Kesejahteraan Keluarga', 'abbr' => 'PKK', 'leader' => 'Ibu Siti Aminah'],
            ['name' => 'Karang Taruna Tunas Bangsa', 'abbr' => 'KT', 'leader' => 'Sdr. Budi Santoso'],
        ];

        foreach ($orgs as $o) {
            Institution::create([
                'name' => $o['name'],
                'abbreviation' => $o['abbr'],
                'description' => 'Lembaga desa yang berperan aktif dalam memajukan kesejahteraan masyarakat.',
                'leader_name' => $o['leader'],
            ]);
        }

        // Demographics
        Demographic::truncate();
        $demos = [
            // Gender
            ['label' => 'Laki-laki', 'value' => 2450, 'type' => 'gender'],
            ['label' => 'Perempuan', 'value' => 2580, 'type' => 'gender'],
            // Job
            ['label' => 'Petani', 'value' => 1200, 'type' => 'job'],
            ['label' => 'Pedagang', 'value' => 450, 'type' => 'job'],
            ['label' => 'PNS / TNI / Polri', 'value' => 150, 'type' => 'job'],
            ['label' => 'Wiraswasta', 'value' => 300, 'type' => 'job'],
            ['label' => 'Pelajar/Mahasiswa', 'value' => 800, 'type' => 'job'],
            // Education
            ['label' => 'SD', 'value' => 900, 'type' => 'education'],
            ['label' => 'SMP', 'value' => 1100, 'type' => 'education'],
            ['label' => 'SMA', 'value' => 1200, 'type' => 'education'],
            ['label' => 'Diploma/Sarjana', 'value' => 450, 'type' => 'education'],
        ];

        foreach ($demos as $d) {
            Demographic::create($d);
        }

        // Budgets
        Budget::truncate();
        // 2024
        Budget::create(['year' => 2024, 'name' => 'Dana Desa', 'type' => 'income', 'amount' => 1200000000, 'realized_amount' => 1200000000]);
        Budget::create(['year' => 2024, 'name' => 'Alokasi Dana Desa', 'type' => 'income', 'amount' => 450000000, 'realized_amount' => 450000000]);
        Budget::create(['year' => 2024, 'name' => 'Pendapatan Asli Desa', 'type' => 'income', 'amount' => 150000000, 'realized_amount' => 165000000]);

        Budget::create(['year' => 2024, 'name' => 'Bidang Penyelenggaraan Pemdes', 'type' => 'expense', 'amount' => 550000000, 'realized_amount' => 545000000]);
        Budget::create(['year' => 2024, 'name' => 'Bidang Pembangunan Desa', 'type' => 'expense', 'amount' => 800000000, 'realized_amount' => 790000000]);
        Budget::create(['year' => 2024, 'name' => 'Bidang Pembinaan Kemasyarakatan', 'type' => 'expense', 'amount' => 200000000, 'realized_amount' => 195000000]);
        Budget::create(['year' => 2024, 'name' => 'Bidang Pemberdayaan Masyarakat', 'type' => 'expense', 'amount' => 200000000, 'realized_amount' => 198000000]);

        // 2025 (Planned)
        Budget::create(['year' => 2025, 'name' => 'Dana Desa', 'type' => 'income', 'amount' => 1250000000, 'realized_amount' => null]);
        Budget::create(['year' => 2025, 'name' => 'Alokasi Dana Desa', 'type' => 'income', 'amount' => 460000000, 'realized_amount' => null]);
        Budget::create(['year' => 2025, 'name' => 'Pendapatan Asli Desa', 'type' => 'income', 'amount' => 170000000, 'realized_amount' => null]);

        Budget::create(['year' => 2025, 'name' => 'Bidang Penyelenggaraan Pemdes', 'type' => 'expense', 'amount' => 600000000, 'realized_amount' => null]);
        Budget::create(['year' => 2025, 'name' => 'Bidang Pembangunan Desa', 'type' => 'expense', 'amount' => 850000000, 'realized_amount' => null]);

        // Admin User
        $user = \App\Models\User::where('email', 'admin@kalisabuk.desa.id')->first();
        if (!$user) {
            \App\Models\User::create([
                'name' => 'Administrator',
                'email' => 'admin@kalisabuk.desa.id',
                'password' => bcrypt('password'), // Change this in production
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
        }
    }
}
