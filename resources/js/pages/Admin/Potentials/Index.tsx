import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PotentialIndex({ potentials }: { potentials: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Potensi Desa', href: '/dashboard/potentials' },
    ];

    const { flash } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Potensi Desa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Potensi Desa</h2>
                        <p className="text-muted-foreground">
                            Kelola data potensi wisata dan produk unggulan desa.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/potentials/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Potensi
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/50 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-base border-collapse">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-bold text-gray-900 dark:text-gray-100 border [&:has([role=checkbox])]:pr-0">Nama Potensi</th>
                                    <th className="h-12 px-4 text-left align-middle font-bold text-gray-900 dark:text-gray-100 border [&:has([role=checkbox])]:pr-0">Kategori</th>
                                    <th className="h-12 px-4 text-left align-middle font-bold text-gray-900 dark:text-gray-100 border [&:has([role=checkbox])]:pr-0">Lokasi</th>
                                    <th className="h-12 px-4 text-left align-middle font-bold text-gray-900 dark:text-gray-100 border [&:has([role=checkbox])]:pr-0">Kontak</th>
                                    <th className="h-12 px-4 text-right align-middle font-bold text-gray-900 dark:text-gray-100 border [&:has([role=checkbox])]:pr-0">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {potentials.data.length > 0 ? (
                                    potentials.data.map((potential: any) => (
                                        <tr key={potential.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle border [&:has([role=checkbox])]:pr-0 font-semibold text-gray-900 dark:text-gray-100">
                                                {potential.name}
                                            </td>
                                            <td className="p-4 align-middle border [&:has([role=checkbox])]:pr-0">
                                                <Badge variant={potential.category === 'tourism' ? 'default' : 'secondary'} className={potential.category === 'tourism' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-sm' : 'bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm'}>
                                                    {potential.category === 'tourism' ? 'Wisata' : 'Produk Unggulan'}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle border [&:has([role=checkbox])]:pr-0 text-gray-900 dark:text-gray-100">
                                                <div className="flex items-center">
                                                    <MapPin className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                    {potential.location}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle border [&:has([role=checkbox])]:pr-0 text-gray-900 dark:text-gray-100">
                                                <div className="flex items-center">
                                                    <Phone className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                    {potential.contact_info || '-'}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle border [&:has([role=checkbox])]:pr-0 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" asChild className="border-blue-200 hover:bg-blue-50">
                                                        <Link href={`/dashboard/potentials/${potential.id}/edit`}>
                                                            <Pencil className="h-5 w-5 text-blue-700" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="icon" asChild className="border-red-200 hover:bg-red-50">
                                                        <Link
                                                            href={`/dashboard/potentials/${potential.id}`}
                                                            method="delete"
                                                            as="button"
                                                            onClick={(e) => {
                                                                if (!confirm('Apakah Anda yakin ingin menghapus potensi ini?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="h-5 w-5 text-red-700" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-500 font-medium">
                                            Belum ada data potensi desa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Simple Pagination */}
                {potentials.links && potentials.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {potentials.links.map((link: any, key: number) => (
                            <Link
                                key={key}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-sm rounded-md border ${link.active ? 'bg-primary text-primary-foreground' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                disabled={!link.url}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
