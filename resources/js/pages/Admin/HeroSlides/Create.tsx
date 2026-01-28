import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slider', href: route('hero-slides.index') },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        image_path: null as File | null,
        title: '',
        subtitle: '',
        order: 0,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('hero-slides.store'));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Slide" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('hero-slides.index')}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Slide Baru</h1>
                        <p className="text-slate-500 text-sm">Upload gambar untuk slider halaman utama.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-8">

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image_path" className="text-slate-700 font-medium">Gambar Slide <span className="text-red-500">*</span></Label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer group relative aspect-video flex flex-col items-center justify-center bg-slate-50/50 overflow-hidden">
                                    <Input
                                        id="image_path"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image_path', e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    {data.image_path ? (
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={URL.createObjectURL(data.image_path)}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white font-medium flex items-center gap-2">
                                                    <UploadCloud className="w-5 h-5" />
                                                    Ganti Gambar
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-4 bg-white shadow-sm border border-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300 relative z-10">
                                                <ImageIcon className="w-8 h-8 text-emerald-500" />
                                            </div>
                                            <div className="space-y-1 relative z-10">
                                                <p className="text-sm font-semibold text-slate-700">Klik untuk upload gambar</p>
                                                <p className="text-xs text-slate-500">JPG/PNG/WEBP, Maks 2MB. Rekomendasi: 1920x1080px</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.image_path && <p className="text-sm text-red-500">{errors.image_path}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-700">Judul (Opsional)</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Judul besar slide..."
                                        className="border-slate-200 focus:border-emerald-500 bg-white"
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subtitle" className="text-slate-700">Subjudul (Opsional)</Label>
                                    <Input
                                        id="subtitle"
                                        value={data.subtitle}
                                        onChange={(e) => setData('subtitle', e.target.value)}
                                        placeholder="Keterangan singkat..."
                                        className="border-slate-200 focus:border-emerald-500 bg-white"
                                    />
                                    {errors.subtitle && <p className="text-sm text-red-500">{errors.subtitle}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="order" className="text-slate-700">Urutan</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value))}
                                        className="border-slate-200 focus:border-emerald-500 bg-white"
                                    />
                                    <p className="text-xs text-slate-500">Semakin kecil angkanya, semakin awal munculnya.</p>
                                    {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <Label htmlFor="is_active" className="text-slate-700 font-medium cursor-pointer">
                                        Status Aktif
                                    </Label>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route('hero-slides.index')}
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
                                Simpan Slide
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
