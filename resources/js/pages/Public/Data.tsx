import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Users, FileText, TrendingUp, TrendingDown, Briefcase, GraduationCap, ArrowRight, PieChart } from 'lucide-react';

interface DataProps {
    demographics: any[];
    budgets: any[];
}

export default function Data({ demographics, budgets }: DataProps) {
    // Group demographics by type
    const genderStats = demographics.filter(d => d.type === 'gender');
    const jobStats = demographics.filter(d => d.type === 'job');
    const eduStats = demographics.filter(d => d.type === 'education');

    // Helper for max value to calculate percentage width
    const getPercentage = (val: number, list: any[]) => {
        const total = list.reduce((acc, curr) => acc + curr.value, 0);
        return total === 0 ? 0 : Math.round((val / total) * 100);
    };

    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Data Hub' }
    ];

    return (
        <PublicLayout>
            <Head title="Data Desa - Kalisabuk" />

            <PageHeader
                title="Data Transparan"
                subtitle="Akses terbuka terhadap data kependudukan dan transparansi kinerja anggaran desa demi akuntabilitas publik."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <Users className="w-8 h-8" />
                                </div>
                                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+2.4%</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Penduduk</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tight">
                                    {genderStats.reduce((acc, curr) => acc + curr.value, 0).toLocaleString('id-ID')}
                                    <span className="text-lg font-bold text-slate-400 ml-2">Jiwa</span>
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-4 bg-teal-50 rounded-2xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <span className="flex items-center text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">TA {new Date().getFullYear()}</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total APBDes</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tight">
                                    2.4<span className="text-lg font-bold text-slate-400 ml-2">Milyar</span>
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <FileText className="w-8 h-8" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Transparansi</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tight">
                                    {budgets.length > 0 ? budgets.length : '0'}
                                    <span className="text-lg font-bold text-slate-400 ml-2">Laporan</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Demographics Column */}
                        <div className="space-y-12">
                            {/* Section Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                                    <PieChart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black font-serif text-slate-900">Demografi Penduduk</h3>
                                    <p className="text-slate-500 text-sm">Statistik berdasarkan jenis kelamin, pekerjaan, dan pendidikan.</p>
                                </div>
                            </div>

                            {/* Gender Stats - Premium Card */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
                                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-emerald-500" /> Jenis Kelamin
                                </h4>
                                <div className="flex gap-4 relative z-10">
                                    {genderStats.map((item, idx) => (
                                        <div key={item.id} className={`flex-1 p-6 rounded-2xl border ${idx === 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'} text-center group transition-colors hover:bg-white hover:shadow-lg`}>
                                            <div className={`text-3xl font-black mb-1 ${idx === 0 ? 'text-emerald-700' : 'text-slate-700'}`}>{item.value}</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Stats */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-emerald-500" /> Pekerjaan Utama
                                </h4>
                                <div className="space-y-4">
                                    {jobStats.map(item => (
                                        <div key={item.id} className="group">
                                            <div className="flex justify-between text-sm mb-2 font-medium">
                                                <span className="text-slate-600 group-hover:text-emerald-700 transition-colors">{item.label}</span>
                                                <span className="text-slate-900">{item.value}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                                <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-600" style={{ width: `${getPercentage(item.value, jobStats)}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Edu Stats */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-emerald-500" /> Pendidikan
                                </h4>
                                <div className="space-y-4">
                                    {eduStats.map(item => (
                                        <div key={item.id} className="group">
                                            <div className="flex justify-between text-sm mb-2 font-medium">
                                                <span className="text-slate-600 group-hover:text-indigo-700 transition-colors">{item.label}</span>
                                                <span className="text-slate-900">{item.value}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                                <div className="bg-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out group-hover:bg-indigo-600" style={{ width: `${getPercentage(item.value, eduStats)}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Financial Column */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black font-serif text-slate-900">Transparansi Anggaran</h3>
                                    <p className="text-slate-500 text-sm">Laporan realisasi APBDes tahun berjalan dan sebelumnya.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {budgets.reduce((acc: any[], curr) => {
                                    // Group by year for display
                                    const yearGroup = acc.find(g => g.year === curr.year);
                                    if (yearGroup) {
                                        yearGroup.items.push(curr);
                                    } else {
                                        acc.push({ year: curr.year, items: [curr] });
                                    }
                                    return acc;
                                }, []).map((group: any) => (
                                    <div key={group.year} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                                            <h4 className="text-lg font-bold">APBDes {group.year}</h4>
                                            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Verified</span>
                                        </div>

                                        <div className="p-8 space-y-6">
                                            {group.items.map((budget: any) => (
                                                <div key={budget.id} className="relative pl-6 border-l-2 border-slate-200 hover:border-emerald-500 transition-colors py-1 group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <span className={`text-xs py-1 px-2 rounded-md font-bold uppercase tracking-wider mb-2 inline-block ${budget.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                                                {budget.type === 'income' ? 'Pendapatan' : 'Belanja'}
                                                            </span>
                                                            <div className="text-slate-500 text-xs">Target / Anggaran</div>
                                                        </div>
                                                        <div className={`font-black font-mono text-lg ${budget.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                                            IDR {Number(budget.amount).toLocaleString('id-ID')}
                                                        </div>
                                                    </div>

                                                    {budget.realized_amount && (
                                                        <div className="mt-3 bg-slate-50 rounded-xl p-3 flex justify-between items-center text-sm border border-slate-100 group-hover:border-emerald-100 transition-colors">
                                                            <span className="font-bold text-slate-500">Realisasi</span>
                                                            <span className="font-bold text-slate-900">IDR {Number(budget.realized_amount).toLocaleString('id-ID')}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary Footer */}
                                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                            <span className="text-slate-500 font-bold text-sm">Surplus / Defisit</span>
                                            <span className={`text-xl font-black font-mono ${(group.items.find((i: any) => i.type === 'income')?.amount || 0) - (group.items.find((i: any) => i.type === 'expense')?.amount || 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {((group.items.find((i: any) => i.type === 'income')?.amount || 0) - (group.items.find((i: any) => i.type === 'expense')?.amount || 0)) >= 0 ? '+' : ''}
                                                IDR {
                                                    ((group.items.find((i: any) => i.type === 'income')?.amount || 0) -
                                                        (group.items.find((i: any) => i.type === 'expense')?.amount || 0))
                                                        .toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
