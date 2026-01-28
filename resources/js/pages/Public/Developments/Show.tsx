import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { MapPin, Calendar, CheckCircle2, User, Banknote, ArrowLeft } from 'lucide-react';

export default function PublicDevelopmentShow({ development }: { development: any }) {

    return (
        <PublicLayout>
            <Head title={development.title} />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/pembangunan" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar
                    </Link>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Compare Slider Area */}
                        <div className="w-full aspect-video bg-slate-100 relative">
                            {development.image_after && development.image_before ? (
                                <ReactCompareSlider
                                    itemOne={<ReactCompareSliderImage src={`/storage/${development.image_before}`} alt="Sebelum" />}
                                    itemTwo={<ReactCompareSliderImage src={`/storage/${development.image_after}`} alt="Sesudah" />}
                                    className="h-full w-full"
                                />
                            ) : (
                                <img
                                    src={development.image_before ? `/storage/${development.image_before}` : 'https://placehold.co/800x450'}
                                    alt={development.title}
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {development.image_after && development.image_before && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-medium pointer-events-none z-10">
                                    Geser untuk membandingkan
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            <div className="flex flex-wrap gap-4 mb-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                    ${development.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                        development.status === 'progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}
                                `}>
                                    {development.status === 'completed' ? 'Selesai' :
                                        development.status === 'progress' ? 'Sedang Berjalan' : 'Rencana'}
                                </span>
                                <span className="flex items-center text-slate-500 text-sm">
                                    <Calendar className="w-4 h-4 mr-2" /> {development.year}
                                </span>
                                <span className="flex items-center text-slate-500 text-sm">
                                    <MapPin className="w-4 h-4 mr-2" /> {development.location}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-slate-900 mb-6">{development.title}</h1>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Deskripsi Pembangunan</h3>
                                    <div className="prose prose-slate max-w-none text-slate-600">
                                        <p className="whitespace-pre-line">{development.description || 'Tidak ada deskripsi tersedia.'}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <h3 className="font-semibold text-slate-900 mb-4">Informasi Proyek</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs text-slate-500 mb-1 flex items-center">
                                                    <Banknote className="w-3 h-3 mr-1" /> Anggaran
                                                </div>
                                                <div className="font-medium text-slate-900">
                                                    {development.budget ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(development.budget) : '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs text-slate-500 mb-1 flex items-center">
                                                    <User className="w-3 h-3 mr-1" /> Pelaksana
                                                </div>
                                                <div className="font-medium text-slate-900">
                                                    {development.contractor || '-'}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs text-slate-500 mb-1 flex items-center">
                                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Sumber Dana
                                                </div>
                                                <div className="font-medium text-slate-900">
                                                    APBDes {development.year}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
