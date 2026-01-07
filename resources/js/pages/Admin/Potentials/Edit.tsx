import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PotentialEdit({ potential }: { potential: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Potensi Desa', href: '/dashboard/potentials' },
        { title: 'Edit', href: '#' },
    ];

    const { data, setData, post: submitPost, processing, errors } = useForm({
        _method: 'PUT',
        name: potential.name,
        category: potential.category,
        description: potential.description,
        location: potential.location,
        contact_info: potential.contact_info || '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        submitPost(`/dashboard/potentials/${potential.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Potensi Desa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-3xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">Edit Potensi</h2>
                        <p className="text-muted-foreground">Perbarui data potensi wisata atau produk unggulan.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="name">Nama Potensi</Label>
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
                            <Label htmlFor="category">Kategori</Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="tourism">Wisata</option>
                                    <option value="product">Produk Unggulan</option>
                                </select>
                            </div>
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="location">Lokasi / Alamat</Label>
                            <Input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                required
                            />
                            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="contact_info">Info Kontak (HP/WA)</Label>
                            <Input
                                id="contact_info"
                                type="text"
                                value={data.contact_info}
                                onChange={(e) => setData('contact_info', e.target.value)}
                            />
                            {errors.contact_info && <p className="text-sm text-red-500">{errors.contact_info}</p>}
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="image">Gambar Utama (Biarkan kosong jika tidak berubah)</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="cursor-pointer"
                            />
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                            {potential.image_path && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                    Gambar saat ini: <a href={`/storage/${potential.image_path}`} target="_blank" className="text-primary hover:underline">Lihat</a>
                                </div>
                            )}
                        </div>

                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="description">Deskripsi</Label>
                            <textarea
                                id="description"
                                rows={6}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/potentials">Batal</Link>
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
