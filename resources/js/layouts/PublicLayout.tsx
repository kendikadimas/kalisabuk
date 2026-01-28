import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Menu, X, Facebook, Instagram, Youtube, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

interface PublicLayoutProps {
    title?: string;
    headerStyle?: 'light' | 'dark'; // 'light' means light content (for dark backgrounds), 'dark' means dark content (for light backgrounds)
    forceBackground?: boolean;
}

export default function PublicLayout({ children, headerStyle = 'light', forceBackground = false }: PropsWithChildren<PublicLayoutProps>) {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isLightHeader = headerStyle === 'light';
    const isScrolled = scrolled || forceBackground;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white flex flex-col">
            {/* Navbar - Sticky Glassmorphic */}
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled ? 'w-10 h-10 bg-primary text-white shadow-emerald-900/20 shadow-lg' : 'w-12 h-12 bg-white text-emerald-900 shadow-xl'
                                }`}>
                                <span className="font-serif font-black text-xl">D</span>
                            </div>
                            <Link href="/" className="flex flex-col group">
                                <span className={`text-xl font-bold tracking-tight leading-none font-serif transition-colors ${isScrolled
                                    ? 'text-slate-900'
                                    : (isLightHeader ? 'text-white lg:drop-shadow-md' : 'text-slate-900')
                                    }`}>
                                    Desa Kalisabuk
                                </span>
                                <span className={`text-xs font-medium tracking-wide uppercase transition-colors ${isScrolled
                                    ? 'text-emerald-700'
                                    : (isLightHeader ? 'text-emerald-100 lg:text-emerald-50' : 'text-emerald-700')
                                    }`}>
                                    Kabupaten Cilacap
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className={`flex items-center space-x-1 rounded-full px-4 py-2 backdrop-blur-sm border transition-all ${isScrolled ? 'bg-white/5 border-slate-200/50' : 'bg-white/10 border-white/10'}`}>
                                <NavLink href="/" active={url === '/'} scrolled={isScrolled} isLightHeader={isLightHeader}>Beranda</NavLink>
                                <NavLink href="/profile" active={url.startsWith('/profile')} scrolled={isScrolled} isLightHeader={isLightHeader}>Profil</NavLink>
                                <NavLink href="/potentials" active={url.startsWith('/potentials')} scrolled={isScrolled} isLightHeader={isLightHeader}>Potensi</NavLink>
                                <NavLink href="/pembangunan" active={url.startsWith('/pembangunan')} scrolled={isScrolled} isLightHeader={isLightHeader}>Pembangunan</NavLink>
                                <NavLink href="/layanan" active={url.startsWith('/layanan')} scrolled={isScrolled} isLightHeader={isLightHeader}>Layanan</NavLink>
                                <NavLink href="/data" active={url.startsWith('/data')} scrolled={isScrolled} isLightHeader={isLightHeader}>Data</NavLink>
                                <NavLink href="/news" active={url.startsWith('/news')} scrolled={isScrolled} isLightHeader={isLightHeader}>Berita</NavLink>
                            </div>
                        </div>

                        {/* CTA / Mobile Toggle */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block">
                                <Link
                                    href="/login"
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isScrolled
                                        ? 'bg-emerald-900 text-white hover:bg-emerald-800'
                                        : 'bg-white text-emerald-900 hover:bg-emerald-50'
                                        }`}
                                >
                                    Login
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className={`p-2 rounded-lg transition-colors ${isScrolled
                                        ? 'text-slate-900 hover:bg-slate-100'
                                        : (isLightHeader ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-emerald-50')
                                        }`}
                                >
                                    <span className="sr-only">Open menu</span>
                                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-2xl h-screen animate-in slide-in-from-top-4 duration-200">
                        <div className="space-y-1 px-4 py-6">
                            <MobileNavLink href="/" active={url === '/'}>Beranda</MobileNavLink>
                            <MobileNavLink href="/profile" active={url.startsWith('/profile')}>Profil</MobileNavLink>
                            <MobileNavLink href="/potentials" active={url.startsWith('/potentials')}>Potensi</MobileNavLink>
                            <MobileNavLink href="/pembangunan" active={url.startsWith('/pembangunan')}>Pembangunan</MobileNavLink>
                            <MobileNavLink href="/layanan" active={url.startsWith('/layanan')}>Layanan</MobileNavLink>
                            <MobileNavLink href="/data" active={url.startsWith('/data')}>Data</MobileNavLink>
                            <MobileNavLink href="/news" active={url.startsWith('/news')}>Berita</MobileNavLink>
                            <div className="pt-4 mt-4 border-t border-slate-100">
                                <Link
                                    href="/login"
                                    className="block w-full text-center px-4 py-3 rounded-xl bg-emerald-900 text-white font-bold shadow-lg shadow-emerald-900/20"
                                >
                                    Masuk Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer - Mega Footer */}
            <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 relative overflow-hidden">
                {/* Decorative BG */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl text-red-500"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
                    <div className="col-span-1 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-black font-serif text-xl">
                                D
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight font-serif">Desa Kalisabuk</span>
                        </div>
                        <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
                            Mewujudkan masyarakat Desa Kalisabuk yang mandiri, sejahtera, dan berakhlak mulia melalui pelayanan publik yang transparan dan inovatif.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <SocialLink href="#" icon={<Facebook size={20} />} label="Facebook" />
                            <SocialLink href="#" icon={<Instagram size={20} />} label="Instagram" />
                            <SocialLink href="#" icon={<Youtube size={20} />} label="Youtube" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 font-serif text-lg">Jelajahi</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/profile">Profil Desa</FooterLink>
                            <FooterLink href="/potentials">Potensi Lokal</FooterLink>
                            <FooterLink href="/news">Kabar Desa</FooterLink>
                            <FooterLink href="/data">Data Statistik</FooterLink>
                            <FooterLink href="/services">Layanan Online</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 font-serif text-lg">Hubungi Kami</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Jl. Raya Kalisabuk No. 1, Kec. Kesugihan, Kab. Cilacap, Jawa Tengah</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>(0282) 123-4567</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>admin@kalisabuk.desa.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Pemerintah Desa Kalisabuk. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm font-medium">
                        <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function NavLink({ href, active, children, scrolled, isLightHeader }: { href: string; active: boolean; children: React.ReactNode; scrolled: boolean; isLightHeader: boolean }) {
    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${active
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : scrolled
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    : (isLightHeader ? 'text-slate-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800')
                }`}
        >
            {children}
        </Link>
    );
}

const MobileNavLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => (
    <Link
        href={href}
        className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${active
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
    >
        {children}
    </Link>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <Link href={href} className="flex items-center gap-2 hover:text-emerald-400 transition-colors group">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a
        href={href}
        aria-label={label}
        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
    >
        {icon}
    </a>
)

