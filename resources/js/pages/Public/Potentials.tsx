import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import PotentialGrid from '@/components/PotentialGrid';
import { Sparkles, Leaf, ShoppingBag, Mountain, ArrowRight } from 'lucide-react';

interface PotentialsProps {
    potentials: any[];
}

export default function Potentials({ potentials }: PotentialsProps) {
    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Potensi Desa' }
    ];

    return (
        <PublicLayout>
            <Head title="Potensi Desa - Kalisabuk" />

            <PageHeader
                title="Potensi Unggulan"
                subtitle="Menjelajahi kekayaan alam, produk kreatif, dan peluang ekonomi unggulan Desa Kalisabuk."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {[
                            { label: 'Semua', icon: Sparkles, active: true },
                            { label: 'Wisata Alam', icon: Mountain },
                            { label: 'Produk UMKM', icon: ShoppingBag },
                            { label: 'Pertanian', icon: Leaf },
                        ].map((tab, idx) => (
                            <button
                                key={idx}
                                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300
                                    ${tab.active
                                        ? 'bg-emerald-900 text-white shadow-lg shadow-emerald-900/20 ring-2 ring-emerald-900 ring-offset-2 scale-105'
                                        : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 shadow-sm'}
                                `}
                            >
                                <tab.icon className={`w-4 h-4 ${tab.active ? 'text-emerald-300' : 'text-slate-400'}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div>
                        {potentials.length > 0 ? (
                            <PotentialGrid items={potentials} />
                        ) : (
                            <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                <Leaf className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900">Belum ada data</h3>
                                <p className="text-slate-500 text-lg mt-2">Data potensi desa sedang dalam proses pendataan.</p>
                            </div>
                        )}
                    </div>

                    {/* Investment CTA */}
                    <div className="mt-32 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[3rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-500 opacity-20 blur-xl"></div>
                        <div className="relative bg-emerald-900 rounded-[2.5rem] p-10 md:p-20 text-center shadow-2xl overflow-hidden isolate">
                            {/* Glow Effects */}
                            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]"></div>

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm border border-white/10">
                                    <Sparkles className="w-8 h-8 text-emerald-300" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black font-serif text-white mb-8 leading-tight">
                                    Tertarik Berinvestasi <br />di <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">Kalisabuk</span>?
                                </h2>
                                <p className="text-xl text-emerald-100/90 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
                                    Kami membuka peluang kerjasama seluas-luasnya untuk pengembangan potensi desa yang berkelanjutan dan saling menguntungkan.
                                </p>
                                <button className="inline-flex items-center gap-2 px-10 py-5 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-all hover:scale-105 shadow-xl group">
                                    <span>Hubungi BUMDes</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
