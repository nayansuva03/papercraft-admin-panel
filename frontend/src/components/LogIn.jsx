import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const envUsername = import.meta.env.VITE_LOGIN_USERNAME;
    const envPassword = import.meta.env.VITE_LOGIN_PASSWORD;

    const handleLogin = (e) => {
        e.preventDefault();
       
        if (username === envUsername && password === envPassword) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate("/");
        } else {
            alert("Wrong username or password");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full p-8 bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-6 text-center">

                {/* Header */}
                <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                        Admin Login
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Log In to access the <span className="text-indigo-600 dark:text-indigo-400 font-medium">PaperCraft Admin Panel</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm text-center"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm text-center"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 mt-2 font-semibold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-[0.98] rounded-xl shadow-sm transition-all duration-200 text-sm"
                    >
                        Log In
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Login;