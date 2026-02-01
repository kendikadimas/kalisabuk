import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { BookOpen, Plus, Pencil, Trash2, MoreHorizontal, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { route } from 'ziggy-js';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { router } from '@inertiajs/react';

export default function PostIndex({ posts }: { posts: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Berita', href: '/dashboard/posts' },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('posts.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Berita" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Kelola Berita
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola berita, artikel, dan informasi publik desa.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={'/dashboard/posts/create'}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Tulis Berita
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.data.length > 0 ? (
                        posts.data.map((post: any) => (
                            <Card key={post.id} className="group overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col h-full">
                                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                                    {post.image_path ? (
                                        <img
                                            src={post.image_path.startsWith('http') ? post.image_path : `/storage/${post.image_path}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <BookOpen className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-5 flex-1 flex flex-col gap-3">
                                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                                        {post.content ? post.content.replace(/<[^>]*>?/gm, "") : "Tidak ada deskripsi singkat."}
                                    </p>

                                    <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-slate-400">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Draft'}
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0 border-t border-slate-100 mt-auto bg-slate-50/50 flex justify-between items-center">
                                    <Link href={route('posts.edit', post.id)}>
                                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-emerald-600 hover:bg-white text-xs gap-2">
                                            <Pencil className="w-3.5 h-3.5" />
                                            Edit
                                        </Button>
                                    </Link>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/berita/${post.slug}`} target='_blank' className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Lihat Berita
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('posts.edit', post.id)} className="cursor-pointer">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-red-600 hover:bg-red-700">
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium">Belum ada berita yang dipublikasikan.</p>
                            <Link href={'/dashboard/posts/create'} className="text-emerald-600 text-sm font-medium hover:underline mt-2 inline-block">
                                Mulai menulis berita
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {posts.links && posts.links.length > 3 && (
                    <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200 mt-8 rounded-xl">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Halaman {posts.current_page} dari {posts.last_page}
                            </p>
                            <div className="flex gap-1">
                                {posts.links.map((link: any, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${link.active
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
