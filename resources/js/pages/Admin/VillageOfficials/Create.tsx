import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Users, User, Phone, MapPin, Briefcase, GraduationCap, Calendar, Image as ImageIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BreadcrumbItem } from '@/types';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Perangkat Desa', href: '/dashboard/village-officials' },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        position: '',
        nip: '',
        photo: null as File | null,
        phone: '',
        address: '',
        education: '',
        periode_start: '',
        periode_end: '',
        order: 0,
        is_active: true,
        is_head: false,
        welcome_message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/dashboard/village-officials');
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Perangkat Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/village-officials"
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Perangkat Desa</h1>
                        <p className="text-slate-500 text-sm">Tambahkan anggota perangkat desa atau staf baru.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-5xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Photo & Basic Status */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="photo" className="text-slate-700 font-medium">Foto Profil</Label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer group relative aspect-[3/4] flex flex-col items-center justify-center bg-slate-50/50 overflow-hidden">
                                        <Input
                                            id="photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('photo', e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        {data.photo ? (
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src={URL.createObjectURL(data.photo)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <p className="text-white font-medium">Ganti Foto</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-white shadow-sm border border-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                    <ImageIcon className="w-8 h-8 text-emerald-500" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-slate-700">Upload Foto</p>
                                                    <p className="text-xs text-slate-500">JPG/PNG, Maks 2MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.photo && <p className="text-sm text-red-500 text-center">{errors.photo}</p>}
                                </div>

                                <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
                                    <h3 className="font-semibold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                                        <Users className="w-4 h-4 text-emerald-500" /> Status Kepegawaian
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="is_active" className="text-sm text-slate-700 font-medium cursor-pointer">
                                                Status Aktif
                                            </Label>
                                            <Switch
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="is_head" className="text-sm text-slate-700 font-medium cursor-pointer">
                                                Kepala Desa
                                            </Label>
                                            <Switch
                                                id="is_head"
                                                checked={data.is_head}
                                                onCheckedChange={(checked) => setData('is_head', checked)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <Label htmlFor="order" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Urutan Tampilan</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value))}
                                            className="h-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50"
                                        />
                                        <p className="text-[10px] text-slate-500 text-right">0 = Paling Atas</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Personal Data */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="name" className="text-slate-700">Nama Lengkap</Label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="Nama lengkap beserta gelar..."
                                                required
                                            />
                                            <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position" className="text-slate-700">Jabatan</Label>
                                        <div className="relative">
                                            <Input
                                                id="position"
                                                value={data.position}
                                                onChange={(e) => setData('position', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="Contoh: Sekretaris Desa"
                                                required
                                            />
                                            <Briefcase className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nip" className="text-slate-700">NIP (Opsional)</Label>
                                        <div className="relative">
                                            <Input
                                                id="nip"
                                                value={data.nip}
                                                onChange={(e) => setData('nip', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="Nomor Induk Pegawai"
                                            />
                                            <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.nip && <p className="text-sm text-red-500">{errors.nip}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-slate-700">No. Telepon / WA</Label>
                                        <div className="relative">
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="08xx-xxxx-xxxx"
                                            />
                                            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="education" className="text-slate-700">Pendidikan Terakhir</Label>
                                        <div className="relative">
                                            <Input
                                                id="education"
                                                value={data.education}
                                                onChange={(e) => setData('education', e.target.value)}
                                                className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                placeholder="Contoh: S1 Hukum"
                                            />
                                            <GraduationCap className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.education && <p className="text-sm text-red-500">{errors.education}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-slate-700">Alamat Lengkap</Label>
                                    <div className="relative">
                                        <textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows={2}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
                                            placeholder="Alamat domisili..."
                                        />
                                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                                    <div className="space-y-2">
                                        <Label htmlFor="periode_start" className="text-slate-700">Mulai Menjabat</Label>
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                id="periode_start"
                                                value={data.periode_start}
                                                onChange={(e) => setData('periode_start', e.target.value)}
                                                className="h-11 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white"
                                            />
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.periode_start && <p className="text-sm text-red-500">{errors.periode_start}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="periode_end" className="text-slate-700">Akhir Jabatan</Label>
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                id="periode_end"
                                                value={data.periode_end}
                                                onChange={(e) => setData('periode_end', e.target.value)}
                                                className="h-11 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white"
                                            />
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                        </div>
                                        {errors.periode_end && <p className="text-sm text-red-500">{errors.periode_end}</p>}
                                    </div>
                                </div>

                                {data.is_head && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                                        <Label htmlFor="welcome_message" className="text-slate-700">Pesan Sambutan Kepala Desa</Label>
                                        <textarea
                                            id="welcome_message"
                                            value={data.welcome_message}
                                            onChange={(e) => setData('welcome_message', e.target.value)}
                                            rows={4}
                                            placeholder="Tulis pesan sambutan untuk ditampilkan di halaman utama..."
                                            className="w-full rounded-xl border border-emerald-200 bg-emerald-50/20 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-emerald-500/50 text-emerald-900"
                                        />
                                        {errors.welcome_message && <p className="text-sm text-red-500">{errors.welcome_message}</p>}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href="/dashboard/village-officials"
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
            </div >
        </AppSidebarLayout >
    );
}
