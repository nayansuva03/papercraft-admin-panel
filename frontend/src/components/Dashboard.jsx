import { useEffect, useState } from "react";

function Dashboard() {

    const [cloudinaryStats, setCloudinaryStats] = useState(null);

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
                const response = await fetch("http://localhost:5000/cloudinary/stats");

                if (!response.ok) {
                    throw new Error("Failed to fetch Cloudinary stats");
                }

                const data = await response.json();

                setCloudinaryStats(data);

            } catch (error) {
                console.error("Cloudinary stats error:", error);
            }
        }

        getCloudinaryStats();
    }, []);


    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Dashboard
            </h1>


            {/* Cloudinary */}
            <section className="mb-8">

                <h2 className="text-xl font-semibold mb-3">
                    Cloudinary
                </h2>

                <div className="border rounded-lg p-4">

                    {cloudinaryStats ? (
                        <>
                            <p>
                                Storage Used: {formatBytes(cloudinaryStats.storage)}
                            </p>

                            <p>
                                Bandwidth Used: {formatBytes(cloudinaryStats.bandwidth)}
                            </p>

                            <p>
                                Requests: {cloudinaryStats.requests}
                            </p>

                            <p>
                                Transformations: {cloudinaryStats.transformations}
                            </p>
                        </>
                    ) : (
                        <p>Loading Cloudinary stats...</p>
                    )}

                </div>

            </section>


            {/* Gemini */}
            <section className="mb-8">

                <h2 className="text-xl font-semibold mb-3">
                    Gemini
                </h2>

                <div className="border rounded-lg p-4">
                    <p>Input Tokens: --</p>
                    <p>Output Tokens: --</p>
                    <p>Total Tokens: --</p>
                    <p>Errors: --</p>
                </div>

            </section>

        </div>
    );
}

export default Dashboard;