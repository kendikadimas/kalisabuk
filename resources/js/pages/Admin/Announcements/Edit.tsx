import { Head, Link, useForm } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Megaphone, Calendar, MapPin, AlignLeft, Info, Bell, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { route } from 'ziggy-js';

interface Props {
    announcement: {
        id: number;
        title: string;
        description: string;
        event_date: string | null;
        location: string | null;
        type: string;
        is_active: boolean;
    };
}

export default function Edit({ announcement }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengumuman', href: route('admin.announcements.index') },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm<{
        title: string;
        description: string;
        event_date: string;
        location: string;
        type: string;
        is_active: boolean;
    }>({
        title: announcement.title,
        description: announcement.description,
        event_date: announcement.event_date || '',
        location: announcement.location || '',
        type: announcement.type,
        is_active: announcement.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.announcements.update', announcement.id));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pengumuman" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.announcements.index')}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Pengumuman</h1>
                        <p className="text-slate-500 text-sm">Perbarui informasi pengumuman atau acara.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8">

                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                                    <Megaphone className="w-4 h-4 text-emerald-500" />
                                    Informasi Utama
                                </h3>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-700">Judul Pengumuman <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                        placeholder="Contoh: Kerja Bakti Desa"
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type" className="text-slate-700">Tipe Pengumuman</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(val) => setData('type', val)}
                                    >
                                        <SelectTrigger className="w-full border-slate-200 focus:ring-emerald-500/20">
                                            <SelectValue placeholder="Pilih Tipe" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="info">
                                                <div className="flex items-center gap-2">
                                                    <Info className="w-4 h-4 text-emerald-500" />
                                                    Info Umum
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="event">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-blue-500" />
                                                    Agenda / Event
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="warning">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                    Penting / Darurat
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="event_date" className="text-slate-700">Tanggal Event (Opsional)</Label>
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                id="event_date"
                                                value={data.event_date}
                                                onChange={(e) => setData('event_date', e.target.value)}
                                                className="pl-9 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            />
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        </div>
                                        {errors.event_date && <p className="text-sm text-red-500">{errors.event_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-slate-700">Lokasi (Opsional)</Label>
                                        <div className="relative">
                                            <Input
                                                id="location"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                className="pl-9 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="Lokasi kegiatan..."
                                            />
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        </div>
                                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-700">Deskripsi Lengkap</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={6}
                                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="Tuliskan detail pengumuman di sini..."
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active" className="text-slate-700">Publikasikan Sekarang</Label>
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        href={route('admin.announcements.index')}
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
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Preview/Tips */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-emerald-50 border-emerald-100 shadow-none">
                            <CardContent className="p-6 space-y-4">
                                <div className="p-3 bg-emerald-100 rounded-xl w-fit">
                                    <Bell className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="font-semibold text-emerald-900">Tips Pengumuman</h3>
                                <ul className="space-y-2 text-sm text-emerald-800 list-disc list-inside">
                                    <li>Gunakan judul yang singkat dan padat.</li>
                                    <li>Pilih <strong>Tipe</strong> yang sesuai agar warga mudah mengenali urgensinya.</li>
                                    <li>Pastikan tanggal dan lokasi acara sudah benar jika ada.</li>
                                    <li>Gunakan bahasa yang mudah dipahami.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
