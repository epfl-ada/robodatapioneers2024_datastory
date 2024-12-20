import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import Papa from "papaparse";


const RacingChartComponent = ({dataPath}) => {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [data, setData] = useState(null);
	const [currentDate, setCurrentDate] = useState(null);
	const [allDates, setAllDates] = useState([]);
	const colorMap = useRef(new Map());
	const animationFrameId = useRef(null);
	const lastUpdateTime = useRef(0);

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
        "#3e95cd",
        "#8e5ea2",
        "#3cba9f",
        "#e8c3b9",
        "#c45850",
        "#ff9f40",
	];

	useEffect(() => {
		const loadData = async () => {
			const response = await fetch(dataPath);
			const reader = response.body.getReader();
			const result = await reader.read();
			const decoder = new TextDecoder("utf-8");
			const csv = decoder.decode(result.value);

			Papa.parse(csv, {
				header: true,
				complete: (results) => {
					const dateColumns = Object.keys(results.data[0]).slice(1);
					setAllDates(dateColumns);
					setCurrentDate(dateColumns[0]);

					// Assign colors to each unique item name
					results.data.forEach((item, index) => {
						const itemName = item[Object.keys(item)[0]];
						colorMap.current.set(
							itemName,
							colors[index % colors.length]
						);
					});

					setData(results.data);
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

		// Sort data while keeping track of original items
		const sortedData = [...data]
			.map((item) => ({
				name: item[Object.keys(item)[0]],
				value: item[currentDate],
				color: colorMap.current.get(item[Object.keys(item)[0]]),
			}))
			.sort((a, b) => b.value - a.value);

		if (!chartInstance.current) {
			const ctx = chartRef.current.getContext("2d");

			chartInstance.current = new Chart(ctx, {
				type: "bar",
				data: {
					labels: sortedData.map((item) => item.name),
					datasets: [
						{
							data: sortedData.map((item) => item.value),
							backgroundColor: sortedData.map(
								(item) => item.color
							),
							borderWidth: 2,
							borderRadius: 4,
							borderColor: sortedData.map((item) => item.color),
						},
					],
				},
				options: {
					indexAxis: "y",
					animation: false,
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
								label: (context) =>
									`${context.formattedValue} units`,
							},
						},
					},
					scales: {
						x: {
							beginAtZero: true,
							grid: { display: false },
							ticks: {
								font: { size: 14 },
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
						padding: { right: 20 },
					},
				},
			});
		} else {
			chartInstance.current.data.labels = sortedData.map(
				(item) => item.name
			);
			chartInstance.current.data.datasets[0].data = sortedData.map(
				(item) => item.value
			);
			chartInstance.current.data.datasets[0].backgroundColor =
				sortedData.map((item) => item.color);
			chartInstance.current.data.datasets[0].borderColor = sortedData.map(
				(item) => item.color
			);
			chartInstance.current.options.plugins.title.text = currentDate;
			chartInstance.current.update("none");
		}
	}, [currentDate, data]);

	useEffect(() => {
		const updateFrame = (timestamp) => {
			if (isPlaying && timestamp - lastUpdateTime.current >= 100) {
				lastUpdateTime.current = timestamp;

				setCurrentDate((prevDate) => {
					const currentIndex = allDates.indexOf(prevDate);
					if (currentIndex === allDates.length - 1) {
						setIsPlaying(false);
						return prevDate;
					}
					return allDates[currentIndex + 1];
				});
			}

			if (isPlaying) {
				animationFrameId.current = requestAnimationFrame(updateFrame);
			}
		};

		if (isPlaying) {
			animationFrameId.current = requestAnimationFrame(updateFrame);
		}

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
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

export { RacingChartComponent };