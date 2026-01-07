interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: Props) {
    return (
        <div className={`text-center mb-12 ${className}`}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-lg leading-8 text-slate-600">
                    {subtitle}
                </p>
            )}
            <div className="mt-4 h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
        </div>
    );
}
