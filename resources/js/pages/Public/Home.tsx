import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import HeroSection from '@/components/HeroSection';
import SectionTitle from '@/components/SectionTitle';
import NewsCard from '@/components/NewsCard';
import { Users, MapPin, Building2, CheckCircle, ArrowRight, Calendar, MapPinned, Bell, AlertCircle, Info, ChevronLeft, ChevronRight, UserCheck, Phone, Mail, Tag, ShoppingBag, Mountain } from 'lucide-react';
import { useState, useRef } from 'react';

interface HomeProps {
    villageInfo: any;
    villageHead: any;
    villageOfficials: any[];
    latestNews: any[];
    featuredPotentials: any[];
    announcements: any[];
    developments: any[];
    heroSlides: any[];
    stats: {
        population: number;
        area: string;
    };
    facilities: any[];
}

export default function Home({ villageInfo, villageHead, villageOfficials, latestNews, featuredPotentials, announcements, developments, stats, heroSlides }: HomeProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentOfficialSlide, setCurrentOfficialSlide] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const officialCarouselRef = useRef<HTMLDivElement>(null);

    const scrollToSlide = (index: number) => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.offsetWidth;
            carouselRef.current.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            setCurrentSlide(index);
        }
    };

    const nextSlide = () => {
        const nextIndex = currentSlide + 1 >= featuredPotentials.length ? 0 : currentSlide + 1;
        scrollToSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = currentSlide - 1 < 0 ? featuredPotentials.length - 1 : currentSlide - 1;
        scrollToSlide(prevIndex);
    };

    const scrollToOfficialSlide = (index: number) => {
        if (officialCarouselRef.current) {
            const slideWidth = officialCarouselRef.current.offsetWidth;
            officialCarouselRef.current.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            setCurrentOfficialSlide(index);
        }
    };

    const nextOfficialSlide = () => {
        const nextIndex = currentOfficialSlide + 1 >= villageOfficials.length ? 0 : currentOfficialSlide + 1;
        scrollToOfficialSlide(nextIndex);
    };

    const prevOfficialSlide = () => {
        const prevIndex = currentOfficialSlide - 1 < 0 ? villageOfficials.length - 1 : currentOfficialSlide - 1;
        scrollToOfficialSlide(prevIndex);
    };

    return (
        <PublicLayout headerStyle="light">
            <Head title="Beranda - Desa Kalisabuk" />

            <HeroSection slides={heroSlides} />

            {/* Introduction Section */}
            <section className="py-20 relative overflow-hidden bg-slate-50">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/50 blur-3xl"></div>
                    <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6">
                            Tentang Kami
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black font-serif text-slate-900 mb-6 leading-tight">
                            Selamat Datang di <span className="text-emerald-600">Desa Kalisabuk</span>
                        </h2>
                        <div className="prose prose-lg prose-slate mx-auto text-slate-600 leading-relaxed md:px-8">
                            <p>
                                Desa Kalisabuk adalah wujud harmoni antara alam yang asri dan masyarakat yang guyub rukun.
                                Terletak di kawasan yang strategis, kami terus berinovasi membangun desa yang mandiri,
                                maju, dan sejahtera dengan tetap memegang teguh kearifan lokal.
                            </p>
                            <p className="mt-4">
                                Melalui transparansi pelayanan publik dan optimalisasi potensi desa,
                                kami bertekad memberikan yang terbaik bagi seluruh warga.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200/60 pt-10">
                            <div>
                                <h4 className="text-3xl font-bold text-emerald-600 mb-1">{villageInfo?.hamlet_count || '10'}</h4>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Dusun</span>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-emerald-600 mb-1">{stats?.population ? (stats.population / 1000).toFixed(1) + 'k' : '5k+'}</h4>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Penduduk</span>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-emerald-600 mb-1">{villageInfo?.area_size ? parseInt(villageInfo.area_size) + '+' : '120+'}</h4>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Hektar</span>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-emerald-600 mb-1">24/7</h4>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Layanan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Sambutan Kepala Desa Section - Premium Layout */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    {villageHead ? (
                        <div className="lg:grid lg:grid-cols-12 lg:gap-20 items-center">
                            <div className="lg:col-span-5 relative order-2 lg:order-1">
                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-emerald-900/10">
                                    <img
                                        src={villageHead.photo ? `/storage/${villageHead.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(villageHead.name)}&background=047857&color=fff&size=400`}
                                        alt={villageHead.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-8">
                                        <h3 className="font-bold text-white text-xl font-serif">{villageHead.name}</h3>
                                        <p className="text-emerald-200 text-sm font-medium tracking-wide uppercase mt-1">{villageHead.position}</p>
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
                                    {villageHead.welcome_message ? (
                                        <div className="whitespace-pre-line">
                                            {villageHead.welcome_message}
                                        </div>
                                    ) : (
                                        <>
                                            <p>
                                                Selamat datang di portal resmi Desa Kalisabuk. Website ini kami dedikasikan untuk seluruh warga sebagai sarana informasi dan pelayanan yang lebih dekat dan mudah diakses.
                                            </p>
                                            <p>
                                                Kami berkomitmen untuk mewujudkan tata kelola pemerintahan yang bersih, transparan, dan akuntabel. Mari bersama-sama kita wujudkan Kalisabuk yang mandiri, sejahtera, dan harmonis dalam keberagaman.
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="mt-10 pt-10 border-t border-slate-100 flex items-center gap-6">
                                    <img
                                        src={villageHead.photo ? `/storage/${villageHead.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(villageHead.name)}&background=047857&color=fff`}
                                        alt={villageHead.name}
                                        loading="lazy"
                                        className="h-12 w-12 rounded-full ring-2 ring-white shadow-md object-cover"
                                    />
                                    <div>
                                        <p className="font-serif text-slate-900 text-lg font-bold">{villageHead.name}</p>
                                        <p className="text-slate-400 text-sm">{villageHead.periode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500 text-lg">Data kepala desa belum tersedia.</p>
                            <p className="text-slate-400 text-sm mt-2">Silakan tambahkan data perangkat desa melalui halaman admin.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats & Village Information - Unified Section */}
            <section className="py-20 bg-emerald-900 relative isolate overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000" alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/50 to-emerald-950/90"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Main Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                        <StatCard label="Penduduk" value={stats.population ? stats.population.toLocaleString('id-ID') : '-'} icon={<Users className="w-6 h-6" />} />
                        <StatCard label="Luas Wilayah" value={villageInfo?.area_size || '-'} icon={<MapPin className="w-6 h-6" />} />
                        <StatCard label="Dusun" value={villageInfo?.hamlet_count || '0'} icon={<Building2 className="w-6 h-6" />} />
                        <StatCard label="RW" value={villageInfo?.rw_count || '0'} icon={<Users className="w-6 h-6" />} />
                        <StatCard label="RT" value={villageInfo?.rt_count || '0'} icon={<CheckCircle className="w-6 h-6" />} />
                    </div>

                    {/* Detailed Information Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Administrative Area */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                            <h3 className="text-2xl font-black font-serif text-white mb-6 flex items-center gap-3">
                                <div className="w-1 h-8 bg-emerald-400 rounded-full"></div>
                                Daftar Dusun
                            </h3>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-white/5">
                                {[
                                    'Dusun Gumelar Kulon',
                                    'Dusun Gumelar Wetan',
                                    'Dusun Bonmanis',
                                    'Dusun Kalisabuk',
                                    'Dusun Brondong',
                                    'Dusun Banteran',
                                    'Dusun Gebang Kuning',
                                    'Dusun Pringtutul Kulon',
                                    'Dusun Pringtutul Wetan',
                                    'Dusun Mertelu'
                                ].map((dusun, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-3">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm border border-emerald-500/30">
                                            {index + 1}
                                        </div>
                                        <p className="text-white font-bold text-lg">{dusun}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-emerald-100/80 text-sm leading-relaxed mt-6">
                                Desa Kalisabuk terbagi menjadi {villageInfo?.hamlet_count || 10} dusun dengan total {villageInfo?.rw_count || 0} RW dan {villageInfo?.rt_count || 0} RT untuk memudahkan pelayanan masyarakat.
                            </p>
                        </div>

                        {/* Boundaries */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                            <h3 className="text-2xl font-black font-serif text-white mb-6 flex items-center gap-3">
                                <div className="w-1 h-8 bg-emerald-400 rounded-full"></div>
                                Batas Wilayah
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm border border-emerald-500/30">U</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/60 mb-1">Utara</p>
                                        <p className="text-sm font-bold text-white">{villageInfo?.boundary_north || '-'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm border border-emerald-500/30">S</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/60 mb-1">Selatan</p>
                                        <p className="text-sm font-bold text-white">{villageInfo?.boundary_south || '-'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm border border-emerald-500/30">T</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/60 mb-1">Timur</p>
                                        <p className="text-sm font-bold text-white">{villageInfo?.boundary_east || '-'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold text-sm border border-emerald-500/30">B</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/60 mb-1">Barat</p>
                                        <p className="text-sm font-bold text-white">{villageInfo?.boundary_west || '-'}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Potensi - Premium Carousel */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">Keunggulan Lokal</span>
                            <h2 className="text-4xl font-black font-serif text-slate-900 tracking-tight">Potensi Desa</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="/potentials" className="group flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-200 hover:border-emerald-900 transition-all pb-1">
                                Lihat Semua
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>

                    {featuredPotentials && featuredPotentials.length > 0 ? (
                        <div className="relative">
                            {/* Carousel Container */}
                            <div
                                ref={carouselRef}
                                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 pb-4"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {featuredPotentials.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="min-w-full snap-center px-4 md:px-12"
                                    >
                                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-900 to-emerald-950 shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px]">
                                            {/* Image Section */}
                                            <div className="md:w-1/2 relative h-72 md:h-full overflow-hidden">
                                                <div className="absolute top-6 left-6 z-20">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/20 ${item.category === 'tourism'
                                                        ? 'bg-blue-500/90 text-white'
                                                        : 'bg-emerald-500/90 text-white'
                                                        }`}>
                                                        {item.category === 'tourism' ? <Mountain className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                                                        {item.category === 'tourism' ? 'Wisata Desa' : 'Produk Unggulan'}
                                                    </span>
                                                </div>
                                                <img
                                                    src={item.image_path ? `/storage/${item.image_path}` : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000'}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 to-transparent md:bg-gradient-to-l md:from-emerald-950/20 md:to-transparent"></div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                                                {/* Decorative background pattern */}
                                                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                                    <Building2 className="w-64 h-64 text-white transform rotate-12 translate-x-12 -translate-y-12" />
                                                </div>

                                                <div className="relative z-10">
                                                    <h3 className="text-3xl md:text-4xl font-black font-serif text-white mb-4 leading-tight">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-emerald-100/90 text-base md:text-lg leading-relaxed line-clamp-3 mb-8 font-light">
                                                        {item.description}
                                                    </p>

                                                    <div className="space-y-4 mb-8">
                                                        {item.location && (
                                                            <div className="flex items-start gap-4 text-emerald-50">
                                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                                                                    <MapPin className="w-5 h-5 text-emerald-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400/80 mb-0.5">Lokasi</p>
                                                                    <p className="font-medium">{item.location}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {item.contact_info && (
                                                            <div className="flex items-start gap-4 text-emerald-50">
                                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                                                                    <Phone className="w-5 h-5 text-emerald-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400/80 mb-0.5">Kontak</p>
                                                                    <p className="font-medium">{item.contact_info}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {featuredPotentials.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 translate-x-2 md:-translate-x-4 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all hover:scale-110 z-10"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-4 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all hover:scale-110 z-10"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="flex justify-center gap-2 mt-8">
                                        {featuredPotentials.map((_: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => scrollToSlide(index)}
                                                className={`h-3 rounded-full transition-all ${currentSlide === index
                                                    ? 'w-8 bg-emerald-600'
                                                    : 'w-3 bg-slate-300 hover:bg-slate-400'
                                                    }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="aspect-[3/4] bg-slate-200 rounded-3xl animate-pulse"></div>)}
                        </div>
                    )}
                </div>
            </section>

            {/* Perangkat Desa Carousel */}
            {villageOfficials && villageOfficials.length > 0 && (
                <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 -ml-64 -mt-64 w-[600px] h-[600px] bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full blur-3xl opacity-40"></div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6">
                                <UserCheck className="w-4 h-4" />
                                Tim Kami
                            </div>
                            <h2 className="text-4xl font-black font-serif text-slate-900 tracking-tight mb-4">
                                Perangkat Desa Kalisabuk
                            </h2>
                            <p className="text-slate-500 text-lg">
                                Berkenalan dengan tim yang berdedikasi melayani masyarakat Desa Kalisabuk
                            </p>
                        </div>

                        <div className="relative">
                            {/* Carousel Container */}
                            <div
                                ref={officialCarouselRef}
                                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {villageOfficials.map((official: any) => (
                                    <div
                                        key={official.id}
                                        className="min-w-full md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] snap-start"
                                    >
                                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-2 h-full">
                                            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-emerald-50 to-slate-50">
                                                <img
                                                    src={official.photo ? `/storage/${official.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&background=047857&color=fff&size=400`}
                                                    alt={official.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                {/* Hover Content */}
                                                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    {official.phone && (
                                                        <div className="flex items-center gap-2 text-white text-sm mb-2">
                                                            <Phone className="w-4 h-4" />
                                                            <span>{official.phone}</span>
                                                        </div>
                                                    )}
                                                    {official.email && (
                                                        <div className="flex items-center gap-2 text-white text-sm">
                                                            <Mail className="w-4 h-4" />
                                                            <span className="truncate">{official.email}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="mb-3">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
                                                        {official.position}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-black font-serif text-slate-900 mb-2 line-clamp-2">
                                                    {official.name}
                                                </h3>
                                                {official.nip && (
                                                    <p className="text-xs text-slate-400 font-mono mb-2">NIP: {official.nip}</p>
                                                )}
                                                {official.periode && (
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-3 pt-3 border-t border-slate-100">
                                                        <Calendar className="w-4 h-4 text-emerald-500" />
                                                        <span>{official.periode}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {villageOfficials.length > 1 && (
                                <>
                                    <button
                                        onClick={prevOfficialSlide}
                                        className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 translate-x-2 md:-translate-x-4 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all hover:scale-110 z-10"
                                        aria-label="Previous official"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextOfficialSlide}
                                        className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-4 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all hover:scale-110 z-10"
                                        aria-label="Next official"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="flex justify-center gap-2 mt-8">
                                        {villageOfficials.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => scrollToOfficialSlide(index)}
                                                className={`transition-all ${index === currentOfficialSlide
                                                    ? 'w-8 bg-emerald-600'
                                                    : 'w-3 bg-slate-300 hover:bg-slate-400'
                                                    } h-3 rounded-full`}
                                                aria-label={`Go to official ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Announcements Section - Event & Info */}
            {announcements && announcements.length > 0 && (
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 -ml-64 -mt-64 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-3xl opacity-40"></div>

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-800 text-xs font-bold tracking-widest uppercase mb-6">
                                <Bell className="w-4 h-4" />
                                Pengumuman Terbaru
                            </div>
                            <h2 className="text-4xl font-black font-serif text-slate-900 tracking-tight mb-4">
                                Info & Event Desa Kalisabuk
                            </h2>
                            <p className="text-slate-500 text-lg">
                                Ikuti informasi dan kegiatan terkini yang akan diselenggarakan di Desa Kalisabuk
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {announcements.map((announcement: any) => (
                                <AnnouncementCard key={announcement.id} announcement={announcement} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services - Information Section */}
            <section className="py-20 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-2 block">Informasi Layanan</span>
                            <h2 className="text-4xl font-black font-serif text-slate-900 tracking-tight mb-6">Panduan Layanan Administrasi Desa</h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Temukan informasi lengkap mengenai berbagai layanan administrasi desa, mulai dari syarat-syarat yang diperlukan, prosedur pengajuan, hingga estimasi waktu penyelesaian. Persiapkan dokumen Anda dengan baik sebelum datang ke kantor desa.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="/layanan" className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:-translate-y-1">
                                    Lihat Semua Layanan <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                                <a href="/profil" className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white text-emerald-900 font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                                    Kontak Desa
                                </a>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-transparent rounded-3xl transform rotate-3"></div>
                            <div className="bg-white p-8 rounded-3xl shadow-xl relative border border-slate-100">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 mb-1">Surat Keterangan Usaha</p>
                                            <p className="text-xs text-slate-500 mb-2">Syarat: KTP, KK, Pas Foto</p>
                                            <span className="inline-block text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold">3 Hari Kerja</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 mb-1">Surat Pengantar Nikah</p>
                                            <p className="text-xs text-slate-500 mb-2">Syarat: KTP, KK, Akta Lahir, N1-N4</p>
                                            <span className="inline-block text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold">1 Hari Kerja</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 mb-1">Surat Keterangan Domisili</p>
                                            <p className="text-xs text-slate-500 mb-2">Syarat: KTP, KK</p>
                                            <span className="inline-block text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-semibold">1 Hari Kerja</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-bold text-emerald-600">15+ Layanan</span> administrasi tersedia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Development Section - Transparency */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-emerald-900/40 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2 block">Transparansi Dana Desa</span>
                        <h2 className="text-4xl font-black font-serif text-white tracking-tight mb-4">Pantau Pembangunan Desa</h2>
                        <p className="text-slate-400 text-lg">
                            Kami berkomitmen untuk transparansi penuh. Lihat progres pembangunan infrastruktur desa secara real-time dan visual.
                        </p>
                    </div>

                    {developments && developments.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {developments.map((dev: any) => (
                                    <div key={dev.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group">
                                        <div className="aspect-video relative overflow-hidden bg-slate-800">
                                            <img
                                                src={dev.image_before ? `/storage/${dev.image_before}` : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop'}
                                                alt={dev.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${dev.status === 'completed' ? 'bg-emerald-500 text-white' :
                                                    dev.status === 'progress' ? 'bg-blue-500 text-white' :
                                                        'bg-amber-500 text-white'
                                                    }`}>
                                                    {dev.status === 'completed' ? 'Selesai' :
                                                        dev.status === 'progress' ? 'Proses' : 'Direncanakan'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                                {dev.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                {dev.description || 'Pembangunan infrastruktur desa'}
                                            </p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <MapPin className="w-4 h-4 text-emerald-400" />
                                                    <span>{dev.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Building2 className="w-4 h-4 text-blue-400" />
                                                    <span>Rp {parseFloat(dev.budget).toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Calendar className="w-4 h-4 text-purple-400" />
                                                    <span>Tahun {dev.year}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <a href="/pembangunan" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-900/50 hover:bg-emerald-500 transition-all hover:-translate-y-1">
                                    Lihat Semua Proyek Pembangunan <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                <Building2 className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-400 text-lg mb-2">Belum ada data pembangunan</p>
                            <p className="text-slate-500 text-sm">Data proyek pembangunan akan ditampilkan di sini</p>
                        </div>
                    )}
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

// Announcement Card Component
function AnnouncementCard({ announcement }: any) {
    const typeConfig = {
        event: {
            bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
            icon: <Calendar className="w-5 h-5" />,
            badge: 'bg-blue-100 text-blue-800',
            label: 'Event'
        },
        info: {
            bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            icon: <Info className="w-5 h-5" />,
            badge: 'bg-emerald-100 text-emerald-800',
            label: 'Info'
        },
        warning: {
            bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
            icon: <AlertCircle className="w-5 h-5" />,
            badge: 'bg-amber-100 text-amber-800',
            label: 'Penting'
        }
    };

    const config = typeConfig[announcement.type as keyof typeof typeConfig] || typeConfig.info;
    const eventDate = announcement.event_date ? new Date(announcement.event_date) : null;

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1">
            <div className={`${config.bg} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`${config.badge} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5`}>
                            {config.icon}
                            {config.label}
                        </div>
                    </div>
                    <h3 className="text-xl font-black font-serif mb-2 line-clamp-2">
                        {announcement.title}
                    </h3>
                </div>
            </div>

            <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {announcement.description}
                </p>

                <div className="space-y-2">
                    {eventDate && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                                {eventDate.toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    )}
                    {announcement.location && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPinned className="w-4 h-4 text-emerald-500" />
                            <span className="font-medium">{announcement.location}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
