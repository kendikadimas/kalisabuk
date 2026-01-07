import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { MapPin, Users, Award, Target, History } from 'lucide-react';

interface ProfileProps {
    villageInfo: any;
    institutions: any[];
}

export default function Profile({ villageInfo, institutions }: ProfileProps) {
    const breadcrumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Profil Desa' }
    ];

    // Safe access for villageInfo
    const vision = villageInfo?.vision || 'Terwujudnya Desa Kalisabuk yang Mandiri, Sejahtera, dan Berakhlak Mulia.';
    const missions = villageInfo?.mission ? villageInfo.mission.split('\n') : [
        "Mewujudkan penyelenggaraan pemerintahan desa yang transparan dan akuntabel.",
        "Meningkatkan kualitas pelayanan publik prima untuk masyarakat.",
        "Menggali dan mengembangkan potensi sumber daya alam dan ekonomi desa.",
        "Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.",
        "Melestarikan nilai-nilai sosial budaya dan kearifan lokal."
    ];
    const history = villageInfo?.history || `Nama "Kalisabuk" konon berasal dari aliran sungai yang meliuk indah mengelilingi desa layaknya sebuah sabuk pelindung. 
    Filosofi ini tertanam kuat dalam karakter masyarakatnya: melindungi sesama, mengikat persaudaraan, dan menjaga harmoni alam.`;

    return (
        <PublicLayout>
            <Head title="Profil Desa - Kalisabuk" />

            <PageHeader
                title="Tentang Kami"
                subtitle="Mengenal lebih dalam sejarah, visi misi, dan semangat gotong royong Desa Kalisabuk."
                breadcrumbs={breadcrumbs}
                image="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Quick Facts Strip */}
            <div className="bg-white relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                    <div className="p-2 group hover:-translate-y-1 transition-transform">
                        <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">120 <span className="text-lg text-emerald-500">Ha</span></span>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Luas Wilayah</span>
                    </div>
                    <div className="p-2 group hover:-translate-y-1 transition-transform">
                        <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">4.5<span className="text-lg text-emerald-500">k+</span></span>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Penduduk</span>
                    </div>
                    <div className="p-2 group hover:-translate-y-1 transition-transform">
                        <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">1830</span>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Tahun Berdiri</span>
                    </div>
                    <div className="p-2 group hover:-translate-y-1 transition-transform">
                        <span className="block text-4xl font-black text-emerald-900 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">4</span>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Dusun</span>
                    </div>
                </div>
            </div>

            {/* Visi Misi Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Visi Card */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-50 rounded-[2.5rem] transform -rotate-2 opacity-70 transition-transform group-hover:rotate-0"></div>
                            <div className="relative bg-emerald-900 rounded-[2rem] p-12 text-white shadow-2xl overflow-hidden isolate">
                                {/* Decorative BG */}
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>

                                <Target className="w-12 h-12 text-emerald-300 mb-6" />
                                <h3 className="text-xl font-bold tracking-widest text-emerald-400 mb-6 flex items-center gap-4">
                                    <span className="w-8 h-px bg-emerald-400"></span> VISI
                                </h3>
                                <blockquote className="text-3xl md:text-4xl font-serif leading-tight">
                                    "{vision}"
                                </blockquote>
                            </div>
                        </div>

                        {/* Misi List */}
                        <div className="pt-8">
                            <h3 className="text-xl font-bold tracking-widest text-emerald-900 mb-8 flex items-center gap-4">
                                <span className="w-8 h-1 bg-emerald-500"></span> MISI
                            </h3>
                            <div className="space-y-6">
                                {missions.map((misi: string, idx: number) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 text-emerald-900 flex items-center justify-center font-black text-lg border border-slate-100 group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-300">
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                        <p className="text-lg text-slate-600 leading-relaxed pt-2 font-medium group-hover:text-slate-900 transition-colors">
                                            {misi}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Sejarah Scroll Content */}
            <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Interactive Map/Image */}
                        <div className="lg:w-1/2 relative">
                            <div className="sticky top-32">
                                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.265736209581!2d109.0664673!3d-7.6545733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656d0d5718eb29%3A0x673403301a974753!2sBalai%20Desa%20Kalisabuk!5e0!3m2!1sen!2sid!4v1704070000000!5m2!1sen!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Peta Desa Kalisabuk"
                                        className="grayscale hover:grayscale-0 transition-all duration-700"
                                    ></iframe>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                                <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                            </div>
                        </div>

                        {/* History Article */}
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-6">
                                <History className="w-4 h-4" />
                                Jejak Langkah
                            </div>
                            <h2 className="text-4xl font-black font-serif text-slate-900 mb-8 leading-tight">
                                Sejarah Panjang <br /><span className="text-emerald-700">Bumi Kalisabuk.</span>
                            </h2>

                            <div className="prose prose-lg prose-emerald text-slate-500 font-normal leading-loose">
                                <p>
                                    Desa Kalisabuk memiliki akar sejarah yang kuat, tumbuh dari semangat para leluhur yang membabat alas dengan gotong royong.
                                    Terletak strategis di wilayah yang subur, desa ini telah menjadi pusat kehidupan agraris sejak masa lampau.
                                </p>
                                <p>
                                    {history}
                                </p>
                                <div className="my-10 pl-6 border-l-4 border-emerald-500 italic text-slate-700 text-xl font-serif">
                                    "Warisan terbesarnya bukanlah tanah yang subur, melainkan semangat guyub rukun yang tak lekang oleh zaman."
                                </div>
                                <p>
                                    Kini, Kalisabuk bertransformasi menjadi desa modern yang adaptif. Memadukan kearifan lokal dengan inovasi digital untuk
                                    memberikan pelayanan terbaik bagi warganya.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Structure Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-black font-serif text-slate-900 mb-16">Struktur Pemerintahan</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* This would be dynamically mapped ideally */}
                        {[
                            { name: 'H. Ahmad Sudarsono', role: 'Kepala Desa', color: 'bg-emerald-900' },
                            { name: 'Budi Santoso', role: 'Sekretaris Desa', color: 'bg-slate-800' },
                            { name: 'Siti Aminah', role: 'Kaur Keuangan', color: 'bg-slate-700' },
                        ].map((person, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl bg-slate-50 p-8 hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                                <div className={`w-24 h-24 mx-auto ${person.color} rounded-full flex items-center justify-center text-white text-3xl font-bold font-serif mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {person.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                                <p className="text-emerald-600 font-medium text-sm tracking-widest uppercase">{person.role}</p>
                            </div>
                        ))}
                    </div>

                    <button className="mt-12 px-8 py-3 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-emerald-900 transition-colors">
                        Lihat Struktur Lengkap
                    </button>
                </div>
            </section>

        </PublicLayout>
    );
}
