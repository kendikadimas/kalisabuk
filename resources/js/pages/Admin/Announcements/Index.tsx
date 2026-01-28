import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, MapPin, Bell, Plus, Edit, Trash2, AlertCircle, Info, MoreHorizontal, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Announcement {
    id: number;
    title: string;
    description: string;
    event_date: string | null;
    location: string | null;
    type: 'event' | 'info' | 'warning';
    is_active: boolean;
    created_at: string;
}

interface Props {
    announcements: {
        data: Announcement[];
        links: any[];
        current_page: number;
        last_page: number;
    };
}

export default function Index({ announcements }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengumuman', href: '/dashboard/announcements' },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('admin.announcements.destroy', id));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'event':
                return <Calendar className="w-4 h-4 text-blue-600" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-amber-600" />;
            default:
                return <Info className="w-4 h-4 text-emerald-600" />;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'event':
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Event</Badge>;
            case 'warning':
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Penting</Badge>;
            default:
                return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Info</Badge>;
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Pengumuman" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Kelola Pengumuman
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola pengumuman, agenda kegiatan, dan informasi penting desa.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.announcements.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Buat Pengumuman
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[300px]">Judul & Tipe</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Tanggal & Lokasi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {announcements.data.length > 0 ? (
                                    announcements.data.map((announcement) => (
                                        <TableRow key={announcement.id} className="hover:bg-slate-50/50">
                                            <TableCell>
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 p-2 rounded-lg bg-slate-50 border border-slate-100">
                                                        {getTypeIcon(announcement.type)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 mb-1 line-clamp-1">
                                                            {announcement.title}
                                                        </p>
                                                        {getTypeBadge(announcement.type)}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm text-slate-600 line-clamp-2 max-w-sm">
                                                    {announcement.description}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1.5">
                                                    {announcement.event_date && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 w-fit px-2 py-1 rounded border border-slate-100">
                                                            <Calendar className="w-3 h-3 text-slate-400" />
                                                            {new Date(announcement.event_date).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    )}
                                                    {announcement.location && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                                            <MapPin className="w-3 h-3 text-slate-400" />
                                                            <span className="truncate max-w-[150px]">{announcement.location}</span>
                                                        </div>
                                                    )}
                                                    {!announcement.event_date && !announcement.location && (
                                                        <span className="text-slate-400 text-xs italic">-</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {announcement.is_active ? (
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">Aktif</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-slate-500 bg-slate-50">Nonaktif</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                        <Link href={route('admin.announcements.edit', announcement.id)}>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Hapus
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Hapus Pengumuman?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(announcement.id)} className="bg-red-600 hover:bg-red-700">
                                                                        Hapus
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-48 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
                                                    <Megaphone className="w-6 h-6 text-slate-300" />
                                                </div>
                                                <p className="text-slate-500 font-medium">Belum ada pengumuman</p>
                                                <p className="text-slate-400 text-sm">Klik tombol "Buat Pengumuman" untuk memulai.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {announcements.data.length > 0 && (
                        <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Halaman {announcements.current_page} dari {announcements.last_page}
                                </p>
                                <div className="flex gap-1">
                                    {announcements.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${link.active
                                                    ? 'bg-emerald-600 text-white shadow-sm'
                                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}
