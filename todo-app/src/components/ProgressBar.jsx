export default function ProgressBar({ completed, total }) {
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Progress</span>
                <span className="text-indigo-500 dark:text-indigo-400 font-bold">{pct}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}
