export default function TodoItem({ task, onToggle, onDelete, dragHandleProps }) {
    return (
        <div
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl border
                  transition-all duration-200
                  ${task.completed
                    ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20'
                }`}
        >
            {/* Drag handle */}
            <span
                {...dragHandleProps}
                className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600
                   hover:text-gray-400 dark:hover:text-gray-500 transition-colors duration-150"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
                </svg>
            </span>

            {/* Checkbox */}
            <button
                onClick={() => onToggle(task.id)}
                className={`flex items-center justify-center w-5 h-5 rounded-full border-2
                    transition-all duration-200 cursor-pointer flex-shrink-0
                    hover:scale-110 active:scale-95
                    ${task.completed
                        ? 'bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-200 dark:shadow-emerald-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                    }`}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
                {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            {/* Task text */}
            <span
                className={`flex-1 text-sm transition-all duration-200
                    ${task.completed
                        ? 'line-through text-gray-400 dark:text-gray-500'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
            >
                {task.text}
            </span>

            {/* Delete button */}
            <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg
                   text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                   transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Delete task"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
}
