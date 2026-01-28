import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Calendar, CreditCard, Phone, FileText, CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { route } from 'ziggy-js';

export default function EditServiceRequest({ serviceRequest }: { serviceRequest: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permohonan', href: '/dashboard/service-requests' },
        { title: 'Detail', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm<{ status: string }>({
        status: serviceRequest.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('service-requests.update', serviceRequest.id));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 gap-1 px-3 py-1"><CheckCircle2 className="w-4 h-4" /> Selesai</Badge>;
            case 'processed':
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 gap-1 px-3 py-1"><Loader2 className="w-4 h-4 animate-spin" /> Diproses</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 gap-1 px-3 py-1"><XCircle className="w-4 h-4" /> Ditolak</Badge>;
            default:
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 gap-1 px-3 py-1"><Clock className="w-4 h-4" /> Pending</Badge>;
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Permohonan" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('service-requests.index')}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Detail Permohonan</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-500 text-sm">Tiket:</span>
                            <span className="font-mono font-medium text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">#{serviceRequest.ticket_code}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Details Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-emerald-500" />
                                        {serviceRequest.service_type?.name}
                                    </h2>
                                    <p className="text-slate-500 text-sm">Jenis Layanan</p>
                                </div>
                                <div>
                                    {getStatusBadge(serviceRequest.status)}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Data Pemohon</Label>
                                    <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{serviceRequest.citizen_name}</p>
                                                <p className="text-xs text-slate-500 font-mono">{serviceRequest.citizen_nik}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            {serviceRequest.citizen_phone || '-'}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Informasi Pengajuan</Label>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                Tanggal Diajukan
                                            </div>
                                            <span className="font-medium text-slate-900 text-sm">
                                                {new Date(serviceRequest.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <CreditCard className="w-4 h-4 text-slate-400" />
                                                Biaya
                                            </div>
                                            <span className="font-medium text-slate-900 text-sm">
                                                {serviceRequest.service_type?.fee || 'Gratis'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Keterangan / Keperluan</Label>
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                                    {serviceRequest.details}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Card */}
                    <div className="space-y-6">
                        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                            <div className="bg-slate-50 p-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    Update Status
                                </h3>
                            </div>
                            <CardContent className="p-6">
                                <form onSubmit={submit} className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-slate-700">Status Permohonan</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(val) => setData('status', val)}
                                        >
                                            <SelectTrigger className="w-full border-slate-200 focus:ring-emerald-500/20">
                                                <SelectValue placeholder="Pilih status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                                        Pending
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="processed">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                        Diproses
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="completed">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        Selesai
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="rejected">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                                        Ditolak
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-slate-500">
                                            Update status untuk memberitahu warga mengenai progres pengajuan.
                                        </p>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-900/20 rounded-xl"
                                    >
                                        Update Status
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
