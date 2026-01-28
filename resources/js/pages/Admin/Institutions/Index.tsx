import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function InstitutionIndex({ institutions }: { institutions: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Lembaga', href: '/dashboard/institutions' },
    ];

    const { flash } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Lembaga Desa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Lembaga Desa</h2>
                        <p className="text-muted-foreground">
                            Kelola data lembaga kemasyarakatan desa.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/institutions/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Lembaga
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/50 dark:text-green-300">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {institutions.data.length > 0 ? (
                        institutions.data.map((institution: any) => (
                            <div key={institution.id} className="bg-white border boundary-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative overflow-hidden">
                                {/* Decorative patterned background for top part */}
                                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50"></div>

                                <div className="p-6 relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 overflow-hidden">
                                            {institution.logo ? (
                                                <img src={`/storage/${institution.logo}`} alt={institution.name} loading="lazy" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-6 h-6" />
                                            )}
                                        </div>
                                        {institution.abbreviation && (
                                            <Badge variant="outline" className="bg-white border-slate-200 text-slate-600">
                                                {institution.abbreviation}
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                                        {institution.name}
                                    </h3>

                                    <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Ketua: <span className="font-medium text-slate-700">{institution.leader_name}</span>
                                    </p>

                                    <div className="border-t border-slate-100 pt-4 flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" asChild className="hover:bg-blue-50 hover:text-blue-600">
                                            <Link href={`/dashboard/institutions/${institution.id}/edit`}>
                                                <Pencil className="h-4 w-4 mr-1.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" asChild className="hover:bg-red-50 hover:text-red-600">
                                            <Link
                                                href={`/dashboard/institutions/${institution.id}`}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => {
                                                    if (!confirm('Apakah Anda yakin ingin menghapus lembaga ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1.5" />
                                                Hapus
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">Belum ada data lembaga</h3>
                            <p className="text-slate-500 mb-6">Tambahkan lembaga desa untuk melengkapi struktur.</p>
                            <Button asChild>
                                <Link href="/dashboard/institutions/create">
                                    Tambah Lembaga
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Simple Pagination */}
                {institutions.links && institutions.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {institutions.links.map((link: any, key: number) => (
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
