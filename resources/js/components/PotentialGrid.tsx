import { ArrowRight, MapPin, Phone } from 'lucide-react';

interface Potential {
    id: number;
    name: string;
    category: string;
    description: string;
    image_path?: string;
    location?: string;
    contact_info?: string;
}

export default function PotentialGrid({ items }: { items: Potential[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {items.map((item) => (
                <div key={item.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-1">
                    {/* Image Area */}
                    <div className="relative h-72 w-full overflow-hidden">
                        <img
                            src={item.image_path ? `/storage/${item.image_path}` : 'https://placehold.co/800x600/022c22/ffffff?text=Potensi+Desa'}
                            alt={item.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm border border-emerald-100">
                                {item.category}
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-2xl font-black font-serif text-slate-900 mb-2 leading-tight group-hover:text-emerald-800 transition-colors">
                                {item.name}
                            </h3>
                            <div className="space-y-1">
                                {item.location && (
                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                        <MapPin className="w-4 h-4 text-emerald-500" />
                                        <span>{item.location}</span>
                                    </div>
                                )}
                                {item.contact_info && (
                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                        <Phone className="w-4 h-4 text-blue-500" />
                                        <span>{item.contact_info}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed flex-grow">
                            {item.description}
                        </p>

                        <div className="pt-6 border-t border-slate-100 mt-auto">
                            <button className="flex items-center gap-2 text-sm font-bold text-emerald-700 group/btn transition-colors">
                                <span className="underline decoration-2 decoration-transparent group-hover/btn:decoration-emerald-700 transition-all">Pelajari Selengkapnya</span>
                                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
