import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FileText, CheckCircle2, Clock, ArrowRight, Phone, Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function ServiceIndex({ serviceTypes }: { serviceTypes: any[] }) {
    const [selectedService, setSelectedService] = useState<any>(null);

    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Informasi Layanan' }
    ];

    return (
        <PublicLayout>
            <Head title="Informasi Layanan - Kalisabuk" />

            <PageHeader
                title="Informasi Layanan Administrasi Desa"
                subtitle="Panduan lengkap syarat dan prosedur pengajuan berbagai layanan administrasi di Desa Kalisabuk."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                    {/* Service Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceTypes.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                            >
                                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-white/10 rounded-full"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                        {service.processing_time && (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-bold backdrop-blur-sm">
                                                <Clock className="w-3.5 h-3.5" />
                                                {service.processing_time}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-3 flex items-center text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
                                                Persyaratan
                                            </h4>
                                            {service.requirements && service.requirements.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {service.requirements.map((req: string, idx: number) => (
                                                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                                                            <span className="mr-2 text-emerald-500 font-bold">•</span>
                                                            <span className="flex-1">{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-slate-500 italic">Tidak ada syarat khusus</p>
                                            )}
                                        </div>

                                        {service.fee && (
                                            <div className="pt-4 border-t border-slate-100">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-slate-600">Biaya</span>
                                                    <span className="font-bold text-emerald-600">{service.fee}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <button 
                                            onClick={() => setSelectedService(selectedService?.id === service.id ? null : service)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-colors"
                                        >
                                            <Info className="w-4 h-4" />
                                            {selectedService?.id === service.id ? 'Tutup Detail' : 'Lihat Prosedur'}
                                        </button>
                                    </div>
                                </div>

                                {selectedService?.id === service.id && (
                                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                                            <h4 className="font-bold text-blue-900 mb-3 text-sm">Prosedur Pengajuan</h4>
                                            <ol className="space-y-2 text-sm text-blue-800">
                                                <li className="flex items-start">
                                                    <span className="font-bold mr-2">1.</span>
                                                    <span>Siapkan dokumen persyaratan yang dibutuhkan</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="font-bold mr-2">2.</span>
                                                    <span>Datang ke Kantor Desa Kalisabuk pada jam kerja</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="font-bold mr-2">3.</span>
                                                    <span>Sampaikan maksud dan serahkan dokumen persyaratan</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="font-bold mr-2">4.</span>
                                                    <span>Tunggu proses verifikasi dan pembuatan surat</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="font-bold mr-2">5.</span>
                                                    <span>Ambil surat yang sudah jadi sesuai estimasi waktu</span>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Info CTA */}
                    <div className="mt-20 bg-white rounded-3xl border border-slate-200 p-8 md:p-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-4">
                                    <Phone className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-3">Perlu Bantuan?</h2>
                                <p className="text-slate-600 text-lg">
                                    Hubungi petugas layanan kami untuk informasi lebih lanjut atau konsultasi
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4">Jam Layanan</h3>
                                    <div className="space-y-2 text-sm text-slate-600">
                                        <p><strong>Senin - Kamis:</strong> 08.00 - 15.00 WIB</p>
                                        <p><strong>Jumat:</strong> 08.00 - 11.30 WIB</p>
                                        <p><strong>Sabtu - Minggu:</strong> Libur</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                                    <h3 className="font-bold text-slate-900 mb-4">Kontak Kantor Desa</h3>
                                    <div className="space-y-2 text-sm text-slate-700">
                                        <p className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-emerald-600" />
                                            <span>(0274) xxx-xxxx</span>
                                        </p>
                                        <p className="text-slate-600">atau kunjungi kantor desa secara langsung</p>
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
