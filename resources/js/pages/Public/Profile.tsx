import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { MapPin, Users, Award, Target, History, Building2, Shield, Briefcase } from 'lucide-react';
import { useState } from 'react';

interface ProfileProps {
    villageInfo: any;
    institutions: any[];
    facilities: any[];
}

export default function Profile({ villageInfo, institutions, facilities }: ProfileProps) {
    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Profil Desa' }
    ];

    const [activeTab, setActiveTab] = useState<'pemerintahan' | 'keamanan'>('pemerintahan');

    // Hardcoded Visi & Misi
    const vision = 'Terwujudnya masyarakat yang beriman, bertaqwa kepada Tuhan Yang Maha Esa, Aman, Tentram, Damai dan Sejahtera dengan memiliki pemikiran yang tinggi untuk maju dan mandiri untuk membangun.';

    const missions = {
        pemerintahan: [
            'Meningkatkan sumber daya perangkat desa agar lebih efektif dan efisien dalam melaksanakan tugas fungsi dan pokoknya sebagai perangkat desa.',
            'Memfungsikan lembaga-lembaga desa yang ada baiknya dalam proses perencanaan maupun pelaksanaan pembangunan/melaksanakan pelayanan kepada masyarakat secara prima.'
        ],
        keamanan: [
            'Menumbuh kembangkan sistem keamanan lingkungan terpadu.',
            'Memperbaiki sarana dan prasarana lingkungan.',
            'Menciptakan sarana keamanan dengan meningkatkan hubungan baik antar desa dan dinas terkait.',
            'Meningkatkan persatuan dan kesatuan serta toleransi beragama demi terwujudnya kedamaian, ketentraman, keamanan, kenyamanan dan ketertiban dalam kehidupan bermasyarakat berbangsa dan bernegara.'
        ]
    };

    return (
        <PublicLayout>
            <Head title="Profil Desa - Kalisabuk" />

            <PageHeader
                title="Tentang Kami"
                subtitle="Mengenal lebih dalam sejarah, visi misi, dan semangat gotong royong Desa Kalisabuk."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Quick Facts Strip */}
            <div className="relative -mt-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                        <div className="p-2 group hover:-translate-y-1 transition-transform">
                            <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{villageInfo?.population ? villageInfo.population.toLocaleString('id-ID') : '-'}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Penduduk</span>
                        </div>
                        <div className="p-2 group hover:-translate-y-1 transition-transform border-l border-slate-200">
                            <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{villageInfo?.area_size || '-'}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Luas Wilayah</span>
                        </div>
                        <div className="p-2 group hover:-translate-y-1 transition-transform border-l border-slate-200">
                            <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{villageInfo?.hamlet_count || '0'}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Dusun</span>
                        </div>
                        <div className="p-2 group hover:-translate-y-1 transition-transform border-l border-slate-200">
                            <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{villageInfo?.rw_count || '0'}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">RW</span>
                        </div>
                        <div className="p-2 group hover:-translate-y-1 transition-transform border-l border-slate-200">
                            <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{villageInfo?.rt_count || '0'}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">RT</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visi Misi Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Visi Card */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-50 rounded-[2.5rem] transform -rotate-2 opacity-70 transition-transform group-hover:rotate-0"></div>
                            <div className="relative bg-emerald-900 rounded-[2rem] p-12 text-white shadow-2xl overflow-hidden isolate">
                                {/* Decorative BG */}
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>

                                <Target className="w-12 h-12 text-emerald-300 mb-6" />
                                <h3 className="text-xl font-bold tracking-widest text-emerald-400 mb-6 flex items-center gap-4">
                                    <span className="w-8 h-px bg-emerald-400"></span> VISI
                                </h3>
                                <blockquote className="text-2xl md:text-3xl font-serif leading-tight">
                                    "{vision}"
                                </blockquote>
                            </div>
                        </div>

                        {/* Misi with Tabs */}
                        <div className="pt-8">
                            <h3 className="text-xl font-bold tracking-widest text-emerald-900 mb-8 flex items-center gap-4">
                                <span className="w-8 h-1 bg-emerald-500"></span> MISI
                            </h3>

                            {/* Tabs */}
                            <div className="flex gap-3 mb-8">
                                <button
                                    onClick={() => setActiveTab('pemerintahan')}
                                    className={`flex-1 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 ${activeTab === 'pemerintahan'
                                        ? 'bg-emerald-900 text-white shadow-xl scale-105'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    <Briefcase className="w-5 h-5" />
                                    <span>Bidang Pemerintahan</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('keamanan')}
                                    className={`flex-1 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 ${activeTab === 'keamanan'
                                        ? 'bg-emerald-900 text-white shadow-xl scale-105'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    <Shield className="w-5 h-5" />
                                    <span>Bidang Keamanan</span>
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-5">
                                {missions[activeTab].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex gap-4 group animate-fadeIn"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 text-emerald-900 flex items-center justify-center font-bold text-base border border-slate-100 group-hover:bg-emerald-900 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                            {idx + 1}
                                        </div>
                                        <p className="text-base text-slate-600 leading-relaxed pt-2 font-medium group-hover:text-slate-900 transition-colors">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Sejarah Scroll Content */}
            <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Interactive Map/Image */}
                        <div className="lg:w-1/2 relative">
                            <div className="sticky top-32">
                                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31634.873426778195!2d109.07866529118928!3d-7.64446951176838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656b841b4aa529%3A0x5027a76e3571e90!2sKalisabuk%2C%20Kec.%20Kesugihan%2C%20Kabupaten%20Cilacap%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1770230164994!5m2!1sid!2sid" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                                <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                            </div>
                        </div>

                        {/* History Article */}
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6">
                                <History className="w-4 h-4" />
                                Jejak Langkah
                            </div>
                            <h2 className="text-4xl font-black font-serif text-slate-900 mb-8 leading-tight">
                                Asal Usul <br /><span className="text-emerald-700">Desa Kalisabuk.</span>
                            </h2>

                            <div className="prose prose-lg prose-emerald text-slate-500 font-normal leading-loose">
                                <p>
                                    Nama "Kalisabuk" memiliki dua riwayat yang sama-sama menarik. Pertama, nama ini diambil dari kondisi geografis desa yang dikelilingi oleh aliran sungai (kali) yang meliuk indah layaknya sebuah sabuk pelindung. Filosofi ini tertanam kuat dalam karakter masyarakatnya: melindungi sesama, mengikat persaudaraan, dan menjaga harmoni alam.
                                </p>
                                <p>
                                    Konon dalam cerita lain, nama Kalisabuk diambil dari kejadian awal desa tersebut, ketika diriwayatkan Desa Kalisabuk dikelilingi oleh sungai hasil dari sisa perjalanan sebuah batang pohon aren yang sangat besar yang dibawa oleh seorang sakti dengan diikat memakai sabuk.
                                </p>
                                <div className="my-10 pl-6 border-l-4 border-emerald-500 italic text-slate-700 text-xl font-serif">
                                    "Dari legenda kali dan sabuk, lahirlah nama Kalisabuk yang menjadi identitas desa hingga kini."
                                </div>
                                <p>
                                    Kini, Kalisabuk bertransformasi menjadi desa modern yang adaptif. Memadukan kearifan lokal dengan inovasi digital untuk memberikan pelayanan terbaik bagi warganya, sambil tetap menjaga warisan budaya dan sejarah yang telah diwariskan oleh para leluhur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Structure Grid */}
            {institutions && institutions.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-black font-serif text-slate-900 mb-16">Lembaga Desa</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {institutions.slice(0, 6).map((person, i) => (
                                <div key={i} className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
                                    <div className="aspect-[3/4] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
                                        {person.logo ? (
                                            <img
                                                src={`/storage/${person.logo}`}
                                                alt={person.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                                                <span className="text-8xl font-black text-white/30">{person.abbreviation?.charAt(0) || person.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold tracking-widest uppercase mb-2 shadow-lg">
                                            {person.abbreviation || 'Lembaga'}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white font-serif leading-tight mb-1 drop-shadow-md">
                                            {person.name}
                                        </h3>
                                        {person.leader_name && (
                                            <p className="text-emerald-100/80 text-sm font-medium">
                                                Ketua: {person.leader_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <a href="/lembaga" className="mt-12 inline-block px-8 py-3 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-emerald-900 transition-colors">
                            Lihat Semua Lembaga
                        </a> */}
                    </div>
                </section>
            )}

            {/* Fasilitas Desa Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase mb-6">
                            <Building2 className="w-4 h-4" />
                            Sarana & Prasarana
                        </div>
                        <h2 className="text-4xl font-black font-serif text-slate-900 mb-6 tracking-tight">Fasilitas Desa</h2>
                        <p className="text-slate-500 text-lg">
                            Desa Kalisabuk dilengkapi dengan berbagai fasilitas pendukung untuk menunjang kesejahteraan dan kebutuhan masyarakat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {facilities && facilities.length > 0 ? (
                            facilities.map((category: any) => (
                                <div key={category.id} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">{category.name}</h3>
                                    <ul className="space-y-4">
                                        {category.items && category.items.length > 0 ? (
                                            category.items.map((item: any) => (
                                                <li key={item.id} className="flex items-center gap-3 text-slate-600 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                                                    <div className={`w-2 h-2 rounded-full shrink-0 ${category.name.toLowerCase().includes('pendidikan') ? 'bg-indigo-400' :
                                                        category.name.toLowerCase().includes('kesehatan') ? 'bg-rose-400' :
                                                            'bg-emerald-400'
                                                        }`}></div>
                                                    <span className="text-sm">{item.name}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-slate-400 italic text-sm">Belum ada item</li>
                                        )}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            // Fallback or empty state
                            <div className="col-span-full text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200">
                                <p className="text-slate-500">Data fasilitas belum tersedia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
