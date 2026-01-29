import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { route } from 'ziggy-js';

export default function FacilityEdit({ category }: { category: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Fasilitas Desa', href: '/dashboard/facilities' },
        { title: 'Edit Kategori', href: '#' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
        icon: category.icon || '',
        is_active: category.is_active || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('facilities.update', category.id));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kategori Fasilitas" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                <div className="flex items-center gap-4">
                    <Link href={route('facilities.index')}>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Kategori</h1>
                        <p className="text-slate-500 text-sm">Perbarui informasi kategori fasilitas</p>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <form onSubmit={handleSubmit}>
                        <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Kategori <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="name"
                                        placeholder="Contoh: Pendidikan"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Deskripsi singkat tentang kategori ini..."
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="min-h-[100px]"
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Status Aktif</Label>
                                        <p className="text-xs text-slate-500">Tampilkan kategori ini di halaman publik</p>
                                    </div>
                                    <Switch
                                        checked={data.is_active}
                                        onCheckedChange={checked => setData('is_active', checked)}
                                    />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <Link href={route('facilities.index')}>
                                        <Button type="button" variant="outline">Batal</Button>
                                    </Link>
                                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
