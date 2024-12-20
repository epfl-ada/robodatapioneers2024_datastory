"use client";

// Import Plotly if you're using modules
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";

// Dynamically import Plotly with no SSR
const Plot = dynamic(() => import("react-plotly.js"), {
    ssr: false,
    loading: () => <div>Loading Plot...</div>,
});

const SankeyChart = ({ dataPath }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log("SankeyChart component mounted with dataPath:", dataPath);
        fetch(dataPath)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
            })
            .catch((error) => {
                console.error("Error loading Sankey data:", error);
            });
    }, [dataPath]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
		<div className="sankey-chart">
			<Plot
				data={data.data}
				layout={data.layout}
				config={data.config || {}} // Optional configuration
                frames={data.frames || []} // Optional animation frames
			/>
		</div>
	);
};

export { SankeyChart };
