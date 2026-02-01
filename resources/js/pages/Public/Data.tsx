import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { PieChart, ChartBar } from 'lucide-react';

interface VillageStat {
    id: number;
    title: string;
    value: string;
    unit: string | null;
    icon: string;
    color: string;
    description: string | null;
    category: string | null;
    formatted_value: string;
}

interface DataProps {
    demographicTypes: any[];
    villageStats: VillageStat[];
}

// Color mapping definitions
const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', gradient: 'from-emerald-500 to-emerald-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', gradient: 'from-blue-500 to-blue-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', gradient: 'from-purple-500 to-purple-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', gradient: 'from-orange-500 to-orange-600' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', gradient: 'from-pink-500 to-pink-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', gradient: 'from-red-500 to-red-600' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100', gradient: 'from-yellow-500 to-yellow-600' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', gradient: 'from-indigo-500 to-indigo-600' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', gradient: 'from-teal-500 to-teal-600' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100', gradient: 'from-cyan-500 to-cyan-600' },
};

export default function Data({ demographicTypes, villageStats }: DataProps) {

    // Helper for max value to calculate percentage width
    const getPercentage = (val: number, list: any[]) => {
        const total = list.reduce((acc, curr) => acc + curr.value, 0);
        return total === 0 ? 0 : Math.round((val / total) * 100);
    };

    // Color mapping - moved to array for easier cycling
    const colorKeys = ['emerald', 'blue', 'orange', 'purple', 'red', 'indigo', 'teal', 'cyan', 'pink', 'yellow'];

    // Basic icon fallback
    const getIcon = (iconName: string) => {
        return ChartBar;
    };

    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Data Hub' }
    ];

    const DataCard = ({ title, data, colorKey }: { title: string, data: any[], colorKey: string }) => {
        if (!data || data.length === 0) return null;
        const colors = colorMap[colorKey] || colorMap.emerald;

        return (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-50">
                    {/* Title Only, No Icon as requested */}
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                </div>
                <div className="space-y-5 flex-1 pr-2">
                    {data.map((item, idx) => {
                        const percentage = getPercentage(item.value, data);
                        return (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.value.toLocaleString()} ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out group-hover:scale-[1.02] origin-left`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <PublicLayout>
            <Head title="Data Desa - Kalisabuk" />

            <PageHeader
                title="Data Kependudukan"
                subtitle="Akses terbuka terhadap data kependudukan desa demi transparansi publik."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"
            />

            {/* Section 1: Village Stats (Dynamic Cards) */}
            <div className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Header for Stats */}
                    {villageStats && villageStats.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                                    <PieChart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black font-serif text-slate-900">Data Statistik Desa</h3>
                                    <p className="text-slate-500 text-sm">Informasi terkini tentang desa dalam berbagai aspek</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {villageStats.map((stat: any, index: number) => {
                                    const colorKey = colorKeys[index % colorKeys.length];
                                    const colors = colorMap[colorKey];

                                    return (
                                        <div
                                            key={stat.id}
                                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                                        >
                                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />

                                            <div className="relative z-10 flex flex-col h-full justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        {stat.category ? (
                                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                                                                {stat.category}
                                                            </span>
                                                        ) : <div></div>}
                                                    </div>

                                                    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">
                                                        {stat.title}
                                                    </h3>

                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
                                                            {stat.formatted_value || stat.value}
                                                        </span>
                                                        {stat.unit && (
                                                            <span className="text-xl text-slate-400 font-medium">{stat.unit}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {stat.description && (
                                                    <p className="mt-6 text-sm text-slate-400 leading-relaxed border-t border-slate-50 pt-4">
                                                        {stat.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Section 2: Demographics Charts (Dynamic Categories) */}
            {demographicTypes && demographicTypes.length > 0 && (
                <div className="bg-white py-16 sm:py-24 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none">
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="flex items-center gap-4 mb-12 justify-center text-center">
                            <div>
                                <h2 className="text-3xl font-black font-serif text-slate-900 mb-4">Demografi Penduduk</h2>
                                <p className="text-slate-500 max-w-2xl mx-auto">
                                    Gambaran data penduduk berdasarkan kategori yang ada untuk memahami struktur sosial masyarakat desa.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {demographicTypes.map((type, index) => (
                                <DataCard
                                    key={type.id}
                                    title={type.name}
                                    data={type.demographics}
                                    colorKey={colorKeys[index % colorKeys.length]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </PublicLayout>
    );
}
