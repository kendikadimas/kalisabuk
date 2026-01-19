import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Users, Save, MapPin, Calendar, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

export default function DemographicIndex({ villageInfo }: { villageInfo: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Statistik', href: '/dashboard/demographics' },
    ];

    const { flash } = usePage().props as any;

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Statistik Website" />

            <div className="flex h-full flex-1 flex-col gap-8 p-6 max-w-7xl mx-auto w-full">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Statistik Website</h2>
                        <p className="text-slate-500 mt-1">
                            Kelola data statistik umum desa yang ditampilkan di halaman publik.
                        </p>
                    </div>
                </div>

                {flash?.success && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {flash.success}
                    </div>
                )}

                {/* Section 1: General Stats (Editable) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-bold text-slate-900">Statistik Umum</h3>
                    </div>

                    <form onSubmit={submitGeneralStats} className="space-y-8">

                        {/* Basic Stats Group */}
                        <div>
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                <Activity className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-slate-900">Data Umum</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="population" className="text-slate-600 font-semibold">Total Penduduk</Label>
                                    <Input
                                        id="population"
                                        type="number"
                                        placeholder="0"
                                        value={data.population}
                                        onChange={e => setData('population', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.population && <span className="text-xs text-red-500">{errors.population}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="area_size" className="text-slate-600 font-semibold">Luas Wilayah</Label>
                                    <Input
                                        id="area_size"
                                        placeholder="Contoh: 120 Ha"
                                        value={data.area_size}
                                        onChange={e => setData('area_size', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.area_size && <span className="text-xs text-red-500">{errors.area_size}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="founded_year" className="text-slate-600 font-semibold">Tahun Berdiri</Label>
                                    <Input
                                        id="founded_year"
                                        type="number"
                                        placeholder="1800"
                                        value={data.founded_year}
                                        onChange={e => setData('founded_year', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.founded_year && <span className="text-xs text-red-500">{errors.founded_year}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="village_status" className="text-slate-600 font-semibold">Status Desa</Label>
                                    <Input
                                        id="village_status"
                                        placeholder="Contoh: Mandiri"
                                        value={data.village_status}
                                        onChange={e => setData('village_status', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.village_status && <span className="text-xs text-red-500">{errors.village_status}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Administrative Counts */}
                        <div>
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                <MapPin className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-slate-900">Wilayah Administratif</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="hamlet_count" className="text-slate-600 font-semibold">Jumlah Dusun</Label>
                                    <Input
                                        id="hamlet_count"
                                        type="number"
                                        value={data.hamlet_count}
                                        onChange={e => setData('hamlet_count', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rw_count" className="text-slate-600 font-semibold">Jumlah RW</Label>
                                    <Input
                                        id="rw_count"
                                        type="number"
                                        value={data.rw_count}
                                        onChange={e => setData('rw_count', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rt_count" className="text-slate-600 font-semibold">Jumlah RT</Label>
                                    <Input
                                        id="rt_count"
                                        type="number"
                                        value={data.rt_count}
                                        onChange={e => setData('rt_count', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Boundaries */}
                        <div>
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                <MapPin className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-slate-900">Batas Wilayah</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="boundary_north" className="text-slate-600 font-semibold">Batas Utara</Label>
                                    <Input
                                        id="boundary_north"
                                        placeholder="Desa ..."
                                        value={data.boundary_north}
                                        onChange={e => setData('boundary_north', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="boundary_south" className="text-slate-600 font-semibold">Batas Selatan</Label>
                                    <Input
                                        id="boundary_south"
                                        placeholder="Desa ..."
                                        value={data.boundary_south}
                                        onChange={e => setData('boundary_south', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="boundary_east" className="text-slate-600 font-semibold">Batas Timur</Label>
                                    <Input
                                        id="boundary_east"
                                        placeholder="Desa ..."
                                        value={data.boundary_east}
                                        onChange={e => setData('boundary_east', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="boundary_west" className="text-slate-600 font-semibold">Batas Barat</Label>
                                    <Input
                                        id="boundary_west"
                                        placeholder="Desa ..."
                                        value={data.boundary_west}
                                        onChange={e => setData('boundary_west', e.target.value)}
                                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="bg-slate-900 hover:bg-slate-800 text-white min-w-[150px]">
                                {processing ? 'Menyimpan...' : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Simpan Data
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

