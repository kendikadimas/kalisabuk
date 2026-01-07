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

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg border border-slate-200">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="py-3 px-6">Judul</th>
                                <th scope="col" className="py-3 px-6">Kategori</th>
                                <th scope="col" className="py-3 px-6">Tanggal</th>
                                <th scope="col" className="py-3 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.data.length > 0 ? (
                                posts.data.map((post: any) => (
                                    <tr key={post.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap">
                                            {post.title}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.category === 'news' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {post.category === 'news' ? 'Berita' : 'Pengumuman'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="py-4 px-6 text-right flex justify-end gap-2">
                                            <Link
                                                href={`/dashboard/posts/${post.id}/edit`}
                                                className="font-medium text-blue-600 hover:underline flex items-center"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/dashboard/posts/${post.id}`}
                                                method="delete"
                                                as="button"
                                                className="font-medium text-red-600 hover:underline flex items-center"
                                                onClick={(e) => {
                                                    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-slate-400">
                                        Belum ada data berita.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination can be added here using posts.links */}
            </div>
        </AppLayout>
    );
}
