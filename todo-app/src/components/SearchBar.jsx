export default function SearchBar({ value, onChange }) {
    return (
        <div className="relative">
            <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search tasks…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                   placeholder-gray-400 dark:placeholder-gray-600
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                   transition-all duration-200 text-sm"
            />
        </div>
    );
}
