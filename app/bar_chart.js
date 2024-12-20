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

function BarPlotChart({ datapath }) {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [yData, setYData] = useState([]);
	const [xData, setXData] = useState([]);

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
						const yValues = parsedData.map((row) =>
							parseFloat(row[1])
						);
						setColumns(columns);
						setData(parsedData);
						setYData(yValues);
						setXData(xValues);
					},
				});
			})
			.catch((error) => console.error("Error loading CSV data:", error));
	}, [datapath]);

	console.log("hello 33", columns, yData, xData);

	return (
		<div className="w-full max-w-2xl">
			<Plot
				data={[
					{
						x: xData,
						y: yData,
						type: "bar",
					},
				]}
				layout={{ title: "Bar Chart", bargap: 0.2 }}
			/>
		</div>
	);
}

export { BarPlotChart };
