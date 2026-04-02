const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
];

export default function TodoFilter({ current, onChange }) {
    return (
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl">
            {FILTERS.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer
                      ${current === key
                            ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
