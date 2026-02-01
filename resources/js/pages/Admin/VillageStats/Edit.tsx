import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BarChart3, ArrowLeft, Save, Activity, Wallet, Users, Home, CheckCircle2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface VillageStat {
    id: number;
    title: string;
    value: string;
    unit: string | null;
    icon: string;
    color: string;
    description: string | null;
    category: string | null;
    order: number;
    is_active: boolean;
}

export default function Edit({ stat }: { stat: VillageStat }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik Desa', href: '/dashboard/village-stats' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: stat.title,
        value: stat.value,
        unit: stat.unit || '',
        icon: stat.icon,
        color: stat.color,
        description: stat.description || '',
        category: stat.category || '',
        order: stat.order,
        is_active: stat.is_active,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('village-stats.update', stat.id));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${stat.title}`} />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('village-stats.index')}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Data Statistik</h1>
                        <p className="text-slate-500 text-sm">Ubah informasi data statistik "{stat.title}".</p>
                    </div>
                </div>

                {/* Simplified Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl">
                    <form onSubmit={submit} className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-700">Nama Data / Judul <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Jumlah Penduduk"
                                required
                                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="value" className="text-slate-700">Jumlah / Nilai <span className="text-red-500">*</span></Label>
                                <Input
                                    id="value"
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    placeholder="5420"
                                    required
                                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                />
                                {errors.value && <p className="text-sm text-red-500">{errors.value}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit" className="text-slate-700">Satuan</Label>
                                <Input
                                    id="unit"
                                    value={data.unit}
                                    onChange={(e) => setData('unit', e.target.value)}
                                    placeholder="Jiwa / Ha / Unit"
                                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                />
                                {errors.unit && <p className="text-sm text-red-500">{errors.unit}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-700">Kategori</Label>
                            <Input
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                placeholder="Contoh: Kependudukan, Pendidikan, Ekonomi"
                                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                            />
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2">
                                <Label htmlFor="order" className="text-slate-700">Urutan Tampil</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                />
                                {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                            </div>

                            <div className="flex items-end pb-2">
                                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 w-full hover:bg-slate-50 transition-colors">
                                    <Label htmlFor="is_active" className="text-sm text-slate-700 font-medium cursor-pointer flex-1">
                                        Tampilkan Data
                                    </Label>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 mt-4 border-t border-slate-100">
                            <Link
                                href={route('village-stats.index')}
                                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Perbarui Statistik
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
