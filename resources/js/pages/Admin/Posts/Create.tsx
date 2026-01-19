import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';

export default function PostCreate() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Berita', href: '/dashboard/posts' },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category: 'news',
        published_at: new Date().toISOString().split('T')[0],
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/dashboard/posts');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Berita" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Tambah Berita</h2>
                        <p className="text-muted-foreground">Buat berita atau pengumuman baru.</p>
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
                            <Label htmlFor="image">Gambar Utama (Wajib)</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="cursor-pointer"
                                required
                            />
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="content">Konten</Label>
                            <RichTextEditor
                                value={data.content}
                                onChange={(content) => setData('content', content)}
                                error={errors.content}
                            />
                            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/posts">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan Berita
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
