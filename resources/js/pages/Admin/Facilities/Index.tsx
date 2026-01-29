import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Eye, Pencil, Trash2, Building2, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';

export default function FacilityIndex({ categories }: { categories: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Fasilitas Desa', href: '/dashboard/facilities' },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('facilities.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Fasilitas Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Fasilitas Desa
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Kelola kategori fasilitas dan item fasilitas yang ada di desa.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('facilities.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Kategori
                            </Button>
                        </Link>
                    </div>
                </div>

                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Card key={category.id} className="hover:shadow-lg transition-shadow border-slate-200 overflow-hidden flex flex-col">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Link href={route('facilities.edit', category.id)}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Kategori "{category.name}" dan semua item di dalamnya akan dkhapus.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-red-600 hover:bg-red-700">
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg text-slate-900">{category.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-1">
                                        {category.description || 'Tidak ada deskripsi'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6 flex-1">
                                    <div className="flex items-center justify-between text-sm text-slate-500">
                                        <span>Total Item</span>
                                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                                            {category.items_count || 0} Item
                                        </Badge>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50/30 border-t border-slate-100 p-4">
                                    <Link href={route('facilities.show', category.id)} className="w-full">
                                        <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800">
                                            <Eye className="w-4 h-4 mr-2" />
                                            Kelola Item
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Grid className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">Belum ada kategori</h3>
                        <p className="text-slate-500 mb-6">Buat kategori fasilitas baru untuk mulai menambahkan data.</p>
                        <Link href={route('facilities.create')}>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Kategori
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
