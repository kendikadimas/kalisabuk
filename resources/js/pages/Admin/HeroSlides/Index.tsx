import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Image, ToggleLeft, ToggleRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

interface HeroSlide {
    id: number;
    image_path: string;
    title: string | null;
    subtitle: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    slides: HeroSlide[];
}

export default function Index({ slides }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slider', href: '/dashboard/hero-slides' },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('hero-slides.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Hero Slider" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Hero Slider
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola gambar slider yang tampil di halaman utama website.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('hero-slides.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Slide
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[100px]">Preview</TableHead>
                                    <TableHead>Judul & Subjudul</TableHead>
                                    <TableHead className="text-center">Urutan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {slides.length > 0 ? (
                                    slides.map((slide) => (
                                        <TableRow key={slide.id} className="hover:bg-slate-50/50">
                                            <TableCell>
                                                <div className="w-32 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                                                    <img
                                                        src={`/storage/${slide.image_path}`}
                                                        alt={slide.title || 'Slide Image'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900">{slide.title || '-'}</span>
                                                    <span className="text-xs text-slate-500 line-clamp-1">{slide.subtitle || '-'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-mono text-slate-500">
                                                {slide.order}
                                            </TableCell>
                                            <TableCell>
                                                {slide.is_active ? (
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
                                                        <Link href={route('hero-slides.edit', slide.id)}>
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
                                                                    <AlertDialogTitle>Hapus Slide?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah Anda yakin ingin menghapus slide ini? Tindakan ini tidak dapat dibatalkan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(slide.id)} className="bg-red-600 hover:bg-red-700">
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
                                            <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                                                <Image className="w-10 h-10 text-slate-300" />
                                                <p className="font-medium">Belum ada slide gambar</p>
                                                <Link href={route('hero-slides.create')} className="text-emerald-600 text-sm hover:underline">
                                                    Tambah yang pertama
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
