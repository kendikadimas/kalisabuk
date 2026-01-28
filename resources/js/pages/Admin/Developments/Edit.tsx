import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, MapPin, BadgeDollarSign, Calendar, HardHat, Building, Image as ImageIcon, ExternalLink } from 'lucide-react';
import React from 'react';

export default function EditDevelopment({ development }: { development: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pembangunan', href: '/dashboard/developments' },
        { title: 'Edit', href: `/dashboard/developments/${development.id}/edit` },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: development.title || '',
        location: development.location || '',
        budget: development.budget || '',
        year: development.year || '',
        description: development.description || '',
        contractor: development.contractor || '',
        status: development.status || 'planned',
        image_before: null as File | null,
        image_after: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dashboard/developments/${development.id}`);
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pembangunan" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/developments"
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Data Pembangunan</h1>
                        <p className="text-slate-500 text-sm">Perbarui data proyek pembangunan atau infrastruktur desa.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-700">Nama Proyek</Label>
                                    <div className="relative">
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Contoh: Pengaspalan Jalan, Pembangunan Posyandu"
                                            required
                                        />
                                        <Building className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-slate-700">Lokasi</Label>
                                    <div className="relative">
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Lokasi proyek..."
                                            required
                                        />
                                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="budget" className="text-slate-700">Anggaran (Rp)</Label>
                                        <div className="relative">
                                            <Input
                                                id="budget"
                                                type="number"
                                                value={data.budget}
                                                onChange={(e) => setData('budget', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="0"
                                            />
                                            <BadgeDollarSign className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="year" className="text-slate-700">Tahun Anggaran</Label>
                                        <div className="relative">
                                            <Input
                                                id="year"
                                                value={data.year}
                                                onChange={(e) => setData('year', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                required
                                            />
                                            <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contractor" className="text-slate-700">Pelaksana / Kontraktor</Label>
                                    <div className="relative">
                                        <Input
                                            id="contractor"
                                            value={data.contractor}
                                            onChange={(e) => setData('contractor', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Nama pelaksana..."
                                        />
                                        <HardHat className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.contractor && <p className="text-red-500 text-sm">{errors.contractor}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-slate-700">Status Proyek</Label>
                                    <div className="relative">
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full h-12 px-3 pl-10 rounded-md border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white appearance-none"
                                        >
                                            <option value="planned">Rencana (Planned)</option>
                                            <option value="progress">Sedang Berjalan (In Progress)</option>
                                            <option value="completed">Selesai (Completed)</option>
                                        </select>
                                        <div className="absolute left-3 top-3.5 pointer-events-none">
                                            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-700">Deskripsi Singkat</Label>
                                    <textarea
                                        id="description"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[120px]"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Keterangan tambahan mengenai proyek..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-6">
                            <div className="space-y-3">
                                <Label htmlFor="image_before" className="text-slate-700 font-medium">Foto Kondisi Awal / 0%</Label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer group relative">
                                    <Input
                                        id="image_before"
                                        type="file"
                                        onChange={(e) => setData('image_before', e.target.files ? e.target.files[0] : null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-slate-100 rounded-full group-hover:bg-emerald-100 transition-colors">
                                            <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500" />
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">{development.image_before ? 'Ganti Foto 0%' : 'Upload Foto 0%'}</p>
                                    </div>
                                </div>
                                {development.image_before && (
                                    <a href={`/storage/${development.image_before}`} target="_blank" className="flex items-center text-xs text-emerald-600 hover:underline mt-1">
                                        <ExternalLink className="w-3 h-3 mr-1" /> Lihat foto saat ini
                                    </a>
                                )}
                                {errors.image_before && <p className="text-red-500 text-sm">{errors.image_before}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="image_after" className="text-slate-700 font-medium">Foto Hasil Akhir / 100%</Label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer group relative">
                                    <Input
                                        id="image_after"
                                        type="file"
                                        onChange={(e) => setData('image_after', e.target.files ? e.target.files[0] : null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-slate-100 rounded-full group-hover:bg-emerald-100 transition-colors">
                                            <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500" />
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">{development.image_after ? 'Ganti Foto 100%' : 'Upload Foto 100%'}</p>
                                    </div>
                                </div>
                                {development.image_after && (
                                    <a href={`/storage/${development.image_after}`} target="_blank" className="flex items-center text-xs text-emerald-600 hover:underline mt-1">
                                        <ExternalLink className="w-3 h-3 mr-1" /> Lihat foto saat ini
                                    </a>
                                )}
                                {errors.image_after && <p className="text-red-500 text-sm">{errors.image_after}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href="/dashboard/developments"
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
