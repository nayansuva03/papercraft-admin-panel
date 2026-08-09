import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users as UsersIcon, Trash2 } from "lucide-react";
import Navbar from "./Navbar"

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <div className="p-6 md:p-10">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Header Row with Back Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <button
                            onClick={() => navigate("/")}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </button>

                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <UsersIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            Total: <span className="font-bold text-slate-800 dark:text-slate-100">{users.length}</span>
                        </div>
                    </div>

                    {/* Section Title */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            All Users
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            {users.length} user{users.length !== 1 ? 's' : ''} registered
                        </p>
                    </div>

                    {/* Content States */}
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 mb-4">
                                    <div className="animate-spin">
                                        <UsersIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Loading users...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400 font-medium">
                            <p className="text-sm">Error loading users: {error}</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-12">
                            <UsersIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No users yet</p>
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                                Joined
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {users.map((user) => (
                                            <tr
                                                key={user._id}
                                                className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors duration-150"
                                            >
                                                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        disabled={deleting === user._id}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
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
        </div>
    );
}