"use client";

// Import Plotly if you're using modulesa
import Plot from "react-plotly.js";
import Papa from 'papaparse';

import { useEffect } from 'react';

function BoxPlotChart({ datapath }) {
    useEffect(() => {
        console.log("BoxPlotChart component mounted is", datapath);
    }, [datapath]);
    return (
        <div className="w-full max-w-2xl">
            <Plot
                data={[
                    {
                        y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20],
                        type: "box",
                    },
                ]}
                layout={{
                    title: { text: "Box Plot" },
                }}
            />
        </div>
    );
}

export { BoxPlotChart };

// Example usage:
// const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];
// createBoxPlot(sampleData, 'boxplot-container');