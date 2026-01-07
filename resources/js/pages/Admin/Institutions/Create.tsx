import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InstitutionCreate() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Lembaga', href: '/dashboard/institutions' },
        { title: 'Tambah', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        abbreviation: '',
        leader_name: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/dashboard/institutions');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Lembaga" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Tambah Lembaga</h2>
                        <p className="text-muted-foreground">Tambahkan data lembaga kemasyarakatan desa baru.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="name">Nama Lembaga</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="abbreviation">Singkatan (Opsional)</Label>
                            <Input
                                id="abbreviation"
                                type="text"
                                value={data.abbreviation}
                                onChange={(e) => setData('abbreviation', e.target.value)}
                                placeholder="Contoh: LPM, PKK"
                            />
                            {errors.abbreviation && <p className="text-sm text-red-500">{errors.abbreviation}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="leader_name">Nama Ketua / Pimpinan</Label>
                            <Input
                                id="leader_name"
                                type="text"
                                value={data.leader_name}
                                onChange={(e) => setData('leader_name', e.target.value)}
                                required
                            />
                            {errors.leader_name && <p className="text-sm text-red-500">{errors.leader_name}</p>}
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">Deskripsi</Label>
                            <textarea
                                id="description"
                                rows={6}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/institutions">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan Lembaga
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
