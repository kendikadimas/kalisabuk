import { Head, Link, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Users, Plus, Edit, Trash2, UserCheck, ShieldCheck, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { route } from 'ziggy-js';

interface VillageOfficial {
    id: number;
    name: string;
    position: string;
    nip: string | null;
    photo: string | null;
    phone: string | null;
    address: string | null;
    education: string | null;
    periode_start: string | null;
    periode_end: string | null;
    order: number;
    is_active: boolean;
    is_head: boolean;
    welcome_message: string | null;
    initials: string;
    periode: string;
}

interface Props {
    officials: VillageOfficial[];
}

export default function Index({ officials }: Props) {
    const handleDelete = (id: number) => {
        router.delete(route('village-officials.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Perangkat Desa', href: '#' },
        ]}>
            <Head title="Perangkat Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Perangkat Desa
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola data struktur organisasi dan aparatur desa.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('village-officials.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Perangkat
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Aparatur</p>
                                <h3 className="text-2xl font-bold text-slate-900">{officials.length}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <UserCheck className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Status Aktif</p>
                                <h3 className="text-2xl font-bold text-slate-900">{officials.filter(o => o.is_active).length}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pimpinan</p>
                                <h3 className="text-2xl font-bold text-slate-900">{officials.filter(o => o.is_head).length}</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[80px]">Foto</TableHead>
                                    <TableHead>Nama & Jabatan</TableHead>
                                    <TableHead className="hidden md:table-cell">NIP</TableHead>
                                    <TableHead className="hidden sm:table-cell">Periode</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {officials.length > 0 ? (
                                    officials.map((official) => (
                                        <TableRow key={official.id} className="hover:bg-slate-50/50">
                                            <TableCell>
                                                <Avatar className="h-10 w-10 border border-slate-200">
                                                    <AvatarImage src={`/storage/${official.photo}`} alt={official.name} className="object-cover" />
                                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                                                        {official.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                                                        {official.name}
                                                        {official.is_head && (
                                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-emerald-200 bg-emerald-50 text-emerald-700 h-5">
                                                                Kades
                                                            </Badge>
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-slate-500">{official.position}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell text-slate-500 font-mono text-xs">
                                                {official.nip || '-'}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-slate-500 text-sm">
                                                {official.periode}
                                            </TableCell>
                                            <TableCell>
                                                {official.is_active ? (
                                                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Aktif</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-slate-500">Non-Aktif</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link href={route('village-officials.edit', official.id)}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus data perangkat desa <strong>{official.name}</strong>?
                                                                    Tindakan ini tidak dapat dibatalkan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(official.id)} className="bg-red-600 hover:bg-red-700">
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
                                        <TableCell colSpan={6} className="h-48 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <Users className="w-10 h-10 mb-2 text-slate-300" />
                                                <p className="font-medium">Belum ada data perangkat desa</p>
                                                <Link href={route('village-officials.create')} className="text-emerald-600 text-sm hover:underline mt-1">
                                                    Tambah data baru
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
