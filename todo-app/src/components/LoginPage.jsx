import { useState } from 'react';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }
        onLogin({ email: email.trim() });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="w-full max-w-sm animate-fadeIn">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Sign in to your Task Manager</p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 p-6 flex flex-col gap-4"
                >
                    {error && (
                        <div className="text-red-500 text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            placeholder="you@example.com"
                            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                         text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                         transition-all duration-200 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="••••••••"
                            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                         text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                         transition-all duration-200 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
                       text-white font-medium rounded-xl shadow-md hover:shadow-lg
                       transition-all duration-200 text-sm cursor-pointer
                       hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-xs text-gray-300 dark:text-gray-600 mt-6">
                    Use any email & password to continue.
                </p>
            </div>
        </div>
    );
}
