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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from '@/components/ui/switch';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik Desa', href: '/dashboard/village-stats' },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        value: '',
        unit: '',
        icon: 'chart',
        color: 'emerald',
        size: 'small',
        description: '',
        category: '',
        order: 0,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('village-stats.store'));
    };

    const iconOptions = [
        { value: 'chart', label: 'Grafik', icon: BarChart3 },
        { value: 'users', label: 'Penduduk', icon: Users },
        { value: 'home', label: 'Wilayah', icon: Home },
        { value: 'activity', label: 'Aktivitas', icon: Activity },
        { value: 'wallet', label: 'Keuangan', icon: Wallet },
    ];

    const colorOptions = [
        { value: 'emerald', label: 'Hijau', class: 'bg-emerald-500', ring: 'ring-emerald-500' },
        { value: 'blue', label: 'Biru', class: 'bg-blue-500', ring: 'ring-blue-500' },
        { value: 'purple', label: 'Ungu', class: 'bg-purple-500', ring: 'ring-purple-500' },
        { value: 'orange', label: 'Oranye', class: 'bg-orange-500', ring: 'ring-orange-500' },
        { value: 'pink', label: 'Pink', class: 'bg-pink-500', ring: 'ring-pink-500' },
        { value: 'red', label: 'Merah', class: 'bg-red-500', ring: 'ring-red-500' },
        { value: 'yellow', label: 'Kuning', class: 'bg-yellow-500', ring: 'ring-yellow-500' },
        { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500', ring: 'ring-indigo-500' },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Statistik" />

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
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Data Statistik</h1>
                        <p className="text-slate-500 text-sm">Tambahkan data statistik baru untuk ditampilkan di halaman publik.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Main Data */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3">Informasi Statistik</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-slate-700">Judul / Nama Data <span className="text-red-500">*</span></Label>
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

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="value" className="text-slate-700">Nilai <span className="text-red-500">*</span></Label>
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
                                            placeholder="Jiwa"
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
                                        placeholder="Contoh: Demografi"
                                        className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    />
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-700">Deskripsi</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        placeholder="Deskripsi singkat..."
                                        className="w-full rounded-md border border-slate-200 p-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </div>

                            {/* Right Column: Appearance & Settings */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3">Tampilan & Pengaturan</h3>

                                <div className="space-y-3">
                                    <Label className="text-slate-700">Pilih Ikon</Label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {iconOptions.map((opt) => (
                                            <div key={opt.value} className="relative">
                                                <input
                                                    type="radio"
                                                    id={`icon-${opt.value}`}
                                                    name="icon"
                                                    value={opt.value}
                                                    checked={data.icon === opt.value}
                                                    onChange={(e) => setData('icon', e.target.value)}
                                                    className="sr-only peer"
                                                />
                                                <label
                                                    htmlFor={`icon-${opt.value}`}
                                                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 transition-all text-slate-500"
                                                >
                                                    <opt.icon className="w-5 h-5 mb-1" />
                                                    <span className="text-[10px]">{opt.label}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-slate-700">Warna Tema</Label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {colorOptions.map((color) => (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() => setData('color', color.value)}
                                                className={cn(
                                                    "group relative flex items-center justify-center p-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-all",
                                                    data.color === color.value && `border-${color.value}-500 bg-slate-50`
                                                )}
                                            >
                                                <div className={cn("w-6 h-6 rounded-full", color.class)} />
                                                {data.color === color.value && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="size" className="text-slate-700">Ukuran Card</Label>
                                    <Select
                                        value={data.size}
                                        onValueChange={(val) => setData('size', val)}
                                    >
                                        <SelectTrigger className="border-slate-200">
                                            <SelectValue placeholder="Pilih ukuran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">Kecil (1 Kolom)</SelectItem>
                                            <SelectItem value="medium">Sedang (1.5 Kolom)</SelectItem>
                                            <SelectItem value="large">Besar (2 Kolom)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.size && <p className="text-sm text-red-500">{errors.size}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="order" className="text-slate-700">Urutan</Label>
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
                                                Tampilkan
                                            </Label>
                                            <Switch
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                            <Link
                                href={route('village-stats.index')}
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
                                Simpan Data
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
