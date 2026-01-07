import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PostEdit({ post }: { post: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Berita', href: '/dashboard/posts' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, post: submitPost, processing, errors } = useForm({
        _method: 'PUT',
        title: post.title,
        content: post.content,
        category: post.category,
        published_at: post.published_at ? post.published_at.split('T')[0] : '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Inertia doesn't support file uploads with PUT/PATCH directly in the same way, need method spoofing
        submitPost(`/dashboard/posts/${post.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Berita" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Edit Berita</h2>
                        <p className="text-muted-foreground">Perbarui informasi berita atau pengumuman.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="title">Judul</Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="category">Kategori</Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="news">Berita</option>
                                    <option value="announcement">Pengumuman</option>
                                </select>
                            </div>
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="published_at">Tanggal Publish</Label>
                            <Input
                                id="published_at"
                                type="date"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                            />
                            {errors.published_at && <p className="text-sm text-red-500">{errors.published_at}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="image">Gambar Utama (Biarkan kosong jika tidak berubah)</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="cursor-pointer"
                            />
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                            {post.image_path && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                    Gambar saat ini: <a href={`/storage/${post.image_path}`} target="_blank" className="text-primary hover:underline">Lihat</a>
                                </div>
                            )}
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="content">Konten</Label>
                            <textarea
                                id="content"
                                rows={8}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/posts">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
