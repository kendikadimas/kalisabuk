import { Head, Link, router } from '@inertiajs/react';
import { Eye, Heart } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import NewsCard from '@/components/NewsCard';

declare var route: any;

interface NewsShowProps {
    post: any;
    related: any[];
    hasLiked: boolean;
}

export default function Show({ post, related, hasLiked }: NewsShowProps) {
    return (
        <PublicLayout forceBackground={true}>
            <Head title={post.title} />

            <div className="bg-slate-50 pt-28 pb-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
                        <Link href="/" className="hover:text-emerald-600">Beranda</Link>
                        <span>/</span>
                        <Link href="/news" className="hover:text-emerald-600">Kabar Desa</Link>
                        <span>/</span>
                        <span className="text-slate-800 font-medium truncate">{post.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Article Content */}
                        <div className="lg:col-span-2">
                            <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-slate-400 text-sm flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {new Date(post.published_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                        <span className="text-slate-400 text-sm flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {post.views} Dilihat
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                                        {post.title}
                                    </h1>
                                </div>

                                {/* Featured Image */}
                                <div className="aspect-[16/9] w-full mb-10 overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 shadow-inner">
                                    <img
                                        src={post.image_path ? (post.image_path.startsWith('http') ? post.image_path : `/storage/${post.image_path}`) : 'https://placehold.co/1200x800/f1f5f9/94a3b8?text=Berita+Desa'}
                                        alt={post.title} loading="lazy" className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="prose prose-lg prose-slate prose-emerald max-w-none first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-600 first-letter:mr-3 first-letter:float-left">
                                    <div
                                        className="whitespace-pre-line text-slate-700 leading-8"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>

                                {/* Footer / Tags / Share */}
                                <div className="mt-12 pt-8 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <button
                                            onClick={() => !hasLiked && router.post(route('news.like', post.slug), {}, { preserveScroll: true })}
                                            disabled={hasLiked}
                                            className={`group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 border hover:shadow-lg
                                                ${hasLiked
                                                    ? 'bg-rose-600 text-white border-rose-600 shadow-rose-600/20 cursor-default'
                                                    : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-rose-600/20'
                                                }`}
                                        >
                                            <Heart className={`w-6 h-6 transition-transform ${hasLiked ? 'fill-white scale-110' : 'group-hover:scale-110 group-hover:fill-white'}`} />
                                            <span className="font-bold text-lg">{post.likes || 0}</span>
                                            <span className="font-medium text-sm opacity-80">{hasLiked ? 'Disukai' : 'Suka'}</span>
                                        </button>
                                    </div>

                                    <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Bagikan Artikel:</h4>
                                    <div className="flex gap-4">
                                        <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Latest News Widget */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                    Berita Terbaru
                                </h3>
                                <div className="space-y-6">
                                    {related.map((item) => (
                                        <Link key={item.id} href={`/news/${item.slug}`} className="group flex gap-4">
                                            <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                                <img
                                                    src={item.image_path ? (item.image_path.startsWith('http') ? item.image_path : `/storage/${item.image_path}`) : 'https://placehold.co/150x150/f1f5f9/94a3b8?text=Img'}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <span className="text-xs text-slate-400 mt-2 block">
                                                    {new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
