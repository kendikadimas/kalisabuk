import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import SectionTitle from '@/components/SectionTitle';

interface InstitutionsProps {
    institutions: any[];
}

export default function Institutions({ institutions }: InstitutionsProps) {
    return (
        <PublicLayout>
            <Head title="Lembaga Desa" />

            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop"
                        alt="Lembaga Desa"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-emerald-950/80"></div>
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Lembaga Desa</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        Sinergi organisasi kemasyarakatan dalam membangun kemandirian dan kesejahteraan warga.
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Lembaga desa merupakan mitra pemerintah desa dalam memberdayakan masyarakat.
                            Berikut adalah lembaga-lembaga yang aktif berperan dalam berbagai bidang di Desa Kalisabuk.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {institutions.length > 0 ? (
                            institutions.map((inst) => (
                                <div key={inst.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="flex items-center gap-x-4 border-b border-slate-100 pb-4 mb-4">
                                        {inst.logo ? (
                                            <img
                                                src={`/storage/${inst.logo}`}
                                                alt={`${inst.name} Logo`}
                                                className="h-16 w-16 rounded-2xl object-cover shadow-sm border border-slate-100 bg-white"
                                            />
                                        ) : (
                                            <div className="h-14 w-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center text-emerald-600 font-bold text-2xl shadow-sm">
                                                {inst.abbreviation ? inst.abbreviation.substring(0, 2) : inst.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-lg font-bold leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors">{inst.name}</h3>
                                            <p className="text-sm font-semibold text-emerald-600 mt-1">{inst.abbreviation}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-sm leading-6 text-slate-600 line-clamp-3">{inst.description || 'Deskripsi lembaga belum tersedia secara lengkap.'}</p>

                                        {inst.leader_name && (
                                            <div className="pt-4 flex items-center gap-x-3 bg-slate-50 -mx-8 -mb-8 p-5 rounded-b-2xl mt-2 border-t border-slate-100">
                                                <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ketua Lembaga</p>
                                                    <p className="text-sm font-bold text-slate-800">{inst.leader_name}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                                <p className="text-slate-500 text-lg">Belum ada data lembaga yang ditambahkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
