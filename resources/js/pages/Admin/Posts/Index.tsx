import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { BookOpen, Plus, Pencil, Trash2 } from 'lucide-react';

export default function PostIndex({ posts }: { posts: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Berita', href: '/dashboard/posts' },
    ];

    const { flash } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Berita" />

            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-slate-900">Daftar Berita</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Kelola berita dan pengumuman desa.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/posts/create"
                        className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Berita
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.data.length > 0 ? (
                        posts.data.map((post: any) => (
                            <div key={post.id} className="bg-white border boundary-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                                {post.image_path && (
                                    <div className="h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                                        <img
                                            src={post.image_path.startsWith('http') ? post.image_path : `/storage/${post.image_path}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs text-slate-400 font-medium">
                                            {post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                                        {post.title}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end gap-2">
                                        <Link
                                            href={`/dashboard/posts/${post.id}/edit`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="Edit Berita"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/dashboard/posts/${post.id}`}
                                            method="delete"
                                            as="button"
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-red-600 hover:bg-red-50 transition-colors"
                                            onClick={(e) => {
                                                if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            title="Hapus Berita"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">Belum ada data berita.</p>
                            <Link href="/dashboard/posts/create" className="text-emerald-600 font-bold hover:underline text-sm mt-2 inline-block">
                                Buat Berita Baru
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination can be added here using posts.links */}
            </div>
        </AppLayout>
    );
}
