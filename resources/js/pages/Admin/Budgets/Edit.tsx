import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BudgetEdit({ budget }: { budget: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'APBDes', href: '/dashboard/budgets' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        year: budget.year,
        name: budget.name,
        type: budget.type,
        amount: budget.amount,
        realized_amount: budget.realized_amount || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/dashboard/budgets/${budget.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Data APBDes" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Edit Data APBDes</h2>
                        <p className="text-muted-foreground">Perbarui data anggaran pendapatan atau belanja desa.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="year">Tahun Anggaran</Label>
                            <Input
                                id="year"
                                type="number"
                                min="2000"
                                max="2100"
                                value={data.year}
                                onChange={(e) => setData('year', parseInt(e.target.value))}
                                required
                            />
                            {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="type">Jenis Anggaran</Label>
                            <div className="relative">
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="income">Pendapatan</option>
                                    <option value="expense">Belanja</option>
                                </select>
                            </div>
                            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="name">Uraian / Nama Akun</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Dana Desa, Belanja Pegawai"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="amount">Jumlah Anggaran (Rp)</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                required
                            />
                            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="realized_amount">Realisasi (Rp) - Opsional</Label>
                            <Input
                                id="realized_amount"
                                type="number"
                                min="0"
                                value={data.realized_amount}
                                onChange={(e) => setData('realized_amount', e.target.value)}
                            />
                            {errors.realized_amount && <p className="text-sm text-red-500">{errors.realized_amount}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/budgets">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
