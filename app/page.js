"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
	LoadingSpinner,
	ChartComponent,
	BubbleChartComponent,
} from "./data_charts.js";
import { BoxPlotChart } from "./box_plot_chart.js";
import { LinePlotChart } from "./line_chart.js";
import { BarPlotChart } from "./bar_chart.js";
import { RacingChartComponent } from "./racing_chart.js"
import { HeatMapChart } from "./heatmap.js";
import { NavBar } from "./nav.js";
import { Footer, LandingPage } from "./home_layout.js";
import { IframeChart } from "./iframe_charts.js";
import { BubbleChart } from "./bubble_chart.js";

function SubTitleText({ title, text }) {
	return (
		<div className="flex flex-col space-y-2 p-4 max-w-4xl">
			<h2 className="text-2xl font-bold mb-2">{title}</h2>
			<p className="text-lg">{text}</p>
		</div>
	);
}

function VariableChooserComponent({ Title, variables, children }) {
    const [selectedVariable, setSelectedVariable] = useState(
        variables[0].datapath
    );

    const handleChange = (e) => {
        setSelectedVariable(e.target.value);
    };

    return (
        <div className="flex flex-col space-y-2 p-4 max-w-4xl">
            <h3 className="text-2xl font-bold mb-2">{Title}</h3>
            {variables.length > 1 && (
                <select
                    value={selectedVariable}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    {variables.map((variable, index) => (
                        <option key={index} value={variable.datapath}>
                            {variable.name}
                        </option>
                    ))}
                </select>
            )}
            {children(selectedVariable)}
        </div>
    );
}

export default function Home() {
	return (
		<>
			<NavBar />
			<LandingPage />
			<main className="min-h-screen flex flex-col items-center">
				<div className="flex flex-col space-y-2 p-4 max-w-4xl">
					<h2 className="text-3xl font-bold mb-2">
						Welcome to the Ultimate Sports Analysis Hub on
						YouTube!
					</h2>
					<p className="text-lg">
						Sports have an unparalleled ability to unite billions of
						fans across the globe. Did you know that the FIFA World
						Cup attracts over half a billion viewers, the Olympics
						engage billions more, and the NBA Finals ignite passions
						in millions every year? These monumental events
						captivate audiences not just in stadiums and arenas, but
						also dominate our digital lives, especially on platforms
						like YouTube. Are you a sports enthusiast eager to dive
						deeper into the game? Or are you curious about how your
						favorite sports moments are shaping the online world?
						You’re in the right place!
					</p>
				</div>
                <SubTitleText
                    title="YouTube: The Digital Arena for Sports Fans"
                    text="In today's digital landscape, YouTube stands as the premier platform where sports content flourishes. With millions of sports-related videos uploaded each year and billions of views every month, YouTube mirrors the global fervor for sports like no other medium. From electrifying game highlights and in-depth analyses to live streams and passionate fan reactions, the diversity and volume of sports content on YouTube are staggering.

                    Major sporting events trigger a significant surge in YouTube activity. For instance, during the FIFA World Cup, sports channels see a massive influx of views and uploads, reflecting global excitement and engagement. Similarly, the Olympics and NBA Finals generate waves of content that capture every thrilling moment, behind-the-scenes action, and fan interaction. This digital amplification not only enhances the real-time experience of these events but also extends their reach, allowing fans from all corners of the world to participate in the excitement.

                    As sports content on YouTube continues to grow, it becomes a vital indicator of global sports trends and fan interests. Below, our first plot showcases the delta views of various sports channels over the years, illustrating the evolving patterns of viewer engagement."
                    ></SubTitleText>
				<ChartComponent loading={<LoadingSpinner />} />
				<SubTitleText
					title="Create Next App"
					text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam autem quibusdam, delectus in corrupti, ab impedit magni iure eveniet aliquid soluta neque quisquam ducimus dolores ex suscipit pariatur. Voluptatibus, exercitationem? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repellat iure tenetur similique nemo soluta velit voluptate."
				/>
				<RacingChartComponent
					dataPath={"data/third_plot/sport_transit.csv"}
					xName={"Number of videos"}
					yName={"Sport category"}
					loading={<LoadingSpinner />}
				/>
				<SubTitleText
					title="Create Next App"
					text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam autem quibusdam, delectus in corrupti, ab impedit magni iure eveniet aliquid soluta neque quisquam ducimus dolores ex suscipit pariatur. Voluptatibus, exercitationem? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repellat iure tenetur similique nemo soluta velit voluptate."
				/>
				<BubbleChartComponent loading={<LoadingSpinner />} />
				<VariableChooserComponent
					Title="Box plot of delta view"
					variables={[
						{
							datapath: "data/boxplot_data.csv",
							name: "Views",
						},
						{
							datapath: "data/boxplot_data2.csv",
							name: "Videos",
						},
					]}
				>
					{(variable) => (
						<BoxPlotChart
							datapath={variable}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponent
					title="Line plot of delta view"
					variables={[
						{
							datapath:
								"data/first_plot/sum_delta_subs_overtime.csv",
							name: "Delta Subs",
						},
						{
							datapath:
								"data/first_plot/sum_delta_videos_overtime.csv",
							name: "Delta Videos",
						},
						{
							datapath:
								"data/first_plot/sum_delta_views_overtime.csv",
							name: "Delta Views",
						},
					]}
				>
					{(variable) => (
						<LinePlotChart
							datapath={variable}
							colors={["#187F42"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponent
					title="Line plot of delta view"
					variables={[
						{
							datapath:
								"data/second_plot/fre_popular_sports_tags.csv",
							name: "Delta Subs",
						},
					]}
				>
					{(variable) => (
						<BarPlotChart
							datapath={variable}
							colors={["#165B33"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<VariableChooserComponent
					Title="Line plot of delta view"
					variables={[
						{
							datapath: "data/barplot_data.csv",
							name: "Delta Subs",
						},
					]}
				>
					{(variable) => (
						<BarPlotChart
							datapath={variable}
							colors={[
								"#165B33",
								"#FF5733",
								"#33FF57",
								"#3357FF",
							]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
				<div className="flex justify-center w-full align-center flex-col">
					<h3 className="text-2xl font-bold mb-2 text-center p-4">
						Topic modeling LDA
					</h3>
					<IframeChart
						title="Iframe Chart"
						src="lda_world_cup_football.html"
					/>
				</div>
				<VariableChooserComponent
					Title="Line plot of delta view"
					variables={[
						{
							datapath:
								"data/second_plot/fre_popular_sports_tags.csv",
							name: "Delta Subs",
						},
					]}
				>
					{(variable) => (
						<HeatMapChart
							datapath={variable}
							colors={["#165B33"]}
							loading={<LoadingSpinner />}
						/>
					)}
				</VariableChooserComponent>
			</main>
			<Footer />
		</>
	);
}
