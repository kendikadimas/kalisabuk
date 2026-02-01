import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Users, Save, MapPin, Activity, Plus, Trash2, Pencil, FolderPlus, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

declare var route: any;
declare var confirm: any;

export default function DemographicIndex({ villageInfo, types }: { villageInfo: any, types: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik & Demografi', href: '/dashboard/demographics' },
    ];

    const { flash } = usePage().props as any;

    // --- General Stats Logic ---
    const { data, setData, post, processing, errors } = useForm({
        population: villageInfo?.population || 0,
        area_size: villageInfo?.area_size || '',
        founded_year: villageInfo?.founded_year || '',
        village_status: villageInfo?.village_status || '',
        rt_count: villageInfo?.rt_count || 0,
        rw_count: villageInfo?.rw_count || 0,
        hamlet_count: villageInfo?.hamlet_count || 0,
        boundary_north: villageInfo?.boundary_north || '',
        boundary_south: villageInfo?.boundary_south || '',
        boundary_east: villageInfo?.boundary_east || '',
        boundary_west: villageInfo?.boundary_west || '',
    });

    const submitGeneralStats = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('stats.general.update'));
    };


    // --- Category Logic ---
    const [newCatName, setNewCatName] = useState('');
    const [isCreatingCat, setIsCreatingCat] = useState(false);

    // Edit Category State
    const [editingCatId, setEditingCatId] = useState<number | null>(null);
    const [editCatName, setEditCatName] = useState('');

    const createCategory = () => {
        if (!newCatName.trim()) return;
        router.post(route('demographic-types.store'), { name: newCatName }, {
            onSuccess: () => {
                setNewCatName('');
                setIsCreatingCat(false);
            }
        });
    };

    const deleteCategory = (id: number) => {
        if (confirm('Hapus kategori ini? Semua data di dalamnya juga akan terhapus.')) {
            router.delete(route('demographic-types.destroy', id));
        }
    };

    const startEditCategory = (type: any) => {
        setEditingCatId(type.id);
        setEditCatName(type.name);
    };

    const saveEditCategory = (id: number) => {
        router.put(route('demographic-types.update', id), { name: editCatName }, {
            onSuccess: () => setEditingCatId(null)
        });
    };

    // --- Item Logic (Separate Component recommended usually, but inline for speed) ---
    // See CategoryCard component below

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Statistik Website" />

            <div className="flex h-full flex-1 flex-col gap-10 p-6 max-w-7xl mx-auto w-full pb-20">

                {flash?.success && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        {flash.success}
                    </div>
                )}

                {/* Section 1: General Stats */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-bold text-slate-900">Statistik Umum Desa</h3>
                    </div>

                    <form onSubmit={submitGeneralStats} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="population">Total Penduduk (Jiwa)</Label>
                                <Input id="population" type="number" value={data.population} onChange={e => setData('population', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="area_size">Luas Wilayah</Label>
                                <Input id="area_size" value={data.area_size} onChange={e => setData('area_size', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hamlet_count">Jumlah Dusun</Label>
                                <Input id="hamlet_count" type="number" value={data.hamlet_count} onChange={e => setData('hamlet_count', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rt_count">Jumlah RT</Label>
                                <Input id="rt_count" type="number" value={data.rt_count} onChange={e => setData('rt_count', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rw_count">Jumlah RW</Label>
                                <Input id="rw_count" type="number" value={data.rw_count} onChange={e => setData('rw_count', e.target.value)} />
                            </div>
                        </div>

                        <h4 className="font-medium text-slate-700 pt-4 border-t border-slate-100">Batas Wilayah</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input placeholder="Utara" value={data.boundary_north} onChange={e => setData('boundary_north', e.target.value)} />
                            <Input placeholder="Selatan" value={data.boundary_south} onChange={e => setData('boundary_south', e.target.value)} />
                            <Input placeholder="Timur" value={data.boundary_east} onChange={e => setData('boundary_east', e.target.value)} />
                            <Input placeholder="Barat" value={data.boundary_west} onChange={e => setData('boundary_west', e.target.value)} />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="bg-slate-900 text-white">
                                {processing ? 'Menyimpan...' : <><Save className="w-4 h-4 mr-2" /> Simpan Statistik Umum</>}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Section 2: Demographics Categories Management */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Demografi Khusus</h2>
                            <p className="text-slate-500 mt-1">Buat kartu kategori dan isi data demografi di dalamnya.</p>
                        </div>
                        <Button onClick={() => setIsCreatingCat(!isCreatingCat)} variant="outline" className="border-dashed border-slate-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">
                            <FolderPlus className="w-4 h-4 mr-2" /> Buat Kategori Baru
                        </Button>
                    </div>

                    {isCreatingCat && (
                        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl mb-6 flex gap-3 items-center animate-in fade-in slide-in-from-top-2">
                            <Input
                                autoFocus
                                placeholder="Nama Kategori (Contoh: Tingkat Pendidikan, Pekerjaan, Agama)"
                                className="max-w-md bg-white"
                                value={newCatName}
                                onChange={e => setNewCatName(e.target.value)}
                            />
                            <Button onClick={createCategory} className="bg-emerald-600 text-white hover:bg-emerald-700">Buat</Button>
                            <Button variant="ghost" onClick={() => setIsCreatingCat(false)}><X className="w-4 h-4" /></Button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
                        {types.map((type) => (
                            <CategoryCard
                                key={type.id}
                                type={type}
                                onDelete={() => deleteCategory(type.id)}
                                isEditing={editingCatId === type.id}
                                editName={editCatName}
                                onEditNameChange={setEditCatName}
                                onStartEdit={() => startEditCategory(type)}
                                onSaveEdit={() => saveEditCategory(type.id)}
                                onCancelEdit={() => setEditingCatId(null)}
                            />
                        ))}

                        {types.length === 0 && !isCreatingCat && (
                            <div className="col-span-full py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                Belum ada kategori data. Klik tombol "Buat Kategori Baru" di atas.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

// Subcomponent for each Category Card
function CategoryCard({ type, onDelete, isEditing, editName, onEditNameChange, onStartEdit, onSaveEdit, onCancelEdit }: any) {
    // Local state for adding new item
    const [newItemLabel, setNewItemLabel] = useState('');
    const [newItemValue, setNewItemValue] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const addItem = () => {
        if (!newItemLabel.trim() || !newItemValue) return;

        router.post(route('demographics.store'), {
            demographic_type_id: type.id,
            label: newItemLabel,
            value: parseInt(newItemValue)
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewItemLabel('');
                setNewItemValue('');
                setIsAdding(false);
            }
        });
    };

    const deleteItem = (id: number) => {
        if (confirm('Hapus item data ini?')) {
            router.delete(route('demographics.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between min-h-[56px]">
                {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                        <Input
                            value={editName}
                            onChange={e => onEditNameChange(e.target.value)}
                            className="h-8 text-sm"
                            autoFocus
                        />
                        <button onClick={onSaveEdit} className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200"><Check className="w-4 h-4" /></button>
                        <button onClick={onCancelEdit} className="p-1.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>
                ) : (
                    <>
                        <h4 className="font-bold text-slate-800 line-clamp-1" title={type.name}>{type.name}</h4>
                        <div className="flex gap-1">
                            <button onClick={onStartEdit} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Pencil className="w-4 h-4" /></button>
                            <button onClick={onDelete} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </>
                )}
            </div>

            {/* List */}
            <div className="flex-1 p-0 overflow-y-auto max-h-[300px]">
                {type.demographics && type.demographics.length > 0 ? (
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-slate-50">
                            {type.demographics.map((item: any) => (
                                <tr key={item.id} className="group hover:bg-slate-50">
                                    <td className="px-5 py-3 text-slate-700 font-medium">{item.label}</td>
                                    <td className="px-5 py-3 text-right text-slate-500 font-mono">{item.value.toLocaleString()}</td>
                                    <td className="px-2 py-3 w-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 text-sm italic">
                        Belum ada data.
                    </div>
                )}
            </div>

            {/* Footer / Add Form */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                {isAdding ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                        <Input
                            placeholder="Label (Contoh: Petani)"
                            value={newItemLabel}
                            onChange={e => setNewItemLabel(e.target.value)}
                            className="bg-white"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Jumlah"
                                value={newItemValue}
                                onChange={e => setNewItemValue(e.target.value)}
                                className="bg-white"
                            />
                            <Button onClick={addItem} size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">Simpan</Button>
                            <Button onClick={() => setIsAdding(false)} size="sm" variant="ghost">Batal</Button>
                        </div>
                    </div>
                ) : (
                    <Button onClick={() => setIsAdding(true)} variant="ghost" className="w-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 border-dashed">
                        <Plus className="w-4 h-4 mr-2" /> Tambah Data Item
                    </Button>
                )}
            </div>
        </div>
    );
}
