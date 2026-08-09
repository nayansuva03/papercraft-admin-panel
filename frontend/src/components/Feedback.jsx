import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

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
                        <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        Total Feedback: <span className="font-bold text-slate-800 dark:text-slate-200">{feedbacks.length}</span>
                    </div>
                </div>

                {/* Section Title */}
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                    All Feedback
                </h1>

                {/* Content States */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400">
                        <p className="animate-pulse font-medium">Loading feedback...</p>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-center text-red-600 dark:text-red-400 font-medium">
                        Error: {error}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {feedbacks.map((feedback) => (
                            <div
                                key={feedback._id}
                                className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-200 space-y-3"
                            >
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-800 dark:text-white">
                                            {feedback.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {feedback.email}
                                        </p>
                                    </div>
                                    <span className="self-start sm:self-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-3 py-1 rounded-full border border-slate-200/50 dark:border-slate-600/40">
                                        {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {feedback.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}