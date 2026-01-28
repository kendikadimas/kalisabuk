import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, MapPin, Calendar } from 'lucide-react';

export default function DevelopmentIndex({ developments }: { developments: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pembangunan', href: '/dashboard/developments' },
    ];

    const { flash } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Pembangunan" />

            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-slate-900">Data Pembangunan</h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Kelola data pembangunan desa dan progresnya.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/developments/create"
                        className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Data
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                        {flash.success}
                    </div>
                )}

                <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Proyek</th>
                                <th scope="col" className="px-6 py-3">Lokasi & Tahun</th>
                                <th scope="col" className="px-6 py-3">Anggaran</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {developments.data.length > 0 ? (
                                developments.data.map((item: any) => (
                                    <tr key={item.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image_before ? `/storage/${item.image_before}` : 'https://placehold.co/50x50'}
                                                    className="w-12 h-12 rounded object-cover border"
                                                    alt=""
                                                    loading="lazy"
                                                />
                                                <div>
                                                    <div className="font-bold">{item.title}</div>
                                                    <div className="text-xs text-slate-400">{item.contractor || '-'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {item.location}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    <Calendar className="w-3 h-3" /> {item.year}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.budget ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.budget) : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                ${item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}
                                            `}>
                                                {item.status === 'completed' ? 'Selesai' :
                                                    item.status === 'progress' ? 'Berjalan' : 'Rencana'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/developments/${item.id}/edit`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/dashboard/developments/${item.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                                    onClick={(e) => {
                                                        if (!confirm('Hapus data ini?')) e.preventDefault();
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        Data belum tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
