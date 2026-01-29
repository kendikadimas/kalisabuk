import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Plus, Pencil, Trash2, MapPin, Search, Save, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useState, useRef } from 'react';
import { route } from 'ziggy-js';

export default function FacilityShow({ category }: { category: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Fasilitas Desa', href: '/dashboard/facilities' },
        { title: category.name, href: '#' },
    ];

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        facility_category_id: category.id,
        name: '',
        address: '',
        image: null as File | null,
        is_active: true,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCreate = () => {
        reset();
        clearErrors();
        setData((prev) => ({ ...prev, facility_category_id: category.id }));
        setIsCreateOpen(true);
    };

    const handleEdit = (item: any) => {
        reset();
        clearErrors();
        setEditingItem(item);
        setData({
            facility_category_id: category.id,
            name: item.name,
            address: item.address || '',
            image: null,
            is_active: !!item.is_active,
        });
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('facility-items.store'), {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            }
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        // Use post with _method: put for file uploads in Inertia if needed, but router.post is safer usually with FormData.
        // Inertia 'put' helper doesn't support files automatically in some versions, but 'post' with forced method does.
        // Actually, let's try standard 'post' with _method put trick if simple 'put' fails.
        // For simplicity, let's use router.post with `_method: 'PUT'` inside data wrapper if using `useForm` put.
        // Wait, standard `useForm`'s `put` handles JSON. For files we usually need `router.post` with FormData.

        router.post(route('facility-items.update', editingItem.id), {
            _method: 'put',
            ...data,
        }, {
            onSuccess: () => {
                setEditingItem(null);
                reset();
            }
        });
    };

    const deleteItem = (id: number) => {
        router.delete(route('facility-items.destroy', id), {
            preserveScroll: true,
        });
    };

    const filteredItems = category.items.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.address && item.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Fasilitas: ${category.name}`} />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={route('facilities.index')}>
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
                                <ArrowLeft className="w-5 h-5 text-slate-500" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                {category.name}
                            </h1>
                            <p className="text-slate-500 text-sm">
                                {category.description || 'Kelola item fasilitas untuk kategori ini.'}
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Item
                    </Button>
                </div>

                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                            <CardTitle>Daftar Item Fasilitas</CardTitle>
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Cari item..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 h-9"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px] text-center">#</TableHead>
                                    <TableHead>Nama Item</TableHead>
                                    <TableHead>Alamat / Lokasi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item: any, index: number) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50">
                                            <TableCell className="text-center font-medium text-slate-500">{index + 1}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {item.image ? (
                                                        <img src={`/storage/${item.image}`} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                    <span className="font-semibold text-slate-900">{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-600">
                                                {item.address ? (
                                                    <div className="flex items-start gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                                                        <span className="text-sm">{item.address}</span>
                                                    </div>
                                                ) : <span className="text-slate-400 italic text-sm">-</span>}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={item.is_active ? 'default' : 'secondary'} className={item.is_active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}>
                                                    {item.is_active ? 'Aktif' : 'Non-Aktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Hapus Item?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus "{item.name}"?
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteItem(item.id)} className="bg-red-600 hover:bg-red-700">
                                                                    Hapus
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                            Tidak ada item fasilitas dalam kategori ini.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Create Dialog */}
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Item Fasilitas</DialogTitle>
                            <DialogDescription>Tambahkan item baru ke dalam kategori {category.name}</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitCreate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="create-name">Nama Item <span className="text-red-500">*</span></Label>
                                <Input
                                    id="create-name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Contoh: SD Negeri 1"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="create-address">Alamat (Opsional)</Label>
                                <Input
                                    id="create-address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    placeholder="Alamat lengkap..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="create-image">Gambar (Opsional)</Label>
                                <Input
                                    id="create-image"
                                    type="file"
                                    onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                                {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded bg-slate-50 border border-slate-100">
                                <Label htmlFor="create-active" className="cursor-pointer">Status Aktif</Label>
                                <Switch
                                    id="create-active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">Simpan</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Item Fasilitas</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Nama Item <span className="text-red-500">*</span></Label>
                                <Input
                                    id="edit-name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-address">Alamat (Opsional)</Label>
                                <Input
                                    id="edit-address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-image">Ganti Gambar (Opsional)</Label>
                                <Input
                                    id="edit-image"
                                    type="file"
                                    onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                                {errors.image && <p className="text-red-500 text-xs">{errors.image}</p>}
                                {editingItem && editingItem.image && !data.image && (
                                    <div className="p-2 border border-slate-200 rounded text-xs text-slate-500 flex items-center gap-2">
                                        <ImageIcon className="w-3 h-3" /> Gambar saat ini terpasang (biarkan kosong jika tidak ingin mengubah)
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded bg-slate-50 border border-slate-100">
                                <Label htmlFor="edit-active" className="cursor-pointer">Status Aktif</Label>
                                <Switch
                                    id="edit-active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>Batal</Button>
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">Simpan Perubahan</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
        </AppSidebarLayout>
    );
}
