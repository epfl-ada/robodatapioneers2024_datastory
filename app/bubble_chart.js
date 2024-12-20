"use client";

import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import Papa from "papaparse";
import { useEffect, useState } from "react";

function BubbleChart({ datapath, colors }) {
    const [bubbleData, setBubbleData] = useState([]);
    const [years, setYears] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        fetch(datapath)
            .then((res) => res.text())
            .then((csv) => {
                Papa.parse(csv, {
                    complete: (result) => {
                        const header = result.data[0].map((c) => c.trim());
                        const rows = result.data.slice(1).map((r) => r.map((c) => c.trim()));
                        const uniqueYears = [...new Set(rows.map((r) => r[0]))];
                        const traces = uniqueYears.map((year) => {
                            const yearData = rows.filter((row) => row[0] === year);
                            return {
                                name: year,
                                x: yearData.map((d) => parseFloat(d[1])),
                                y: yearData.map((d) => parseFloat(d[2])),
                                text: yearData.map((d) => d[3]),
                                mode: "markers",
                                marker: {
                                    size: yearData.map((d) => parseFloat(d[4])),
                                    color: colors,
                                    sizemode: "area",
                                },
                            };
                        });
                        setColumns(header);
                        setYears(uniqueYears);
                        setBubbleData(traces);
                    },
                });
            })
            .catch((err) => console.error("CSV load error:", err));
    }, [datapath, colors]);

    // Each frame corresponds to one year
    const frames = bubbleData.map((trace) => ({
        name: trace.name,
        data: [trace],
    }));

    // Create slider steps for each year
    const sliderSteps = bubbleData.map((trace, i) => ({
        label: trace.name,
        method: "animate",
        args: [
            [trace.name],
            {
                mode: "immediate",
                transition: { duration: 500 },
                frame: { duration: 500, redraw: false },
            },
        ],
    }));

    const layout = {
        title: "Animated Bubble Chart",
        xaxis: { title: columns[1] },
        yaxis: { title: columns[2] },
        showlegend: false,
        updatemenus: [
            {
                type: "buttons",
                x: 0.1,
                y: 1.15,
                xanchor: "left",
                yanchor: "top",
                showactive: false,
                buttons: [
                    {
                        label: "Play",
                        method: "animate",
                        args: [
                            null,
                            {
                                fromcurrent: true,
                                frame: { duration: 500, redraw: false },
                                transition: { duration: 500 },
                            },
                        ],
                    },
                    {
                        label: "Pause",
                        method: "animate",
                        args: [
                            [null],
                            {
                                mode: "immediate",
                                frame: { duration: 0, redraw: false },
                            },
                        ],
                    },
                ],
            },
        ],
        sliders: [
            {
                active: 0,
                steps: sliderSteps,
                x: 0.1,
                y: 0,
                len: 0.9,
            },
        ],
    };

    return (
        <div className="w-full max-w-2xl">
            <Plot
                data={[bubbleData[0]]}
                layout={layout}
                frames={frames}
                config={{ scrollZoom: false }}
                style={{ width: "100%", height: "600px" }}
            />
        </div>
    );
}

export { BubbleChart };