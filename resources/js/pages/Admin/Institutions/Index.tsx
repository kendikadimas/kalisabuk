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

                <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Nama Lembaga</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Singkatan</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Ketua / Pimpinan</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {institutions.data.length > 0 ? (
                                    institutions.data.map((institution: any) => (
                                        <tr key={institution.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                                                {institution.name}
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                {institution.abbreviation ? (
                                                    <Badge variant="outline">
                                                        {institution.abbreviation}
                                                    </Badge>
                                                ) : '-'}
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                <div className="flex items-center text-muted-foreground">
                                                    <User className="mr-2 h-4 w-4" />
                                                    {institution.leader_name}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/dashboard/institutions/${institution.id}/edit`}>
                                                            <Pencil className="h-4 w-4 text-blue-600" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild>
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
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                            Belum ada data lembaga desa.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
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
