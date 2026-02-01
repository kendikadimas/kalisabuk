import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import NewsCard from '@/components/NewsCard';
import { Search, Tag } from 'lucide-react';

interface NewsIndexProps {
    posts: {
        data: any[];
        links: any[];
    };
}

export default function Index({ posts }: NewsIndexProps) {
    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Kabar Desa' }
    ];

    return (
        <PublicLayout>
            <Head title="Berita Desa" />

            {/* Premium Page Header */}
            <PageHeader
                title="Kabar Desa"
                subtitle="Informasi terkini, pengumuman, dan artikel menarik seputar kegiatan Desa Kalisabuk."
                breadcrumbs={breadcrumbs}
                // Optional: Put a real image here suitable for the village news
                image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content Area - Blog Feed */}
                        <div className="lg:col-span-8">
                            {posts.data.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {posts.data.map((post) => (
                                        <div key={post.id} className="h-full">
                                            <NewsCard post={post} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                        <Tag className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Belum ada berita</h3>
                                    <p className="text-slate-500 mt-2">Silakan cek kembali nanti untuk informasi terbaru.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {posts.data.length > 0 && (
                                <div className="flex justify-center pt-16">
                                    <div className="flex gap-2">
                                        {posts.links.map((link, key) => (
                                            <Link
                                                key={key}
                                                href={link.url || '#'}
                                                className={`flex items-center justify-center px-4 py-2 text-sm font-bold rounded-lg transition-all ${link.active
                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-600'
                                                    : !link.url
                                                        ? 'bg-transparent text-slate-300 cursor-not-allowed'
                                                        : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Search Widget */}
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 lg:sticky lg:top-24">
                                <h3 className="text-xl font-bold font-serif text-slate-900 mb-6">Cari Berita</h3>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Ketik kata kunci..."
                                        className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 group-hover:bg-white"
                                    />
                                    <button className="absolute right-3 top-3 p-1 text-slate-400 hover:text-emerald-600 transition-colors">
                                        <Search className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Newsletter / Subscribe Widget */}
                                <div className="mt-8 bg-emerald-900 p-8 rounded-2xl text-white relative overflow-hidden isolate">
                                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-500/30 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-emerald-800/50 rounded-full blur-3xl"></div>

                                    <h3 className="text-xl font-black font-serif mb-3 relative z-10">Punya Informasi?</h3>
                                    <p className="text-emerald-100/80 mb-6 relative z-10 text-sm leading-relaxed">
                                        Warga dapat berkontribusi memberikan informasi kejadian atau kegiatan positif.
                                    </p>
                                    <button className="w-full py-3.5 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg shadow-black/10 relative z-10">
                                        Hubungi Admin
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
