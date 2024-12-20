"use client";

// Import Plotly if you're using modulesa
import dynamic from "next/dynamic";

// Dynamically import Plotly with no SSR
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
	loading: () => <div>Loading Plot...</div>,
});

import Papa from 'papaparse';

import { useEffect, useState } from 'react';

function BoxPlotChart({ datapath }) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        console.log("BoxPlotChart component mounted with datapath:", datapath);
        
        // Fetch and parse the CSV data
        fetch(datapath)
            .then(response => response.text())
            .then(csv => {
                Papa.parse(csv, {
                    complete: (result) => {
                        // Extract columns and data
                        const columns = result.data[0].map(col => col.trim());
                        const parsedData = columns.map((_, i) => result.data.slice(1).map(row => parseFloat(row[i].trim())));
                        setColumns(columns);
                        setData(parsedData);
                    },
                    header: false
                });
            })
            .catch(error => console.error("Error loading CSV data:", error));
    }, [datapath]);

    console.log("hello", data, columns);

    return (
        <div className="w-full max-w-2xl">
            <Plot
                data={columns.map((col, index) => ({
                    y: data[index],
                    type: "box",
                    name: col,
                }))}
                layout={{
                    title: { text: "Box Plot" },
                    xaxis: { title: { text: "X Axis Label" } },
                    yaxis: { title: { text: "Y Axis Label" } },
                }}
            />
        </div>
    );
}

export { BoxPlotChart };

// Example usage:
// const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];
// createBoxPlot(sampleData, 'boxplot-container');