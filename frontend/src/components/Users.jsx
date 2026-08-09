import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users as UsersIcon, Trash2 } from "lucide-react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/users`
            );
            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            setDeleting(userId);
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
                { method: "DELETE" }
            );

            if (!response.ok) throw new Error("Failed to delete user");

            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300 p-6 md:p-10">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Top Header Row with Back Button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>

                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <UsersIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        Total Users: <span className="font-bold text-slate-800 dark:text-slate-200">{users.length}</span>
                    </div>
                </div>

                {/* Section Title */}
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                    All Users
                </h1>

                {/* Content States */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400">
                        <p className="animate-pulse font-medium">Loading users...</p>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-center text-red-600 dark:text-red-400 font-medium">
                        Error: {error}
                    </div>
                ) : (
                    <div className="overflow-hidden bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-700/60 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                                        <th className="px-6 py-4">Username</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Created At</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm">
                                    {users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-indigo-50/50 dark:hover:bg-slate-700/40 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                                {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    disabled={deleting === user._id}
                                                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    {deleting === user._id ? "Deleting..." : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}