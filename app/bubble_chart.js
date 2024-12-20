"use client";

import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import {
	Chart,
	BubbleController,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement,
} from "chart.js";

Chart.register(
	BubbleController,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement
);

function BubbleChart() {
	const chartRef = useRef(null);

	useEffect(() => {
		const ctx = chartRef.current.getContext("2d");

		new Chart(ctx, {
			type: "bubble",
			data: {
				labels: "Africa",
				datasets: [
					{
						label: ["China"],
						backgroundColor: "rgba(255,221,50,0.2)",
						borderColor: "rgba(255,221,50,1)",
						data: [
							{
								x: 21269017,
								y: 5.245,
								r: 9,
							},
						],
					},
					{
						label: ["Denmark"],
						backgroundColor: "rgba(60,186,159,0.2)",
						borderColor: "rgba(60,186,159,1)",
						data: [
							{
								x: 258702,
								y: 7.526,
								r: 10,
							},
						],
					},
					{
						label: ["Germany"],
						backgroundColor: "rgba(0,0,0,0.2)",
						borderColor: "#000",
						data: [
							{
								x: 3979083,
								y: 6.994,
								r: 80,
							},
						],
					},
					{
						label: ["Japan"],
						backgroundColor: "rgba(193,46,12,0.2)",
						borderColor: "rgba(193,46,12,1)",
						data: [
							{
								x: 4931877,
								y: 5.921,
								r: 15,
							},
						],
					},
				],
			},
			options: {
				title: {
					display: true,
					text: "Predicted world population (millions) in 2050",
				},
				scales: {
					y: {
						title: {
							display: true,
							text: "Happiness",
						},
					},
					x: {
						title: {
							display: true,
							text: "GDP (PPP)",
						},
					},
				},
			},
		});

		// Cleanup function to destroy the chart instance
		return () => {
			if (ctx) {
				ctx.chart && ctx.chart.destroy();
			}
		};
	}, []);

	return (
		<div className="w-full max-w-2xl">
			<canvas
				id="bubble-chart"
				ref={chartRef}
				width={800}
				height={800}
			></canvas>
		</div>
	);
};

export { BubbleChart };
