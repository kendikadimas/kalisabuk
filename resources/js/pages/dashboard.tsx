import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Ticket, Car, Wallet, CreditCard, Monitor, ScanLine, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const StatCard = ({ title, value, icon: Icon, colorClass, iconColorClass }: any) => (
    <div className={`relative overflow-hidden rounded-xl p-6 text-white shadow-md ${colorClass}`}>
        <div className="flex items-center justify-between z-10 relative">
            <div>
                <p className="text-base font-medium opacity-80">{title}</p>
                <h3 className="text-4xl font-bold mt-2">{value}</h3>
            </div>
            <div className={`p-4 rounded-full bg-white/20 backdrop-blur-sm ${iconColorClass}`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 z-0"></div>
    </div>
);

const QuickAccessCard = ({ title, description, icon: Icon, colorClass, buttonText }: any) => (
    <div className={`rounded-xl p-6 text-white shadow-md flex items-center justify-between ${colorClass}`}>
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/20">
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-base opacity-90">{description}</p>
            </div>
        </div>
        {/* Button removed/simplified as per image style usually whole card is clickable or simple indicator */}
    </div>
);

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-8 p-4 pt-6">

                {/* Greeting Section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500">Selamat Datang, <span className="font-semibold text-emerald-600">Admin Kalisabuk 👋</span></p>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Pendapatan Hari Ini"
                        value="Rp 0"
                        icon={Wallet}
                        colorClass="bg-blue-500"
                        iconColorClass="bg-blue-600/50"
                    />
                    <StatCard
                        title="Tiket Terjual"
                        value="0"
                        icon={Ticket}
                        colorClass="bg-emerald-500"
                        iconColorClass="bg-emerald-600/50"
                    />
                    <StatCard
                        title="Kendaraan Masuk"
                        value="0"
                        icon={Car}
                        colorClass="bg-orange-500"
                        iconColorClass="bg-orange-600/50"
                    />
                    <StatCard
                        title="Pengeluaran Ops"
                        value="Rp 0"
                        icon={CreditCard}
                        colorClass="bg-pink-500"
                        iconColorClass="bg-pink-600/50"
                    />
                </div>

                {/* Quick Access Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Akses Cepat</h2>
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">Role: Admin</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-[#1f4b32] text-white rounded-xl p-6 shadow-md flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <Monitor className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Dashboard Admin</h3>
                                <p className="text-xs text-gray-300">Lihat laporan dan statistik lengkap</p>
                            </div>
                        </div>

                        <div className="bg-blue-600 text-white rounded-xl p-6 shadow-md flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <ShoppingCart className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">POS - Kasir</h3>
                                <p className="text-xs text-gray-200">Proses transaksi penjualan tiket</p>
                            </div>
                        </div>

                        <div className="bg-purple-600 text-white rounded-xl p-6 shadow-md flex items-center gap-4 hover:opacity-95 transition-opacity cursor-pointer">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <ScanLine className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Scanner Gate</h3>
                                <p className="text-xs text-gray-200">Validasi dan scan tiket pengunjung</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts / Data Section (Placeholder for now based on image) */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-gray-800">Tren Pendapatan</h3>
                                <p className="text-sm text-gray-400">7 Hari Terakhir</p>
                            </div>
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                {/* Icon placeholder */}
                            </div>
                        </div>
                        <div className="h-40 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed text-sm">
                            Chart Area
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-gray-800">Transaksi Terbaru</h3>
                                <p className="text-sm text-gray-400">5 Transaksi Terakhir</p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                {/* Icon placeholder */}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-3 border-gray-50 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-bold text-gray-800 text-base">94E2C819</p>
                                    <p className="text-sm text-gray-400 flex items-center gap-1">Kasir Tuksirah • 15:24</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-emerald-600 text-base">Rp 13.000</p>
                                    <p className="text-sm text-gray-400">Qris</p>
                                </div>
                            </div>
                            {/* More items would go here */}
                            <div className="flex items-center justify-center pt-4">
                                <p className="text-sm text-gray-400">Tidak ada transaksi lainnya</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
