import { Link } from '@inertiajs/react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    image?: string;
    breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function PageHeader({ title, subtitle, image, breadcrumbs }: PageHeaderProps) {
    return (
        <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10 h-full w-full object-cover">
                {image ? (
                    <img
                        src={image}
                        alt=""                        loading="lazy"                        className="h-full w-full object-cover opacity-30"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 opacity-90" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* Decorative Patterns */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    {/* Breadcrumbs */}
                    {breadcrumbs && (
                        <nav className="flex mb-6" aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-2">
                                <li>
                                    <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                                        <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117.414 11H16v5a2 2 0 01-2 2h-4a2 2 0 01-2-2v-5H7.414l-.707.707a1 1 0 01-1.414-1.414l7-7z" clipRule="evenodd" />
                                        </svg>
                                        <span className="sr-only">Home</span>
                                    </Link>
                                </li>
                                {breadcrumbs.map((item, index) => (
                                    <li key={index}>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 flex-shrink-0 text-slate-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {item.href ? (
                                                <Link href={item.href} className="ml-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                                            ) : (
                                                <span className="ml-2 text-sm font-medium text-emerald-400">{item.label}</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}

                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl font-serif">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
