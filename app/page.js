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
import { NavBar } from "./nav.js";
import { Footer, LandingPage } from "./home_layout.js";
import { IframeChart } from "./iframe_charts.js";

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
            <h2 className="text-2xl font-bold mb-2">{Title}</h2>
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
					<h1 className="text-3xl font-bold mb-2">Introduction</h1>
					<p className="text-lg">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Ipsam autem quibusdam, delectus in corrupti, ab
						impedit magni iure eveniet aliquid soluta neque quisquam
						ducimus dolores ex suscipit pariatur. Voluptatibus,
						exercitationem? Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Perspiciatis repellat iure tenetur
						similique nemo soluta velit voluptate. Tempore esse
						adipisci quia repellat amet eaque numquam deleniti
						asperiores dolore? Voluptates, possimus? Suscipit fuga
						laudantium beatae vel esse non, consectetur dolores
						praesentium eos tempora? Perferendis eius accusantium
						tenetur sit error natus, corporis voluptas, beatae sed
						ipsa repudiandae qui nobis autem voluptatum quod? Soluta
						sequi deleniti et a, expedita nesciunt quos ad, facere
						laudantium nisi numquam perferendis? Veritatis eum harum
						saepe quae itaque maxime quia, assumenda vero commodi
						iste dolores corporis dolorum sequi. Placeat numquam
						nostrum sit, ipsam id delectus voluptatum inventore quas
						nemo ex. Dolor, ea dolore voluptate soluta nobis rerum
						nostrum nesciunt iusto magnam maxime id aperiam ipsum
						velit cum? Eaque! Alias, magnam sunt vitae facilis
						consectetur aut, et, quae odio eveniet accusantium
						deleniti exercitationem laudantium iste tempore?
						Sapiente incidunt impedit vel debitis ab in tenetur
						beatae dolorem, nulla laborum ipsum. Nihil quisquam odio
						quia veniam nemo voluptatibus animi! Sit labore eius
						voluptatem hic fugit eum itaque tempora, veniam ipsam at
						saepe numquam quis error perferendis eos, repellat ex
						harum excepturi.
					</p>
				</div>
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
				<div className="flex justify-center w-full align-center">
					<IframeChart
						title="Iframe Chart"
						src="lda_world_cup_football.html"
					/>
				</div>
			</main>
			<Footer />
		</>
	);
}
