const typeStyles = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-indigo-500',
};

const typeIcons = {
    success: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    info: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
    ),
};

export default function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg
                      animate-slideIn cursor-pointer hover:scale-105 transition-transform duration-150
                      ${typeStyles[toast.type] || typeStyles.info}`}
                    onClick={() => onRemove(toast.id)}
                >
                    {typeIcons[toast.type] || typeIcons.info}
                    {toast.message}
                </div>
            ))}
        </div>
    );
}
