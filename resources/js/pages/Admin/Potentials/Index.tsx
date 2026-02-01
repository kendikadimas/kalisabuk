import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
                    <div className="flex items-center gap-2">
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                            <Link href="/dashboard/potentials/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Potensi
                            </Link>
                        </Button>
                    </div>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/50 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {potentials.data.length > 0 ? (
                        potentials.data.map((potential: any) => (
                            <div key={potential.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden">
                                {potential.image_path ? (
                                    <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                                        <img src={`/storage/${potential.image_path}`} alt={potential.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                                    </div>
                                ) : (
                                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 w-full"></div>
                                )}

                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                                        {potential.name}
                                    </h3>

                                    <div className="space-y-2 text-sm text-slate-600 mt-2">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                            <span className="line-clamp-2">{potential.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                            <span>{potential.contact_info || '-'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 flex gap-2 justify-end border-t border-slate-100">
                                        <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 rounded-full border-slate-200 hover:border-blue-300 hover:bg-blue-50">
                                            <Link href={`/dashboard/potentials/${potential.id}/edit`} title="Edit">
                                                <Pencil className="h-4 w-4 text-blue-600" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 rounded-full border-slate-200 hover:border-red-300 hover:bg-red-50">
                                            <Link
                                                href={`/dashboard/potentials/${potential.id}`}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => {
                                                    if (!confirm('Apakah Anda yakin ingin menghapus potensi ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                title="Hapus"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Belum ada data</h3>
                            <p className="text-slate-500 mb-6">Mulai dengan menambahkan potensi desa baru.</p>
                            <Button asChild>
                                <Link href="/dashboard/potentials/create">
                                    Tambah Potensi
                                </Link>
                            </Button>
                        </div>
                    )}
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
