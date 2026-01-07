import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BudgetIndex({ budgets }: { budgets: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'APBDes', href: '/dashboard/budgets' },
    ];

    const { flash } = usePage().props as any;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola APBDes" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Anggaran Desa (APBDes)</h2>
                        <p className="text-muted-foreground">
                            Kelola data pendapatan dan belanja desa per tahun anggaran.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/budgets/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Data
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
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Tahun</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Uraian</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Jenis</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Anggaran</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Realisasi</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {budgets.data.length > 0 ? (
                                    budgets.data.map((item: any) => (
                                        <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                                                {item.year}
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                                                {item.name}
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                <Badge variant={item.type === 'income' ? 'default' : 'secondary'} className={item.type === 'income' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}>
                                                    {item.type === 'income' ? (
                                                        <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Pendapatan</span>
                                                    ) : (
                                                        <span className="flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Belanja</span>
                                                    )}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right font-mono">
                                                {formatCurrency(item.amount)}
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right font-mono">
                                                {item.realized_amount ? formatCurrency(item.realized_amount) : '-'}
                                            </td>
                                            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/dashboard/budgets/${item.id}/edit`}>
                                                            <Pencil className="h-4 w-4 text-blue-600" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link
                                                            href={`/dashboard/budgets/${item.id}`}
                                                            method="delete"
                                                            as="button"
                                                            onClick={(e) => {
                                                                if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) {
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
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                            Belum ada data anggaran.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Simple Pagination */}
                {budgets.links && budgets.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {budgets.links.map((link: any, key: number) => (
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
