import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import * as Icons from 'lucide-react';
import { Users, Briefcase, GraduationCap, PieChart } from 'lucide-react';
import { useMemo } from 'react';

interface VillageStat {
    id: number;
    title: string;
    value: string;
    unit: string | null;
    icon: string;
    color: string;
    size: string;
    description: string | null;
    category: string | null;
    formatted_value: string;
}

interface DataProps {
    demographics: any[];
    villageStats: VillageStat[];
}

export default function Data({ demographics, villageStats }: DataProps) {
    // Group demographics by type
    const genderStats = demographics.filter(d => d.type === 'gender');
    const jobStats = demographics.filter(d => d.type === 'job');
    const eduStats = demographics.filter(d => d.type === 'education');

    // Helper for max value to calculate percentage width
    const getPercentage = (val: number, list: any[]) => {
        const total = list.reduce((acc, curr) => acc + curr.value, 0);
        return total === 0 ? 0 : Math.round((val / total) * 100);
    };

    // Get icon component from lucide-react
    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName.split('-').map((word: string) => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('')];
        return IconComponent || Icons.ChartBar;
    };

    // Color mapping
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

    // Bento box pattern generator - creates balanced layout with no gaps
    const bentoLayout = useMemo(() => {
        if (!villageStats || villageStats.length === 0) return [];
        
        // Define patterns for different row configurations (total = 12 columns)
        const patterns = [
            [6, 6],        // 2 medium cards
            [4, 4, 4],     // 3 small cards
            [8, 4],        // 1 large + 1 small
            [4, 8],        // 1 small + 1 large
            [3, 3, 6],     // 2 tiny + 1 medium
            [6, 3, 3],     // 1 medium + 2 tiny
            [3, 6, 3],     // balanced
            [12],          // 1 full width
            [4, 4, 4],     // 3 equal
            [5, 7],        // asymmetric
            [7, 5],        // asymmetric reverse
        ];

        const result = [];
        let currentIndex = 0;
        
        while (currentIndex < villageStats.length) {
            // Pick a random pattern
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            const row = [];
            
            for (const colSpan of pattern) {
                if (currentIndex >= villageStats.length) break;
                row.push({
                    ...villageStats[currentIndex],
                    colSpan
                });
                currentIndex++;
            }
            
            result.push(row);
        }
        
        return result;
    }, [villageStats]);

    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Data Hub' }
    ];

    return (
        <PublicLayout>
            <Head title="Data Desa - Kalisabuk" />

            <PageHeader
                title="Data Kependudukan"
                subtitle="Akses terbuka terhadap data kependudukan desa demi transparansi publik."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Bento Grid - Dynamic Stats */}
                    {villageStats && villageStats.length > 0 && (
                        <div className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                                    <PieChart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black font-serif text-slate-900">Data Statistik Desa</h3>
                                    <p className="text-slate-500 text-sm">Informasi terkini tentang desa dalam berbagai aspek</p>
                                </div>
                            </div>

                            {/* Bento Box Layout - Randomized with no gaps */}
                            <div className="space-y-4">
                                {bentoLayout.map((row, rowIndex) => (
                                    <div key={rowIndex} className="grid grid-cols-12 gap-4">
                                        {row.map((stat: any) => {
                                            const IconComponent = getIcon(stat.icon);
                                            const colors = colorMap[stat.color] || colorMap.emerald;
                                            
                                            // Determine height based on column span for visual variety
                                            const heightClass = stat.colSpan >= 8 ? 'min-h-[280px]' : 
                                                              stat.colSpan >= 6 ? 'min-h-[240px]' : 
                                                              stat.colSpan >= 4 ? 'min-h-[200px]' : 'min-h-[180px]';

                                            return (
                                                <div
                                                    key={stat.id}
                                                    className={`col-span-12 md:col-span-${stat.colSpan} bg-white p-6 md:p-8 rounded-2xl shadow-sm border ${colors.border} hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${heightClass} flex flex-col`}
                                                    style={{ 
                                                        gridColumn: `span ${stat.colSpan} / span ${stat.colSpan}` 
                                                    }}
                                                >
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className={`p-3 md:p-4 bg-gradient-to-br ${colors.gradient} rounded-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                                            <IconComponent className={`${stat.colSpan >= 6 ? 'w-8 h-8' : 'w-6 h-6'}`} />
                                                        </div>
                                                        {stat.category && (
                                                            <span className={`text-xs font-bold ${colors.text} ${colors.bg} px-3 py-1.5 rounded-full border ${colors.border}`}>
                                                                {stat.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <p className={`${stat.colSpan >= 6 ? 'text-sm' : 'text-xs'} font-bold text-slate-400 uppercase tracking-widest mb-2`}>
                                                                {stat.title}
                                                            </p>
                                                            <p className={`${stat.colSpan >= 8 ? 'text-5xl' : stat.colSpan >= 6 ? 'text-4xl' : 'text-3xl'} font-black text-slate-900 tracking-tight mb-2`}>
                                                                {stat.formatted_value}
                                                                {stat.unit && (
                                                                    <span className={`${stat.colSpan >= 6 ? 'text-xl' : 'text-lg'} font-bold text-slate-400 ml-2`}>{stat.unit}</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        {stat.description && (
                                                            <p className={`${stat.colSpan >= 6 ? 'text-sm' : 'text-xs'} text-slate-500 mt-auto leading-relaxed line-clamp-2`}>
                                                                {stat.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
