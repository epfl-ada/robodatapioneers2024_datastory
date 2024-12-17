import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import Papa from "papaparse";

const RacingChartComponent = () => {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [data, setData] = useState(null);
	const [currentDate, setCurrentDate] = useState(null);
	const [allDates, setAllDates] = useState([]);
	const colorMap = useRef({});

	const colors = [
		"#3e95cd",
		"#8e5ea2",
		"#3cba9f",
		"#e8c3b9",
		"#c45850",
		"#ff9f40",
		"#4bc0c0",
		"#36a2eb",
		"#ff6384",
		"#9966ff",
	];

	useEffect(() => {
		const loadData = async () => {
			const response = await fetch("./time_data.csv");
			const reader = response.body.getReader();
			const result = await reader.read();
			const decoder = new TextDecoder("utf-8");
			const csv = decoder.decode(result.value);

			Papa.parse(csv, {
				header: true,
				complete: (results) => {
					const dateColumns = Object.keys(results.data[0]).filter(
						(key) => key !== "country"
					);
					setAllDates(dateColumns);
					setCurrentDate(dateColumns[0]);
					setData(results.data);

					results.data.forEach((item, index) => {
						colorMap.current[item.country] =
							colors[index % colors.length];
					});
				},
			});
		};

		loadData();

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, []);

	useEffect(() => {
		if (!data || !currentDate) return;

		const sortedData = [...data].sort(
			(a, b) => b[currentDate] - a[currentDate]
		);

		if (!chartInstance.current) {
			const ctx = chartRef.current.getContext("2d");

			chartInstance.current = new Chart(ctx, {
				type: "bar",
				data: {
					labels: sortedData.map((item) => item.country),
					datasets: [
						{
							data: sortedData.map((item) => item[currentDate]),
							backgroundColor: sortedData.map(
								(item) => colorMap.current[item.country]
							),
							borderWidth: 2,
							borderRadius: 4,
							borderColor: sortedData.map(
								(item) => colorMap.current[item.country]
							),
						},
					],
				},
				options: {
					indexAxis: "y",
					animation: {
						duration: 1000,
						easing: "easeInOutQuart",
					},
					transitions: {
						active: {
							animation: {
								duration: 1000,
							},
						},
					},
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: { display: false },
						title: {
							display: true,
							text: currentDate,
							font: { size: 24, weight: "bold" },
							padding: 20,
							color: "#333",
						},
						tooltip: {
							callbacks: {
								label: (context) => {
									return `${context.formattedValue} units`;
								},
							},
						},
					},
					scales: {
						x: {
							beginAtZero: true,
							grid: { display: false },
							ticks: {
								font: {
									size: 14,
								},
								color: "#666",
							},
						},
						y: {
							grid: { display: false },
							ticks: {
								font: {
									size: 14,
									weight: "bold",
								},
								color: "#333",
							},
						},
					},
					layout: {
						padding: {
							right: 20,
						},
					},
				},
			});
		} else {
			chartInstance.current.data.labels = sortedData.map(
				(item) => item.country
			);
			chartInstance.current.data.datasets[0].data = sortedData.map(
				(item) => item[currentDate]
			);
			chartInstance.current.data.datasets[0].backgroundColor =
				sortedData.map((item) => colorMap.current[item.country]);
			chartInstance.current.data.datasets[0].borderColor = sortedData.map(
				(item) => colorMap.current[item.country]
			);
			chartInstance.current.options.plugins.title.text = currentDate;
			chartInstance.current.update("default");
		}
	}, [currentDate, data]);

	useEffect(() => {
		let interval;
		if (isPlaying) {
			interval = setInterval(() => {
				setCurrentDate((prevDate) => {
					const currentIndex = allDates.indexOf(prevDate);
					if (currentIndex === allDates.length - 1) {
						setIsPlaying(false);
						return prevDate;
					}
					return allDates[currentIndex + 1];
				});
			}, 2000);
		}
		return () => clearInterval(interval);
	}, [isPlaying, allDates]);

	const handleReset = () => {
		setIsPlaying(false);
		setCurrentDate(allDates[0]);
	};

	return (
		<div className="w-full max-w-4xl mx-auto p-4">
			<div className="bg-white rounded-lg shadow-lg p-4 h-[600px] mb-8">
				<canvas ref={chartRef}></canvas>
			</div>
	
			<div className="mb-4 flex justify-center gap-4">
				<button
					onClick={() => setIsPlaying(!isPlaying)}
					className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
				>
					{isPlaying ? "⏸ Pause" : "▶ Play"}
				</button>
				<button
					onClick={handleReset}
					className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
				>
					↺ Reset
				</button>
			</div>
		</div>
	);
};

function ChartComponent() {
	useEffect(() => {
		const loadData = async () => {
			const response = await fetch("./data.csv");
			const reader = response.body.getReader();
			const result = await reader.read();
			const decoder = new TextDecoder("utf-8");
			const csv = decoder.decode(result.value);

			Papa.parse(csv, {
				complete: (results) => {
					const data = results.data.slice(1);
					const labels = data.map((row) => row[0]);
					const datasets = [];
					const colors = [
						"rgb(75, 192, 192)",
						"rgb(255, 99, 132)",
						"rgb(54, 162, 235)",
						"rgb(255, 206, 86)",
					];

					for (let i = 1; i < data[0].length; i++) {
						datasets.push({
							label: `Column ${i}`,
							data: data.map((row) => parseFloat(row[i])),
							borderColor:
								colors[i - 1] || `hsl(${i * 30}, 70%, 50%)`,
							tension: 0.1,
							animation: {
								duration: 2000,
								easing: "easeInOutQuart",
							},
						});
					}

					const ctx = document.getElementById("chartCanvas");
					new Chart(ctx, {
						type: "line",
						data: {
							labels: labels,
							datasets: datasets,
						},
						options: {
							plugins: {
								legend: {
									display: true,
									position: "top",
								},
							},
							scales: {
								x: {
									title: {
										display: true,
										text: "X Axis Label",
									},
								},
								y: {
									title: {
										display: true,
										text: "Y Axis Label",
									},
								},
							},
						},
					});
				},
			});
		};

		loadData();
	}, []);

	return (
		<div className="w-full max-w-2xl">
			<canvas id="chartCanvas"></canvas>
		</div>
	);
}

function BubbleChartComponent() {
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

function LoadingSpinner() {
	return (
		<div className="flex justify-center items-center">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	);
}

export { RacingChartComponent, ChartComponent, LoadingSpinner, BubbleChartComponent };
