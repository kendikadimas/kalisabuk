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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Preview Section - Left Column on Large Screens */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                                <Eye className="w-4 h-4 text-emerald-500" />
                                Preview Tampilan
                            </h3>
                            <div className="space-y-4">
                                {stats.filter(s => s.is_active).slice(0, 3).map((stat) => {
                                    const IconComponent = IconMap[stat.icon] || BarChart3;
                                    return (
                                        <div key={stat.id} className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-all group">
                                            <div className={cn("absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", colorClasses[stat.color].split(' ')[1])}>
                                                <IconComponent className="w-16 h-16" />
                                            </div>
                                            <div className="relative">
                                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3 border", colorClasses[stat.color])}>
                                                    <IconComponent className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
                                                <div className="flex items-baseline gap-1">
                                                    <h4 className="text-2xl font-bold text-slate-900">{stat.formatted_value}</h4>
                                                    {stat.unit && <span className="text-xs font-medium text-slate-400">{stat.unit}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {stats.filter(s => s.is_active).length === 0 && (
                                    <div className="text-center py-8 text-slate-400 text-sm">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
                                            <EyeOff className="w-5 h-5" />
                                        </div>
                                        Belum ada data aktif
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-slate-400 text-center pt-2">
                                *Menampilkan 3 data teratas
                            </div>
                        </div>
                    </div>

                    {/* Table Section - Right Column */}
                    <div className="lg:col-span-3">
                        <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow>
                                            <TableHead className="w-[300px]">Data Statistik</TableHead>
                                            <TableHead>Nilai</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Ukuran</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.length > 0 ? (
                                            stats.map((stat) => {
                                                const IconComponent = IconMap[stat.icon] || BarChart3;
                                                return (
                                                    <TableRow key={stat.id} className="hover:bg-slate-50/50">
                                                        <TableCell>
                                                            <div className="flex items-start gap-3">
                                                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border shrink-0", colorClasses[stat.color] || colorClasses.emerald)}>
                                                                    <IconComponent className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-slate-900">{stat.title}</div>
                                                                    {stat.description && (
                                                                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5" title={stat.description}>{stat.description}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="font-semibold text-slate-700">
                                                            {stat.formatted_value} {stat.unit && <span className="text-slate-400 font-normal text-xs ml-1">{stat.unit}</span>}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-normal">
                                                                {stat.category || 'Umum'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary" className={cn("font-normal capitalize",
                                                                stat.size === 'large' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                                    stat.size === 'medium' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                        'bg-emerald-50 text-emerald-700 border-emerald-100')}>
                                                                {stat.size}
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
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Link href={route('village-stats.edit', stat.id)}>
                                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                                                    <Edit className="w-4 h-4" />
                                                                                </Button>
                                                                            </Link>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>Edit Statistik</TooltipContent>
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
                                                                            <AlertDialogTitle>Hapus Statistik?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                Apakah Anda yakin ingin menghapus data statistik "{stat.title}"? Tindakan ini tidak dapat dibatalkan.
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
                                                );
                                            })
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-48 text-center text-slate-500">
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
                </div>
            </div>
        </AppSidebarLayout>
    );
}
