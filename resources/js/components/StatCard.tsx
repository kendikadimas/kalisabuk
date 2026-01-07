interface StatProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatProps) {
    return (
        <div className="bg-white overflow-hidden rounded-xl shadow-md border border-slate-100 p-6 flex items-center hover:border-emerald-200 transition-colors">
            {icon && (
                <div className="flex-shrink-0 mr-4 p-3 bg-emerald-100 rounded-lg text-emerald-600">
                    {icon}
                </div>
            )}
            <div>
                <dt className="truncate text-sm font-medium text-slate-500">{label}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{value}</dd>
            </div>
        </div>
    );
}
