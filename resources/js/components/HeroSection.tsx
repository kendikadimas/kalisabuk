import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const images = [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000"
];

interface HeroSectionProps {
    slides?: any[];
}

const defaultSlides = [
    { image_path: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop" },
    { image_path: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000" },
    { image_path: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000" },
    { image_path: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000" }
];

export default function HeroSection({ slides }: HeroSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const heroSlides = slides && slides.length > 0 ? slides : defaultSlides;

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex, heroSlides]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1));
    };

    const currentSlide = heroSlides[currentIndex];

    // Helper to get image URL
    const getImageUrl = (path: string) => {
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Images with Fade Transition */}
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={getImageUrl(slide.image_path)}
                        alt={slide.title || `Slide ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for Text Readability - Includes Top Gradient for Navbar */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent h-32"></div>
                </div>
            ))}

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        Website Resmi Desa
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black font-serif text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl">
                        {currentSlide.title ? (
                            <span>{currentSlide.title}</span>
                        ) : (
                            <>
                                Maju Bersama <br />
                                <span className="text-white underline decoration-emerald-500 decoration-4 underline-offset-4">Desa Kalisabuk.</span>
                            </>
                        )}
                    </h1>

                    <p className="text-lg md:text-xl text-white mb-10 leading-relaxed max-w-xl font-normal drop-shadow-md">
                        {currentSlide.subtitle || "Pusat informasi pemerintahan, pelayanan publik, dan potensi desa yang transparan, akuntabel, dan inovatif."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#news"
                            className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-sm tracking-wide hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 hover:-translate-y-1 text-center"
                        >
                            Jelajahi Berita
                        </a>
                        <a
                            href="/profile"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-sm tracking-wide hover:bg-white/20 transition-all shadow-sm hover:shadow-md text-center"
                        >
                            Profil Desa
                        </a>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-10 left-0 right-0 z-20 px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-end">
                {/* Dots Indicators */}
                <div className="flex gap-2 mb-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex gap-4">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all group"
                        aria-label="Previous Slide"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all group"
                        aria-label="Next Slide"
                    >
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
