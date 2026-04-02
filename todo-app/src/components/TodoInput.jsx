import { useState } from 'react';

export default function TodoInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                   placeholder-gray-400 dark:placeholder-gray-600
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                   transition-all duration-200 text-sm"
            />
            <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
                   text-white font-medium rounded-xl shadow-md hover:shadow-lg
                   transition-all duration-200 text-sm cursor-pointer
                   hover:scale-[1.03] active:scale-[0.97]
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={!text.trim()}
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add
            </button>
        </form>
    );
}
