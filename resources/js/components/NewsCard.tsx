import { Link } from '@inertiajs/react';
import { Calendar, ArrowRight } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_path?: string;
    published_at: string;
    category: string;
}

export default function NewsCard({ post }: { post: Post }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-emerald-500/20 hover:-translate-y-1 h-full">
            <div className="relative isolate overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                    <img
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src={post.image_path ? `/storage/${post.image_path}` : 'https://placehold.co/600x400?text=Berita+Desa'}
                        alt={post.title}
                    />
                </div>
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 shadow-sm border border-emerald-100">
                        {post.category}
                    </span>
                </div>
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={post.published_at}>
                            {new Date(post.published_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </time>
                    </div>

                    <Link href={`/news/${post.slug}`}>
                        <h3 className="text-xl font-bold font-serif text-slate-900 transition-colors group-hover:text-emerald-700 line-clamp-2 leading-tight">
                            {post.title}
                        </h3>
                    </Link>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {post.content}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <Link
                        href={`/news/${post.slug}`}
                        className="flex items-center gap-1 text-sm font-bold text-emerald-600 transition-colors group-hover:text-emerald-700"
                    >
                        Baca Selengkapnya
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
