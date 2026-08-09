import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Navbar from "./Navbar"

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/feedback`
                );
                if (!response.ok) throw new Error("Failed to fetch feedback");
                const data = await response.json();
                setFeedbacks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

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
                            <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            Total: <span className="font-bold text-slate-800 dark:text-slate-100">{feedbacks.length}</span>
                        </div>
                    </div>

                    {/* Section Title */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            All Feedback
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            {feedbacks.length} message{feedbacks.length !== 1 ? 's' : ''} received
                        </p>
                    </div>

                    {/* Content States */}
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 mb-4">
                                    <div className="animate-spin">
                                        <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">Loading feedback...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400 font-medium">
                            <p className="text-sm">Error loading feedback: {error}</p>
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No feedback yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {feedbacks.map((feedback) => (
                                <div
                                    key={feedback._id}
                                    className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                                        <div className="min-w-0">
                                            <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
                                                {feedback.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                                {feedback.email}
                                            </p>
                                        </div>
                                        <time className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                            {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </time>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-4">
                                        {feedback.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}