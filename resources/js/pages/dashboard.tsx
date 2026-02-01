import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Users,
    LayoutGrid,
    TrendingUp,
    FileText,
    ChevronRight,
    Mountain,
    ClipboardList,
    UserCheck,
    PieChart,
    Building2,
    Building,
    Megaphone,
    Briefcase
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        posts: number;
        potentials: number;
        users: number;
        developments: number;
        announcements: number;
        population: number;
    };
    latest_posts: Array<{
        id: number;
        title: string;
        category: string;
        created_at: string;
        image_path?: string;
    }>;
    latest_announcements: Array<{
        id: number;
        title: string;
        is_active: boolean;
        created_at: string;
    }>;
    demographics_data: any[]; // Keep types but unused
}

export default function Dashboard({ stats, latest_posts, latest_announcements, demographics_data }: DashboardProps) {
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8">

                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 p-8 text-white shadow-lg">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Dashboard Overview
                            </h1>
                            <p className="text-emerald-100 mt-2 text-lg">
                                Selamat datang kembali, Administrator.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-white shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse outline outline-4 outline-emerald-500/20" />
                            {currentDate}
                        </div>
                    </div>

                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                </div>

                {/* Stats Grid - Updated with Important Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Penduduk"
                        value={stats.population}
                        icon={Users}
                        trend="Live"
                        trendLabel="data kependudukan"
                        theme="emerald"
                    />
                    <StatsCard
                        title="Berita & Artikel"
                        value={stats.posts}
                        icon={FileText}
                        trend="Total"
                        trendLabel="konten terpublikasi"
                        theme="indigo"
                    />
                    <StatsCard
                        title="Pengumuman"
                        value={stats.announcements}
                        icon={Megaphone}
                        trend="Publik"
                        trendLabel="informasi penting"
                        theme="orange"
                    />
                    <StatsCard
                        title="Proyek Pembangunan"
                        value={stats.developments}
                        icon={Building}
                        trend="Aktif"
                        trendLabel="sedang berjalan"
                        theme="blue"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Quick Access */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                                <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
                                    <LayoutGrid className="w-5 h-5" />
                                </span>
                                Akses Cepat
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <QuickAction href="/dashboard/announcements" icon={Megaphone} label="Buat Pengumuman" color="rose" />
                                <QuickAction href="/dashboard/posts/create" icon={FileText} label="Tulis Berita" color="blue" />
                                <QuickAction href="/dashboard/demographics" icon={Users} label="Input Penduduk" color="indigo" />
                                <QuickAction href="/dashboard/developments/create" icon={Building} label="Input Proyek" color="orange" />
                                <QuickAction href="/dashboard/village-stats" icon={PieChart} label="Data Statistik" color="teal" />
                                <QuickAction href="/dashboard/potentials/create" icon={Mountain} label="Tambah Potensi" color="emerald" />
                                <QuickAction href="/dashboard/village-officials/create" icon={UserCheck} label="Perangkat Desa" color="purple" />
                                <QuickAction href="/dashboard/services" icon={ClipboardList} label="Info Layanan" color="slate" />
                            </div>
                        </div>

                        {/* Recent News Table */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-800 text-lg">Publikasi Terbaru</h3>
                                <Link href="/dashboard/posts" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {latest_posts.length > 0 ? (
                                    latest_posts.map((post) => (
                                        <div key={post.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden shadow-sm border border-slate-200">
                                                    <img
                                                        src={post.image_path ? (post.image_path.startsWith('http') ? post.image_path : `/storage/${post.image_path}`) : 'https://placehold.co/100x100?text=IMG'}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 text-base">{post.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1.5">
                                                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                                                            {post.category}
                                                        </span>
                                                        <span className="text-xs text-slate-400">
                                                            {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={`/dashboard/posts/${post.id}/edit`} className="p-2 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all flex-shrink-0">
                                                <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <p className="text-slate-500 text-lg font-medium">Belum ada konten</p>
                                        <p className="text-slate-400 text-sm mt-1">Mulai dengan membuat berita baru.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Area (1/3) */}
                    <div className="space-y-8">

                        {/* Announcements Widget (Replaces Demographics) */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                            {/* Decorative header bg */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />

                            <h3 className="font-semibold text-slate-800 mb-6 text-lg flex items-center justify-between">
                                <span>Pengumuman Terbaru</span>
                                <Link href="/dashboard/announcements" className="text-orange-600 hover:text-orange-700 bg-orange-50 p-1.5 rounded-lg transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </h3>

                            <div className="space-y-4">
                                {latest_announcements && latest_announcements.length > 0 ? (
                                    latest_announcements.map((item) => (
                                        <div key={item.id} className="flex gap-3 group">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-100 transition-colors">
                                                    <Megaphone className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/dashboard/announcements/${item.id}/edit`} className="block">
                                                    <p className="text-sm font-medium text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                                                        {item.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                                                        <span className="text-xs text-slate-400">
                                                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm text-center py-4 italic">Belum ada pengumuman.</p>
                                )}
                            </div>

                            <div className="mt-6 pt-5 border-t border-slate-50">
                                <Link href="/dashboard/announcements/create" className="block w-full py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold text-sm rounded-xl text-center transition-colors">
                                    Buat Pengumuman Baru
                                </Link>
                            </div>
                        </div>

                        {/* Job Stats Widget */}
                        {/* <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                            <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                                <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                                    <Briefcase className="w-5 h-5" />
                                </span>
                                Statistik Pekerjaan
                            </h3>
                            <div className="space-y-5">
                                {demographics_data && demographics_data.length > 0 ? (
                                    demographics_data.map((item, idx) => {
                                        const maxValue = Math.max(...demographics_data.map(d => d.value));
                                        const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                                        const barColors = ['bg-indigo-500', 'bg-blue-500', 'bg-sky-500', 'bg-cyan-500', 'bg-teal-500'];
                                        const color = barColors[idx % barColors.length];

                                        return (
                                            <div key={item.id} className="group">
                                                <div className="flex justify-between text-sm mb-1.5">
                                                    <span className="text-slate-600 font-medium group-hover:text-indigo-600 transition-colors truncate pr-4">{item.label}</span>
                                                    <span className="font-bold text-slate-900">{item.value.toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-slate-400 text-sm italic text-center py-4">Data statistik belum tersedia.</p>
                                )}
                            </div>
                            <div className="mt-6 pt-5 border-t border-slate-50 text-center">
                                <Link href="/dashboard/demographics" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                                    Lihat Selengkapnya
                                </Link>
                            </div>
                        </div> */}

                        {/* System Status */}
                        <div className="rounded-2xl p-1 bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg">
                            <div className="bg-slate-900/90 rounded-xl p-6 text-white backdrop-blur-sm relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-semibold text-lg mb-1">Website Publik</h3>
                                    <p className="text-emerald-100/70 text-sm mb-5">Sistem berjalan normal dan dapat diakses.</p>
                                    <div className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-lg border border-white/10">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-sm font-bold text-emerald-400 tracking-wide">SYSTEM ONLINE</span>
                                    </div>
                                    <Link href="/" target="_blank" className="inline-flex items-center justify-center w-full gap-2 text-sm font-medium text-slate-900 bg-white hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors shadow-lg">
                                        Kunjungi Website <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

function StatsCard({ title, value, icon: Icon, trend, trendLabel, theme = 'emerald' }: any) {
    // Definisi tema warna untuk card
    const themes: Record<string, string> = {
        emerald: 'from-emerald-500 to-green-600 text-white shadow-emerald-900/10',
        blue: 'from-blue-500 to-indigo-600 text-white shadow-blue-900/10',
        teal: 'from-teal-500 to-emerald-600 text-white shadow-teal-900/10',
        orange: 'from-orange-500 to-amber-500 text-white shadow-orange-900/10',
    };

    const bgClass = themes[theme] || themes.emerald;

    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgClass} p-6 shadow-xl transition-transform hover:-translate-y-1`}>
            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-black/5 blur-xl" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm shadow-inner ring-1 ring-white/30">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {trend && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-white/90 bg-black/10 px-2.5 py-1 rounded-lg backdrop-blur-md">
                            <TrendingUp className="w-3 h-3" /> {trend}
                        </span>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-white/80">{title}</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{value.toLocaleString('id-ID')}</h3>
                    {trendLabel && <p className="text-xs text-white/60 mt-1 capitalize font-medium tracking-wide">{trendLabel}</p>}
                </div>
            </div>
        </div>
    );
}

function QuickAction({ href, icon: Icon, label, color }: any) {
    const colorClasses: Record<string, string> = {
        blue: 'text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
        orange: 'text-orange-600 bg-orange-50 border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
        purple: 'text-purple-600 bg-purple-50 border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
        indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600',
        teal: 'text-teal-600 bg-teal-50 border-teal-100 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
        slate: 'text-slate-600 bg-slate-50 border-slate-100 group-hover:bg-slate-600 group-hover:text-white group-hover:border-slate-600',
        rose: 'text-rose-600 bg-rose-50 border-rose-100 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600',
    };

    return (
        <Link href={href} className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className={`p-4 rounded-xl transition-all duration-300 border ${colorClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 text-center">{label}</span>
        </Link>
    );
}
