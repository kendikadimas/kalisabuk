import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, MapPin, Phone, Mountain, FileText, ExternalLink } from 'lucide-react';

export default function PotentialEdit({ potential }: { potential: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Potensi Desa', href: '/dashboard/potentials' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, post: submitPost, processing, errors } = useForm({
        _method: 'PUT',
        name: potential.name,
        category: potential.category,
        description: potential.description,
        location: potential.location,
        contact_info: potential.contact_info || '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        submitPost(`/dashboard/potentials/${potential.id}`);
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Potensi Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/potentials"
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Potensi Desa</h1>
                        <p className="text-slate-500 text-sm">Perbarui data potensi wisata atau produk unggulan.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-700">Nama Potensi</Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Contoh: Curug Indah, Keripik Singkong..."
                                            required
                                        />
                                        <Mountain className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-slate-700">Kategori</Label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full h-12 px-3 pl-10 rounded-md border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white appearance-none"
                                        >
                                            <option value="tourism">Wisata</option>
                                            <option value="product">Produk Unggulan</option>
                                        </select>
                                        <div className="absolute left-3 top-3.5 pointer-events-none">
                                            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-slate-700">Lokasi / Alamat</Label>
                                    <div className="relative">
                                        <Input
                                            id="location"
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Alamat lengkap lokasi..."
                                            required
                                        />
                                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contact_info" className="text-slate-700">Info Kontak (HP/WA)</Label>
                                    <div className="relative">
                                        <Input
                                            id="contact_info"
                                            type="text"
                                            value={data.contact_info}
                                            onChange={(e) => setData('contact_info', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="08123xxxxxxx"
                                        />
                                        <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.contact_info && <p className="text-sm text-red-500">{errors.contact_info}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-slate-700">Gambar Utama (Opsional)</Label>
                                    <div className="relative">
                                        <Input
                                            id="image"
                                            type="file"
                                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                            className="h-12 pt-2.5 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                        />
                                        <FileText className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="flex justify-between items-start mt-1.5">
                                        <p className="text-xs text-slate-500">Format: JPG, PNG. Maks: 10MB</p>
                                        {potential.image_path && (
                                            <a
                                                href={potential.image_path.startsWith('http') ? potential.image_path : `/storage/${potential.image_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-xs flex items-center text-emerald-600 hover:text-emerald-700 hover:underline"
                                            >
                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                Lihat gambar saat ini
                                            </a>
                                        )}
                                    </div>
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-700">Deskripsi Lengkap</Label>
                            <textarea
                                id="description"
                                rows={6}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Jelaskan detail potensi ini..."
                                required
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href="/dashboard/potentials"
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
