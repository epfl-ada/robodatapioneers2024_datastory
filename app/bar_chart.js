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

function BarPlotChart({ datapath, colors, barmode="group" }) {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        fetch(datapath)
            .then((response) => response.text())
            .then((csv) => {
                Papa.parse(csv, {
                    complete: (result) => {
                        const columns = result.data[0].map((col) => col.trim());
                        const parsedData = result.data
                            .slice(1)
                            .map((row) => row.map((cell) => cell.trim()));
                        const xValues = parsedData.map((row) => row[0]);
                        const yValues = columns.slice(1).map((_, colIndex) =>
                            parsedData.map((row) =>
                                parseFloat(row[colIndex + 1])
                            )
                        );
                        setColumns(columns);
                        setData(parsedData);
                        setXData(xValues);
                        setYData(yValues);
                    },
                });
            })
            .catch((error) => console.error("Error loading CSV data:", error));
    }, [datapath]);

    if (colors === undefined) {
        colors = ["#3e95cd"];
    }

    return (
        <div className="w-full max-w-2xl">
            <Plot
                data={yData.map((yValues, index) => ({
                    x: xData,
                    y: yValues,
                    type: "bar",
                    name: columns[index + 1],
                    marker: {
                        color: colors[index % colors.length],
                    },
                }))}
                layout={{
                    title: "",
                    xaxis: { title: { text: columns[0] } },
                    yaxis: { title: { text: columns[1] } },
                    bargap: 0.2,
                    barmode: barmode,
                }}
            />
        </div>
    );
}

export { BarPlotChart };
