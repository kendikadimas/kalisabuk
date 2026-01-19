import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import HeroSection from '@/components/HeroSection';
import SectionTitle from '@/components/SectionTitle';
import NewsCard from '@/components/NewsCard';
import { Users, MapPin, Building2, CheckCircle, ArrowRight } from 'lucide-react';

interface HomeProps {
    villageInfo: any;
    latestNews: any[];
    featuredPotentials: any[];
    stats: {
        population: number;
        area: string;
    };
}

export default function Home({ villageInfo, latestNews, featuredPotentials, stats }: HomeProps) {
    return (
        <PublicLayout headerStyle="dark">
            <Head title="Beranda - Desa Kalisabuk" />

            <HeroSection />



            {/* Sambutan Kepala Desa Section - Premium Layout */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-20 items-center">
                        <div className="lg:col-span-5 relative order-2 lg:order-1">
                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-emerald-900/10">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                                    alt="Kepala Desa Kalisabuk"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-8">
                                    <h3 className="font-bold text-white text-xl font-serif">Bpk. H. Ahmad Sudarsono</h3>
                                    <p className="text-emerald-200 text-sm font-medium tracking-wide uppercase mt-1">Kepala Desa Kalisabuk</p>
                                </div>
                            </div>
                            {/* Decorative Element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-emerald-500/20 rounded-full z-[-1]"></div>
                        </div>

                        <div className="lg:col-span-7 order-1 lg:order-2 mb-12 lg:mb-0">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6">
                                Sambutan Kepala Desa
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black font-serif text-slate-900 tracking-tight mb-8 leading-tight">
                                "Membangun desa dengan <span className="text-emerald-700 italic">hati</span> dan transparansi."
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                                <p>
                                    Selamat datang di portal resmi Desa Kalisabuk. Website ini kami dedikasikan untuk seluruh warga sebagai sarana informasi dan pelayanan yang lebih dekat dan mudah diakses.
                                </p>
                                <p>
                                    Kami berkomitmen untuk mewujudkan tata kelola pemerintahan yang bersih, transparan, dan akuntabel. Mari bersama-sama kita wujudkan Kalisabuk yang mandiri, sejahtera, dan harmonis dalam keberagaman.
                                </p>
                            </div>
                            <div className="mt-10 pt-10 border-t border-slate-100 flex items-center gap-6">
                                <img src="https://ui-avatars.com/api/?name=Ahmad+Sudarsono&background=047857&color=fff" alt="Signature" className="h-12 w-12 rounded-full ring-2 ring-white shadow-md" />
                                <div>
                                    <p className="font-serif text-slate-900 text-lg font-bold">H. A. Sudarsono</p>
                                    <p className="text-slate-400 text-sm">Periode 2020 - 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Glassmorphic Cards */}
            <section className="py-20 bg-emerald-900 relative isolate overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/50 to-emerald-950/90"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCard label="Penduduk" value={stats.population.toLocaleString('id-ID')} icon={<Users className="w-6 h-6" />} />
                        <StatCard label="Luas Wilayah" value={villageInfo?.area_size || '120 Ha'} icon={<MapPin className="w-6 h-6" />} />
                        <StatCard label="Tahun Berdiri" value={villageInfo?.founded_year || '1830'} icon={<Building2 className="w-6 h-6" />} />
                        <StatCard label="Status Desa" value={villageInfo?.village_status || 'Mandiri'} icon={<CheckCircle className="w-6 h-6" />} />
                    </div>
                </div>
            </section>

            {/* Detailed Stats & Boundaries Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Administrative Area */}
                        <div>
                            <h3 className="text-2xl font-black font-serif text-slate-900 mb-8 border-l-4 border-emerald-500 pl-4">Pembagian Wilayah</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors text-center">
                                    <p className="text-4xl font-black text-emerald-800 mb-2">{villageInfo?.hamlet_count || 0}</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Dusun</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors text-center">
                                    <p className="text-4xl font-black text-emerald-800 mb-2">{villageInfo?.rw_count || 0}</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-500">RW</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors text-center">
                                    <p className="text-4xl font-black text-emerald-800 mb-2">{villageInfo?.rt_count || 0}</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-slate-500">RT</p>
                                </div>
                            </div>
                            <p className="mt-6 text-slate-600 leading-relaxed">
                                Desa Kalisabuk terbagi menjadi beberapa wilayah administratif untuk memudahkan pelayanan dan pengelolaan kemasyarakatan.
                            </p>
                        </div>

                        {/* Boundaries */}
                        <div>
                            <h3 className="text-2xl font-black font-serif text-slate-900 mb-8 border-l-4 border-emerald-500 pl-4">Batas Wilayah</h3>
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50"></div>

                                <ul className="space-y-6 relative z-10">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-700 font-bold text-sm border border-emerald-100">U</div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Utara</p>
                                            <p className="text-lg font-bold text-slate-900">{villageInfo?.boundary_north || '-'}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-700 font-bold text-sm border border-emerald-100">S</div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Selatan</p>
                                            <p className="text-lg font-bold text-slate-900">{villageInfo?.boundary_south || '-'}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-700 font-bold text-sm border border-emerald-100">T</div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Timur</p>
                                            <p className="text-lg font-bold text-slate-900">{villageInfo?.boundary_east || '-'}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-700 font-bold text-sm border border-emerald-100">B</div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Barat</p>
                                            <p className="text-lg font-bold text-slate-900">{villageInfo?.boundary_west || '-'}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Potensi - Premium Gallery */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">Keunggulan Lokal</span>
                            <h2 className="text-4xl font-black font-serif text-slate-900 tracking-tight">Potensi Desa</h2>
                        </div>
                        <a href="/potentials" className="group flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-200 hover:border-emerald-900 transition-all pb-1">
                            Lihat Semua
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredPotentials && featuredPotentials.length > 0 ? (
                            featuredPotentials.map((item: any) => (
                                <div key={item.id} className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-900 shadow-xl cursor-pointer">
                                    <img
                                        src={item.image ? `/storage/${item.image}` : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000'}
                                        alt={item.title}
                                        className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 p-8">
                                        <div className="w-12 h-1 bg-emerald-500 mb-4 transition-all duration-300 group-hover:w-20"></div>
                                        <h3 className="text-2xl font-bold text-white font-serif mb-2">{item.title}</h3>
                                        <p className="text-slate-300 line-clamp-2 text-sm leading-relaxed opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : ([1, 2, 3].map(i => <div key={i} className="aspect-[3/4] bg-slate-200 rounded-3xl animate-pulse"></div>))}
                    </div>
                </div>
            </section>

            {/* News - Magazine Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">Informasi Terkini</span>
                        <h2 className="text-4xl font-black font-serif text-slate-900 tracking-tight mb-4">Kabar dari Desa</h2>
                        <p className="text-slate-500">Ikuti perkembangan terbaru, pengumuman, dan kegiatan yang terjadi di Desa Kalisabuk.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestNews.map((post) => (
                            <NewsCard key={post.id} post={post} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a href="/news" className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-900 transition-all">
                            Lihat Arsip Berita
                        </a>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}

// Global Reusable Stat Card
function StatCard({ label, value, icon }: any) {
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
            <div className="flex items-start justify-between mb-4">
                <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors bg-white/5 p-2 rounded-lg">
                    {icon}
                </div>
            </div>
            <p className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">{value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/70">{label}</p>
        </div>
    )
}
