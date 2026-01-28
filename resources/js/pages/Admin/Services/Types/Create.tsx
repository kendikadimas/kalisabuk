import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, ArrowLeft, Save, FileText, Clock, CreditCard } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Card, CardContent } from '@/components/ui/card';

export default function CreateServiceType() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jenis Layanan', href: '/dashboard/services' },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        requirements: [''] as string[],
        processing_time: '',
        fee: ''
    });

    const addRequirement = () => {
        setData('requirements', [...data.requirements, '']);
    };

    const removeRequirement = (index: number) => {
        const newReqs = [...data.requirements];
        newReqs.splice(index, 1);
        setData('requirements', newReqs);
    };

    const updateRequirement = (index: number, value: string) => {
        const newReqs = [...data.requirements];
        newReqs[index] = value;
        setData('requirements', newReqs);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('services.store'));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Jenis Layanan" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('services.index')}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Jenis Layanan</h1>
                        <p className="text-slate-500 text-sm">Tambahkan jenis layanan surat baru beserta persyaratannya.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8">

                            <div className="space-y-6">
                                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-500" />
                                    Informasi Dasar
                                </h3>

                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-700">Nama Layanan <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                        placeholder="Misal: Surat Keterangan Usaha"
                                        className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-700">Deskripsi</Label>
                                    <textarea
                                        id="description"
                                        className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat tentang layanan ini..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="processing_time" className="text-slate-700">Estimasi Waktu</Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <Input
                                                id="processing_time"
                                                value={data.processing_time}
                                                onChange={e => setData('processing_time', e.target.value)}
                                                placeholder="Contoh: 3 Hari Kerja"
                                                className="pl-9 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fee" className="text-slate-700">Biaya Administrasi</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <Input
                                                id="fee"
                                                value={data.fee}
                                                onChange={e => setData('fee', e.target.value)}
                                                placeholder="Contoh: Gratis atau Rp 10.000"
                                                className="pl-9 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-emerald-500" />
                                    Persyaratan Dokumen
                                </h3>

                                <div className="space-y-3">
                                    {data.requirements.map((req, index) => (
                                        <div key={index} className="flex gap-2 items-center group">
                                            <span className="w-6 text-sm text-slate-400 font-medium text-center">{index + 1}.</span>
                                            <Input
                                                value={req}
                                                onChange={e => updateRequirement(index, e.target.value)}
                                                placeholder={`Syarat dokumen ${index + 1}`}
                                                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/50 focus:bg-white transition-all"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRequirement(index)}
                                                className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    {data.requirements.length === 0 && (
                                        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                            <p className="text-sm text-slate-500">Belum ada persyaratan dokumen.</p>
                                        </div>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    onClick={addRequirement}
                                    variant="outline"
                                    className="w-full border-dashed border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Syarat Dokumen
                                </Button>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                                <Link
                                    href={route('services.index')}
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
                                    Simpan Layanan
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Tips/Preview */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="bg-emerald-50 border-emerald-100 shadow-none">
                            <CardContent className="p-6 space-y-4">
                                <div className="p-3 bg-emerald-100 rounded-xl w-fit">
                                    <Save className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="font-semibold text-emerald-900">Tips Pengisian</h3>
                                <ul className="space-y-2 text-sm text-emerald-800 list-disc list-inside">
                                    <li>Pastikan nama layanan jelas dan mudah dimengerti.</li>
                                    <li>Jelaskan persyaratan dokumen secara detail untuk menghindari kesalahan pengajuan.</li>
                                    <li>Cantumkan estimasi waktu yang realistis.</li>
                                    <li>Jika ada biaya, transparansi sangat penting.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
