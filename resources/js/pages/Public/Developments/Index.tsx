import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Calendar, ArrowRight, Building2, CheckCircle, Clock, ClipboardList } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function PublicDevelopmentIndex({ developments, filters, years }: { developments: any, filters: any, years: string[] }) {

    const onFilterChange = (key: string, value: string) => {
        router.get('/pembangunan', { ...filters, [key]: value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Pembangunan Desa' }
    ];

    return (
        <PublicLayout>
            <Head title="Data Pembangunan - Kalisabuk" />

            <PageHeader
                title="Pembangunan Desa"
                subtitle="Transparansi kegiatan pembangunan di desa kami. Pantau progres dan hasil pembangunan yang telah dilaksanakan."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    {/* Filters Section */}
                    <div className="mb-16 space-y-6">
                        {/* Year Filters */}
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Filter Tahun</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button
                                    onClick={() => onFilterChange('year', 'all')}
                                    className={`
                                        flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300
                                        ${(!filters.year || filters.year === 'all')
                                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                                            : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'}
                                    `}
                                >
                                    <Calendar className={`w-4 h-4 ${(!filters.year || filters.year === 'all') ? 'text-emerald-200' : 'text-slate-400'}`} />
                                    Semua Tahun
                                </button>
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => onFilterChange('year', year)}
                                        className={`
                                            px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300
                                            ${filters.year === year
                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                                                : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'}
                                        `}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status Filters */}
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Filter Status</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    { value: 'all', label: 'Semua Status', icon: ClipboardList },
                                    { value: 'planned', label: 'Rencana', icon: Calendar },
                                    { value: 'progress', label: 'Sedang Berjalan', icon: Clock },
                                    { value: 'completed', label: 'Selesai', icon: CheckCircle },
                                ].map((status) => (
                                    <button
                                        key={status.value}
                                        onClick={() => onFilterChange('status', status.value)}
                                        className={`
                                            flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300
                                            ${(!filters.status || filters.status === status.value)
                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                                                : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'}
                                        `}
                                    >
                                        <status.icon className={`w-4 h-4 ${(!filters.status || filters.status === status.value) ? 'text-emerald-200' : 'text-slate-400'}`} />
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Development Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {developments.data.length > 0 ? (
                            developments.data.map((item: any) => (
                                <Link
                                    href={`/pembangunan/${item.slug}`}
                                    key={item.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col hover:-translate-y-1"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                                        <img
                                            src={item.image_after ? `/storage/${item.image_after}` : (item.image_before ? `/storage/${item.image_before}` : 'https://placehold.co/600x400?text=No+Image')}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider backdrop-blur-sm
                                                ${item.status === 'completed' ? 'bg-emerald-500/90 text-white ring-2 ring-white/20' :
                                                    item.status === 'progress' ? 'bg-blue-500/90 text-white ring-2 ring-white/20' : 'bg-slate-500/90 text-white ring-2 ring-white/20'}
                                            `}>
                                                {item.status === 'completed' ? '✓ Selesai' :
                                                    item.status === 'progress' ? '⚡ Berjalan' : '📋 Rencana'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span className="font-medium">{item.year}</span>
                                            </div>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <div className="flex items-center gap-1 flex-1 min-w-0">
                                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Anggaran</p>
                                                <p className="text-sm font-bold text-slate-900">
                                                    {item.budget ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.budget) : '-'}
                                                </p>
                                            </div>
                                            <span className="text-emerald-600 flex items-center gap-1 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                                Detail <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
                                    <Building2 className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Belum ada data</h3>
                                <p className="text-slate-500 text-lg mt-2">Tidak ada data pembangunan yang sesuai filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
