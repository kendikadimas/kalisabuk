export default function HeroSection() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                    {/* Text Section */}
                    <div className="lg:col-span-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Website Resmi Desa
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-serif text-slate-900 tracking-tight mb-8 leading-[1.1]">
                            Maju Bersama <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-900">
                                Desa Kalisabuk.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                            Pusat informasi pemerintahan, pelayanan publik, dan potensi desa yang transparan, akuntabel, ve inovatif.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a
                                href="#news"
                                className="px-8 py-4 bg-emerald-900 text-white rounded-full font-bold text-sm tracking-wide hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 hover:-translate-y-1"
                            >
                                Jelajahi Berita
                            </a>
                            <a
                                href="/profile"
                                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-sm tracking-wide hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                            >
                                Profil Desa
                            </a>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="lg:col-span-6 mt-20 lg:mt-0 relative">
                        {/* Decorative Blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-emerald-500/10 rounded-full blur-[100px] -z-10"></div>

                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                                alt="Desa Kalisabuk"
                                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-[1.5s]"
                            />

                            {/* Floating Stats Card - Example */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg hidden md:block">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Populasi</p>
                                        <p className="text-2xl font-black text-slate-900">12,500+</p>
                                    </div>
                                    <div className="h-10 w-px bg-slate-200"></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Luas Wilayah</p>
                                        <p className="text-2xl font-black text-slate-900">8.5 km²</p>
                                    </div>
                                    <div className="h-10 w-px bg-slate-200"></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tahun</p>
                                        <p className="text-2xl font-black text-slate-900">2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
