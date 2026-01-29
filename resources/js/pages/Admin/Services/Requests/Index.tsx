import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Eye, Search, FileText, CheckCircle2, XCircle, Clock, Loader2, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';

export default function ServiceRequestIndex({ requests, filters }: { requests: any, filters: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permohonan Layanan', href: '/dashboard/service-requests' },
    ];
    const { flash } = usePage().props as any;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('service-requests.index'), { search }, { preserveState: true });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 gap-1"><CheckCircle2 className="w-3 h-3" /> Selesai</Badge>;
            case 'processed':
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Diproses</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 gap-1"><XCircle className="w-3 h-3" /> Ditolak</Badge>;
            default:
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 gap-1"><Clock className="w-3 h-3" /> Pending</Badge>;
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Permohonan Layanan" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Permohonan Warga
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Daftar permohonan layanan yang diajukan oleh warga.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="border-slate-200 shadow-sm rounded-xl">
                    <CardContent className="p-4">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    className="pl-9 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                                    placeholder="Cari Tiket / NIK / Nama Pemohon..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="outline" className="border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">
                                Cari Data
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[150px]">Kode Tiket</TableHead>
                                    <TableHead>Pemohon</TableHead>
                                    <TableHead>Jenis Layanan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.data.length > 0 ? (
                                    requests.data.map((item: any) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="font-mono font-bold text-emerald-600">
                                                #{item.ticket_code}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900">{item.citizen_name}</span>
                                                    <span className="text-xs text-slate-500 font-mono">NIK: {item.citizen_nik}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-slate-700">
                                                    <FileText className="w-4 h-4 text-emerald-500" />
                                                    {item.service_type?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(item.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={route('service-requests.edit', item.id)}>
                                                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 gap-2">
                                                        <Eye className="w-4 h-4" />
                                                        Review
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-48 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
                                                    <FileText className="w-6 h-6 text-slate-300" />
                                                </div>
                                                <p className="font-medium">Belum ada permohonan layanan</p>
                                                <p className="text-xs text-slate-400">Permohonan yang diajukan akan muncul di sini.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
