import React from "react";

function HomePage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-4 p-8 bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                    Hello! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    Welcome to the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">PaperCraft Admin Panel</span>.
                </p>
            </div>
        </div>
    );
}

export default HomePage;