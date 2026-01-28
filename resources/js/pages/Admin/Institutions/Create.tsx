import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Building2, User, FileText, Image as ImageIcon } from 'lucide-react';

export default function InstitutionCreate() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Lembaga', href: '/dashboard/institutions' },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        abbreviation: '',
        leader_name: '',
        description: '',
        logo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/dashboard/institutions');
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Lembaga" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/institutions"
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Lembaga</h1>
                        <p className="text-slate-500 text-sm">Tambahkan data lembaga kemasyarakatan desa baru.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-700">Nama Lembaga</Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Contoh: Pemberdayaan Kesejahteraan Keluarga"
                                            required
                                        />
                                        <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="abbreviation" className="text-slate-700">Singkatan (Opsional)</Label>
                                    <div className="relative">
                                        <Input
                                            id="abbreviation"
                                            type="text"
                                            value={data.abbreviation}
                                            onChange={(e) => setData('abbreviation', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Contoh: PKK, LPM, Karang Taruna"
                                        />
                                        <FileText className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.abbreviation && <p className="text-sm text-red-500">{errors.abbreviation}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="leader_name" className="text-slate-700">Nama Ketua / Pimpinan</Label>
                                    <div className="relative">
                                        <Input
                                            id="leader_name"
                                            type="text"
                                            value={data.leader_name}
                                            onChange={(e) => setData('leader_name', e.target.value)}
                                            className="h-12 pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            placeholder="Nama lengkap ketua..."
                                            required
                                        />
                                        <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    </div>
                                    {errors.leader_name && <p className="text-sm text-red-500">{errors.leader_name}</p>}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="logo" className="text-slate-700">Logo Lembaga</Label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer group relative">
                                        <Input
                                            id="logo"
                                            type="file"
                                            onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-slate-100 rounded-full group-hover:bg-emerald-100 transition-colors">
                                                <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500" />
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium">Upload Logo</p>
                                            <p className="text-xs text-slate-400">JPG, PNG maks 2MB</p>
                                        </div>
                                    </div>
                                    {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-700">Deskripsi Singkat</Label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="Jelaskan peran dan fungsi lembaga ini..."
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                            <Link
                                href="/dashboard/institutions"
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
                                Simpan Lembaga
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
