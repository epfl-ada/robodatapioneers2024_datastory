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

function HeatMapChart({ datapath }) {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [yData, setYData] = useState([]);
	useEffect(() => {
		Papa.parse(datapath, {
			download: true,
			header: true,
			complete: (results) => {
				const parsedData = results.data;
				const cols = Object.keys(parsedData[0]);
				setColumns(cols);

				const yValues = cols.map((col) =>
					parsedData.map((row) => parseFloat(row[col]))
				);
				setYData(yValues);
			},
		});
	}, [datapath]);

	const heatmapData = [
		{
			z: yData,
            x: columns,
            y: columns,
			type: "heatmap",
			colorscale: "Viridis",
		},
	];

	return (
		<div className="w-full max-w-2xl">
			<Plot data={heatmapData} layout={{ title: "Heatmap" }} />
		</div>
	);
}

export { HeatMapChart };
