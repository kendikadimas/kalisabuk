import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Printer, ArrowLeft, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';

export default function ServiceSuccess({ serviceRequest }: { serviceRequest: any }) {

    const handlePrint = () => {
        window.print();
    };

    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Layanan Mandiri', href: '/layanan' },
        { label: 'Berhasil' }
    ];

    return (
        <PublicLayout>
            <Head title="Permohonan Berhasil - Kalisabuk" />

            <PageHeader
                title="Permohonan Berhasil"
                subtitle="Permohonan Anda telah kami terima dan sedang dalam proses verifikasi."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="bg-slate-50 py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
                
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    {/* Success Animation */}
                    <div className="text-center mb-12 print:hidden">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-6 shadow-2xl shadow-emerald-500/50 animate-in zoom-in duration-500">
                            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Pengajuan Diterima!</h1>
                        <p className="text-lg text-slate-600 max-w-xl mx-auto">
                            Tim kami akan memverifikasi data Anda dan memproses permohonan dalam waktu 1-3 hari kerja.
                        </p>
                    </div>

                    {/* Ticket Card */}
                    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border print:border-black">

                        {/* Header dengan gradient */}
                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-white relative overflow-hidden print:bg-white print:text-black">
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl print:hidden"></div>
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center print:bg-black/10">
                                    <FileCheck className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-emerald-200 text-sm font-medium mb-1 print:text-black/60">Nomor Tiket Layanan</p>
                                    <p className="text-3xl font-black tracking-tight print:text-black">{serviceRequest.ticket_code}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-4 border-b border-slate-200">
                                    <span className="text-slate-500 font-medium">Jenis Layanan</span>
                                    <span className="font-bold text-slate-900 text-right">{serviceRequest.service_type?.name || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-slate-200">
                                    <span className="text-slate-500 font-medium">Nama Pemohon</span>
                                    <span className="font-bold text-slate-900 text-right">{serviceRequest.citizen_name}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-slate-200">
                                    <span className="text-slate-500 font-medium">NIK</span>
                                    <span className="font-mono font-bold text-slate-900">{serviceRequest.citizen_nik}</span>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="text-slate-500 font-medium">Tanggal Pengajuan</span>
                                    <span className="font-bold text-slate-900 text-right">
                                        {new Date(serviceRequest.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 text-amber-900 text-sm p-6 rounded-2xl mt-8 flex items-start gap-3 print:hidden">
                                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">!</div>
                                <div>
                                    <p className="font-bold mb-1">Penting untuk Diingat</p>
                                    <p>Simpan kode tiket ini dengan baik. Tunjukkan kepada petugas desa saat mengambil dokumen Anda.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-8 print:hidden">
                                <Button onClick={handlePrint} variant="outline" className="flex-1 flex items-center justify-center gap-2 py-6 rounded-xl font-bold">
                                    <Printer className="w-5 h-5" /> Cetak Bukti
                                </Button>
                                <Link href="/layanan" className="flex-1">
                                    <Button variant="default" className="w-full flex items-center justify-center gap-2 py-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700">
                                        <ArrowLeft className="w-5 h-5" /> Kembali ke Layanan
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
