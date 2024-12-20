import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleChart = () => {
	const svgRef = useRef(null);
	const [year, setYear] = useState(2000);

	// Sample data
	const data = [
		{ name: "Company A", year: 2000, value: 10, x: 100, y: 150 },
		{ name: "Company B", year: 2001, value: 20, x: 200, y: 200 },
		{ name: "Company C", year: 2002, value: 15, x: 300, y: 100 },
		// Add more data here
	];

	useEffect(() => {
		// Set up the chart dimensions
		const width = 800;
		const height = 600;

		// Set up the SVG container
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		// Set up the size scale for the bubbles
		const sizeScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value)])
			.range([5, 50]); // Bubble size range

		// Set up the x and y scales for positioning the bubbles
		const xScale = d3.scaleLinear().domain([0, 500]).range([0, width]);
		const yScale = d3.scaleLinear().domain([0, 500]).range([0, height]);

		// Function to update the bubbles based on the selected year
		const updateBubbles = (year) => {
			const filteredData = data.filter((d) => d.year <= year);

			// Bind data to circles
			const bubbles = svg
				.selectAll(".bubble")
				.data(filteredData, (d) => d.name);

			// Remove exiting bubbles
			bubbles.exit().remove();

			// Create new bubbles (enter phase)
			const newBubbles = bubbles
				.enter()
				.append("circle")
				.attr("class", "bubble")
				.attr("r", (d) => sizeScale(d.value))
				.attr("cx", (d) => xScale(d.x))
				.attr("cy", (d) => yScale(d.y))
				.style("fill", "steelblue")
				.style("opacity", 0.7);

			// Add labels inside the bubbles
			newBubbles
				.append("text")
				.attr("class", "label")
				.attr("x", (d) => xScale(d.x))
				.attr("y", (d) => yScale(d.y))
				.attr("dy", 5)
				.text((d) => d.name);

			// Transition for updated bubbles
			bubbles
				.merge(newBubbles)
				.transition()
				.duration(500)
				.attr("r", (d) => sizeScale(d.value))
				.attr("cx", (d) => xScale(d.x))
				.attr("cy", (d) => yScale(d.y))
				.style("fill", "steelblue")
				.style("opacity", 0.7);
		};

		// Initial call to render bubbles for the selected year
		updateBubbles(year);

		// Cleanup on unmount
		return () => {
			svg.selectAll("*").remove();
		};
	}, [year]); // Re-render when the year changes

	return (
		<div>
			<input
				type="range"
				min="2000"
				max="2020"
				step="1"
				value={year}
				onChange={(e) => setYear(Number(e.target.value))}
				className="slider"
			/>
			<span>Year: {year}</span>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export { BubbleChart };
