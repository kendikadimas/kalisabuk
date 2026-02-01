import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BarChart3, Plus, Edit, Trash2, Eye, EyeOff, Activity, Wallet, Users, Home } from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VillageStat {
    id: number;
    title: string;
    value: string;
    unit: string | null;
    icon: string;
    color: string;
    size: string;
    description: string | null;
    category: string | null;
    order: number;
    is_active: boolean;
    formatted_value: string;
}

interface Props {
    stats: VillageStat[];
}

const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    pink: 'bg-pink-100 text-pink-600 border-pink-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
};

// Map string icon names to Lucide icons
const IconMap: Record<string, any> = {
    'activity': Activity,
    'chart': BarChart3,
    'wallet': Wallet,
    'users': Users,
    'home': Home,
};

export default function Index({ stats }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik Desa', href: '/dashboard/village-stats' },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('village-stats.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Statistik Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Data Statistik Desa
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola data statistik desa yang ditampilkan di halaman publik.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('village-stats.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Statistik
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[400px]">Data Statistik</TableHead>
                                    <TableHead>Nilai</TableHead>
                                    <TableHead>Satuan</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.length > 0 ? (
                                    stats.map((stat) => (
                                        <TableRow key={stat.id} className="hover:bg-slate-50/50">
                                            <TableCell>
                                                <div className="font-semibold text-slate-900">{stat.title}</div>
                                            </TableCell>
                                            <TableCell className="font-bold text-slate-700 text-lg">
                                                {stat.formatted_value}
                                            </TableCell>
                                            <TableCell>
                                                {stat.unit ? <Badge variant="secondary" className="font-normal">{stat.unit}</Badge> : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-normal">
                                                    {stat.category || 'Umum'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {stat.is_active ? (
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 shadow-none font-medium">
                                                        <Eye className="w-3 h-3 mr-1" /> Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-slate-200 font-medium">
                                                        <EyeOff className="w-3 h-3 mr-1" /> Nonaktif
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={route('village-stats.edit', stat.id)}>
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
                                                                <AlertDialogTitle>Hapus Statistik?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus data "{stat.title}"?
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(stat.id)} className="bg-red-600 hover:bg-red-700">
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
                                        <TableCell colSpan={5} className="h-48 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                                                    <BarChart3 className="w-6 h-6 text-slate-300" />
                                                </div>
                                                <p className="font-medium">Belum ada data statistik</p>
                                                <p className="text-xs text-slate-400">Mulailah dengan menambahkan data baru.</p>
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
