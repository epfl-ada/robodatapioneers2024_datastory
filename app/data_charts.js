import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Papa from "papaparse";

function TimeChartComponent() {
	const [currentYear, setCurrentYear] = useState(2000);
	const [isPlaying, setIsPlaying] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			const response = await fetch("/data.csv");
			const reader = response.body.getReader();
			const result = await reader.read();
			const decoder = new TextDecoder("utf-8");
			const csv = decoder.decode(result.value);
			
			Papa.parse(csv, {
				complete: (results) => setData(results.data.slice(1))
			});
		};
		loadData();
	}, []);

	useEffect(() => {
		let intervalId;
		if (isPlaying && data) {
			intervalId = setInterval(() => {
				setCurrentYear(year => {
					if (year >= 2023) {
						setIsPlaying(false);
						return 2000;
					}
					return year + 1;
				});
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isPlaying, data]);

	useEffect(() => {
		if (!data) return;
		
		const yearData = data.find(row => row[0] === currentYear.toString());
		if (!yearData) return;

		// Create sorted data with labels
		const sortedData = yearData.slice(1)
			.map((value, index) => ({
				value: parseFloat(value),
				label: `Column ${index + 1}`,
				color: [
					'rgba(75, 192, 192, 0.6)',
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)'
				][index]
			}))
			.sort((a, b) => b.value - a.value);

		const ctx = document.getElementById("timeChartCanvas");
		const chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: sortedData.map(d => d.label),
				datasets: [{
					data: sortedData.map(d => d.value),
					backgroundColor: sortedData.map(d => d.color)
				}]
			},
			options: {
				animation: {
					duration: 800,
					easing: 'easeInOutQuart'
				},
				scales: {
					y: {
						beginAtZero: true
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});

		return () => chart.destroy();
	}, [currentYear, data]);

	if (!data) return <LoadingSpinner />;

	return (
		<div className="w-full max-w-2xl">
			<div className="flex gap-4 mb-4">
				<button 
					onClick={() => setIsPlaying(!isPlaying)}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					{isPlaying ? 'Pause' : 'Play'}
				</button>
				<input 
					type="range" 
					min="2000" 
					max="2023" 
					value={currentYear}
					onChange={(e) => setCurrentYear(parseInt(e.target.value))}
					className="w-full"
				/>
				<span>{currentYear}</span>
			</div>
			<canvas id="timeChartCanvas"></canvas>
		</div>
	);
}

function ChartComponent() {
	useEffect(() => {
		const loadData = async () => {
			const response = await fetch("/data.csv");
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

function LoadingSpinner() {
	return (
		<div className="flex justify-center items-center">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	);
}

export { TimeChartComponent, ChartComponent, LoadingSpinner };
