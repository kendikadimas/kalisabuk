import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';
import { ArrowLeft, FileText, Save, ExternalLink, Calendar, Tag, Image } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PostEdit({ post, categories }: { post: any, categories: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Berita', href: '/dashboard/posts' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, post: submitPost, processing, errors } = useForm<{
        _method: string;
        title: string;
        content: string;
        post_category_id: string;
        published_at: string;
        image: File | null;
    }>({
        _method: 'PUT',
        title: post.title,
        content: post.content,
        post_category_id: post.post_category_id ? String(post.post_category_id) : (categories.length > 0 ? String(categories[0].id) : ''),
        published_at: post.published_at ? post.published_at.split('T')[0] : '',
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        submitPost(`/dashboard/posts/${post.id}`);
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Berita" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/posts"
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Berita</h1>
                        <p className="text-slate-500 text-sm">Perbarui informasi berita atau artikel.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label htmlFor="title" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-500" />
                                    Judul Berita
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="published_at" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    Tanggal Publikasi
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="published_at"
                                        type="date"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                        className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                                {errors.published_at && <p className="text-sm text-red-500">{errors.published_at}</p>}
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="post_category_id" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-emerald-500" />
                                    Kategori
                                </Label>
                                <Select
                                    value={String(data.post_category_id)}
                                    onValueChange={(val) => setData('post_category_id', val)}
                                >
                                    <SelectTrigger className="w-full h-12 border-slate-200 focus:ring-emerald-500/20">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.post_category_id && <p className="text-sm text-red-500">{errors.post_category_id}</p>}
                            </div>

                            <div className="space-y-4">
                                <Label htmlFor="image" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <Image className="w-4 h-4 text-emerald-500" />
                                    Gambar Utama (Opsional)
                                </Label>
                                <div className="relative group">
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                        className="h-12 pt-2.5 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer text-slate-500"
                                    />
                                </div>
                                <div className="flex justify-between items-start mt-1.5">
                                    <p className="text-xs text-slate-500">Format: JPG, PNG. Maks: 10MB</p>
                                    {post.image_path && (
                                        <a
                                            href={post.image_path.startsWith('http') ? post.image_path : `/storage/${post.image_path}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs flex items-center text-emerald-600 hover:text-emerald-700 hover:underline px-2 py-1 bg-emerald-50 rounded-lg"
                                        >
                                            <ExternalLink className="w-3 h-3 mr-1" />
                                            Lihat gambar saat ini
                                        </a>
                                    )}
                                </div>
                                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="content" className="text-slate-700 font-semibold">Konten Berita</Label>
                            <RichTextEditor
                                value={data.content}
                                onChange={(content) => setData('content', content)}
                                error={errors.content}
                            />
                            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                            <Link
                                href="/dashboard/posts"
                                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
