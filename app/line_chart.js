"use client";

// Import Plotly if you're using modulesa
import dynamic from "next/dynamic";

// Dynamically import Plotly with no SSR
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
	loading: () => <div>Loading Plot...</div>,
});

import Papa from "papaparse";
import { useEffect, useState } from "react";

function LinePlotChart({ datapath }) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        console.log("LinePlotChart component mounted with datapath:", datapath);

        // Fetch and parse the CSV data
        fetch(datapath)
            .then((response) => response.text())
            .then((csv) => {
                Papa.parse(csv, {
                    complete: (result) => {
                        // Extract columns and data
                        const columns = result.data[0].map((col) => col.trim());
                        const parsedData = result.data.slice(1).map((row) =>
                            row.map((cell) => parseFloat(cell.trim()))
                        );
                        const yValues = result.data
							.slice(1)
							.map((row) => row[0].trim());
                        setColumns(columns);
                        setData(parsedData);
                        setYData(yValues);
                    },
                    header: false,
                });
            })
            .catch((error) => console.error("Error loading CSV data:", error));
    }, [datapath]);

    console.log("hello", data, columns, yData);

    return (
        <div className="w-full max-w-2xl">
            <Plot
                data={columns.slice(1).map((col, index) => ({
                    x: yData,
                    y: data.map((row) => row[index + 1]),
                    type: "line",
                    name: `Line ${index + 1}: ${col}`,
                    // line: { color: ["#FF5733", "#33FF57", "#3357FF"][index % 3] }, // Specify your colors here
                }))}
                layout={{
                    title: { text: "Line Plot" },
                    xAxis: { title: { text: columns[0] } },
                    yAxis: { title: { text: "Values" } },
                    transition: {
                        duration: 1000,
                        easing: "cubic-in-out",
                    },
                    frame: {
                        duration: 1000,
                    },
                    responsive: true,
                }}
            />
        </div>
    );
}

export { LinePlotChart };