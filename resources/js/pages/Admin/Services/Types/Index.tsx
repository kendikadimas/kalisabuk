import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, FileText, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';

export default function ServiceTypeIndex({ serviceTypes }: { serviceTypes: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jenis Layanan', href: '/dashboard/services' },
    ];
    const { flash } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        router.delete(route('services.destroy', id), {
            preserveScroll: true,
        });
    };

    const filteredTypes = serviceTypes.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Jenis Layanan" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Jenis Layanan
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola daftar layanan yang tersedia untuk diajukan oleh masyarakat.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('services.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Jenis Layanan
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <Card className="border-slate-200 shadow-sm rounded-xl">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Cari jenis layanan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[80px] text-center">#</TableHead>
                                    <TableHead className="w-[300px]">Nama Layanan</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTypes.length > 0 ? (
                                    filteredTypes.map((item, index) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="text-center text-slate-500 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="text-slate-900 font-semibold">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    {item.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-600">
                                                {item.description ? (
                                                    <span className="line-clamp-2 text-sm">{item.description}</span>
                                                ) : (
                                                    <span className="text-slate-400 text-sm italic">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Link href={route('services.edit', item.id)}>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                                        <Pencil className="w-4 h-4" />
                                                                    </Button>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>Edit Layanan</TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Hapus Jenis Layanan?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus layanan "{item.name}"?
                                                                    <br /> <span className="text-red-500 font-medium mt-1 block">Perhatian: Semua pengajuan terkait layanan ini mungkin akan terdampak.</span>
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700">
                                                                    Hapus
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-48 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
                                                    <FileText className="w-6 h-6 text-slate-300" />
                                                </div>
                                                <p className="font-medium">Tidak ada data jenis layanan</p>
                                                <p className="text-xs text-slate-400">Silakan tambahkan jenis layanan baru.</p>
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
