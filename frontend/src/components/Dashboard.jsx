import { useEffect, useState } from "react";
import { Cloud, Zap, BarChart3, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Navbar from "./Navbar";

function Dashboard() {
    const [cloudinaryStats, setCloudinaryStats] = useState(null);
    const [geminiStats, setGeminiStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function formatBytes(bytes) {
        if (bytes === 0) return "0 Bytes";
        const units = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const value = bytes / Math.pow(1024, i);
        return `${value.toFixed(2)} ${units[i]}`;
    }

    useEffect(() => {
        async function getCloudinaryStats() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/cloudinary/stats`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch Cloudinary stats");
                }
                const data = await response.json();
                setCloudinaryStats(data);
            } catch (error) {
                console.error("Cloudinary stats error:", error);
                setError(error.message);
            }
        }

        async function getGeminiStats() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/gemini/stats`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch Gemini stats");
                }
                const data = await response.json();
                setGeminiStats(data);
            } catch (error) {
                console.error("Gemini stats error:", error);
                setError(error.message);
            }
        }

        Promise.all([getCloudinaryStats(), getGeminiStats()]).finally(() => setLoading(false));
    }, []);

    // Prepare data for charts
    const cloudinaryChartData = cloudinaryStats ? [
        { name: "Storage", value: cloudinaryStats.storage, fill: "#4f46e5" },
        { name: "Bandwidth", value: cloudinaryStats.bandwidth, fill: "#06b6d4" },
    ] : [];

    const geminiChartData = geminiStats ? [
        { name: "Input Tokens", value: geminiStats.inputTokens, fill: "#8b5cf6" },
        { name: "Output Tokens", value: geminiStats.outputTokens, fill: "#ec4899" },
    ] : [];

    const tokenComparison = geminiStats ? [
        {
            metric: "Input",
            tokens: geminiStats.inputTokens,
        },
        {
            metric: "Output",
            tokens: geminiStats.outputTokens,
        },
    ] : [];

    const COLORS = ["#4f46e5", "#06b6d4", "#8b5cf6", "#ec4899"];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <div className="p-6 md:p-10">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Page Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            Dashboard
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                            Real-time API usage and performance metrics
                        </p>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400 font-medium">
                            <p className="text-sm">Error loading dashboard: {error}</p>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 mb-4">
                                    <div className="animate-spin">
                                        <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Loading dashboard...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">

                            {/* Cloudinary Section */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cloudinary</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Stats Cards */}
                                    <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Storage Used</span>
                                                <span className="text-lg font-bold text-slate-900 dark:text-white">{formatBytes(cloudinaryStats.storage)}</span>
                                            </div>
                                            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Bandwidth Used</span>
                                                <span className="text-lg font-bold text-slate-900 dark:text-white">{formatBytes(cloudinaryStats.bandwidth)}</span>
                                            </div>
                                            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Requests</span>
                                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{cloudinaryStats.requests.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Transformations</span>
                                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{cloudinaryStats.transformations.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pie Chart for Storage vs Bandwidth */}
                                    <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center min-h-72">
                                        <ResponsiveContainer width="100%" height={280}>
                                            <PieChart>
                                                <Pie
                                                    data={cloudinaryChartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, value }) => `${name}: ${formatBytes(value)}`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {cloudinaryChartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => formatBytes(value)} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </section>

                            {/* Gemini Section */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gemini API</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Stats Cards */}
                                    <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Input Tokens</span>
                                                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{geminiStats.inputTokens.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Output Tokens</span>
                                                <span className="text-lg font-bold text-pink-600 dark:text-pink-400">{geminiStats.outputTokens.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Tokens</span>
                                                <span className="text-lg font-bold text-slate-900 dark:text-white">{geminiStats.totalTokens.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Errors</span>
                                                <span className={`text-lg font-bold ${geminiStats.errors > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                                    {geminiStats.errors}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bar Chart for Token Comparison */}
                                    <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center min-h-72">
                                        <ResponsiveContainer width="100%" height={280}>
                                            <BarChart data={tokenComparison}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                <XAxis dataKey="metric" stroke="#64748b" />
                                                <YAxis stroke="#64748b" />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: "#1e293b",
                                                        border: "1px solid #475569",
                                                        borderRadius: "6px"
                                                    }}
                                                    labelStyle={{ color: "#e2e8f0" }}
                                                />
                                                <Legend />
                                                <Bar dataKey="tokens" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </section>

                            {/* Summary Stats */}
                            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Total Requests</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{cloudinaryStats.requests.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Transformations</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{cloudinaryStats.transformations.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Total Tokens</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{geminiStats.totalTokens.toLocaleString()}</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">API Errors</p>
                                    <p className={`text-2xl font-bold mt-1 ${geminiStats.errors > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                        {geminiStats.errors}
                                    </p>
                                </div>
                            </section>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Dashboard;