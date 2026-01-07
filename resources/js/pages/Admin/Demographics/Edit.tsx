import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DemographicEdit({ demographic }: { demographic: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Demografi', href: '/dashboard/demographics' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        label: demographic.label,
        value: demographic.value,
        type: demographic.type,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/dashboard/demographics/${demographic.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Data Demografi" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Edit Data Demografi</h2>
                        <p className="text-muted-foreground">Perbarui data statistik kependudukan.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="type">Kategori Data</Label>
                            <div className="relative">
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="job">Pekerjaan</option>
                                    <option value="education">Pendidikan</option>
                                    <option value="gender">Jenis Kelamin</option>
                                    <option value="religion">Agama</option>
                                </select>
                            </div>
                            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="label">Label / Keterangan</Label>
                            <Input
                                id="label"
                                type="text"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                placeholder="Contoh: Petani, SD, Laki-laki"
                                required
                            />
                            {errors.label && <p className="text-sm text-red-500">{errors.label}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="value">Jumlah (Orang)</Label>
                            <Input
                                id="value"
                                type="number"
                                min="0"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                required
                            />
                            {errors.value && <p className="text-sm text-red-500">{errors.value}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/demographics">Batal</Link>
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
