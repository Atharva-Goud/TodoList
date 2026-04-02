import { useState, useMemo, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast } from '../hooks/useToast';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import SearchBar from './SearchBar';
import ProgressBar from './ProgressBar';
import ToastContainer from './Toast';

export default function TodoApp({ user, onLogout }) {
    const [tasks, setTasks] = useLocalStorage('todo-tasks', []);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDark, toggleDark] = useDarkMode();
    const { toasts, addToast, removeToast } = useToast();
    const prevAllDoneRef = useRef(false);

    /* ── Task actions ── */
    const addTask = (text) => {
        setTasks((prev) => [
            ...prev,
            { id: Date.now(), text, completed: false },
        ]);
        addToast('Task added!', 'success');
    };

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((t) => {
                if (t.id === id) {
                    const next = !t.completed;
                    addToast(next ? 'Task completed!' : 'Task reopened', next ? 'info' : 'info');
                    return { ...t, completed: next };
                }
                return t;
            })
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        addToast('Task deleted', 'error');
    };

    const reorderTasks = (startIdx, endIdx) => {
        setTasks((prev) => {
            const next = [...prev];
            const [removed] = next.splice(startIdx, 1);
            next.splice(endIdx, 0, removed);
            return next;
        });
    };

    /* ── Derived data ── */
    const totalCount = tasks.length;
    const completedCount = tasks.filter((t) => t.completed).length;
    const pendingCount = totalCount - completedCount;

    const filteredTasks = useMemo(() => {
        let result = tasks;
        // filter by status
        if (filter === 'active') result = result.filter((t) => !t.completed);
        else if (filter === 'completed') result = result.filter((t) => t.completed);
        // filter by search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((t) => t.text.toLowerCase().includes(q));
        }
        return result;
    }, [tasks, filter, searchQuery]);

    /* ── Confetti on all done ── */
    useEffect(() => {
        const allDone = totalCount > 0 && completedCount === totalCount;
        if (allDone && !prevAllDoneRef.current) {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.7 } });
        }
        prevAllDoneRef.current = allDone;
    }, [totalCount, completedCount]);

    return (
        <div className="min-h-screen flex items-start justify-center px-4 py-8 sm:py-16
                    bg-gradient-to-br from-indigo-50 via-white to-purple-50
                    dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
                    transition-colors duration-300">
            <div className="w-full max-w-lg animate-fadeIn">
                {/* ── Header ── */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                            <svg className="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Task Manager
                        </h1>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">
                            Hi, {user?.email?.split('@')[0] || 'User'} 👋
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDark}
                            className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                         text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Logout */}
                        <button
                            onClick={onLogout}
                            className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                         text-gray-500 dark:text-gray-400 hover:text-red-500
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                            aria-label="Logout"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Card ── */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl
                        shadow-xl shadow-gray-200/50 dark:shadow-black/30
                        p-5 sm:p-6 flex flex-col gap-4">

                    {/* Input */}
                    <TodoInput onAdd={addTask} />

                    {/* Search */}
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />

                    {/* Progress bar */}
                    {totalCount > 0 && (
                        <ProgressBar completed={completedCount} total={totalCount} />
                    )}

                    {/* Filters */}
                    <TodoFilter current={filter} onChange={setFilter} />

                    {/* Task list */}
                    <TodoList
                        tasks={filteredTasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onReorder={reorderTasks}
                    />

                    {/* ── Stats footer ── */}
                    {totalCount > 0 && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex gap-4 text-xs">
                                <span className="text-gray-500 dark:text-gray-400">
                                    <strong className="text-gray-700 dark:text-gray-200">{totalCount}</strong> Total
                                </span>
                                <span className="text-emerald-500">
                                    <strong>{completedCount}</strong> Done
                                </span>
                                <span className="text-amber-500">
                                    <strong>{pendingCount}</strong> Pending
                                </span>
                            </div>
                            {completedCount > 0 && (
                                <button
                                    onClick={() => {
                                        setTasks((prev) => prev.filter((t) => !t.completed));
                                        addToast('Cleared completed tasks', 'error');
                                    }}
                                    className="text-xs text-red-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                                >
                                    Clear done
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Subtle footer */}
                <p className="text-center text-xs text-gray-300 dark:text-gray-600 mt-6">
                    Tasks are saved in your browser automatically.
                </p>
            </div>

            {/* Toast notifications */}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
}
