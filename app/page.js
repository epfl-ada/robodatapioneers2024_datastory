"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
	LoadingSpinner,
	ChartComponent,
	RacingChartComponent,
	BubbleChartComponent,
} from "./data_charts.js";
import { BoxPlotChart } from "./box_plot_chart.js";
import { NavBar } from "./nav.js";

function LandingPage() {
	useEffect(() => {
		const canvas = document.getElementById("animated-bg");
		const ctx = canvas.getContext("2d");
		let animationFrameId;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles = [];
		const numParticles = 60;
		const icons = ["⚽", "🏀", "🎾", "⚾", "🏈", "🏓"]; // Sports icons

		// Initialize particles with sports icons
		for (let i = 0; i < numParticles; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				speed: 0.5 + Math.random(),
				angle: Math.random() * Math.PI * 2,
				size: 12, // Increased size for icons
				icon: icons[Math.floor(Math.random() * icons.length)],
			});
		}

		const render = () => {
			ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = "12px Arial";
			particles.forEach((particle) => {
				// Update position
				particle.x += Math.cos(particle.angle) * particle.speed;
				particle.y += Math.sin(particle.angle) * particle.speed;

				// Draw sports icon
				ctx.fillStyle = "#0066cc";
				ctx.fillText(particle.icon, particle.x, particle.y);

				// Connect nearby particles
				particles.forEach((other) => {
					const dx = particle.x - other.x;
					const dy = particle.y - other.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 100) {
						ctx.strokeStyle = `rgba(255, 102, 102, ${
							1 - distance / 100
						})`;
						ctx.beginPath();
						ctx.moveTo(particle.x, particle.y);
						ctx.lineTo(other.x, other.y);
						ctx.stroke();
					}
				});

				// Wrap around screen
				if (particle.x < 0) particle.x = canvas.width;
				if (particle.x > canvas.width) particle.x = 0;
				if (particle.y < 0) particle.y = canvas.height;
				if (particle.y > canvas.height) particle.y = 0;
			});

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className="relative w-full h-screen">
			<canvas
				id="animated-bg"
				className="absolute inset-0 w-full h-full"
			></canvas>
			<div className="absolute inset-0 flex items-center justify-center px-20">
				<h1 className="text-5xl font-bold text-black text-center">
					Game-changer: How do the major sports events influence
					YouTube engagement?
				</h1>
			</div>
		</div>
	);
}

function Footer() {
	const teamMembers = [
		{
			name: "Andres Nowak",
			role: "Data science",
			link: "https://github.com/andresnowak",
		},
		{
			name: "Zahra Taghizadeh",
			role: "Robotics",
			link: "https://github.com/zahrataghizaadeh",
		},
		{
			name: "Yugo Kadowaki",
			role: "Robotics",
			link: "https://github.com/pikkun0907",
		},
		{
			name: "Huyen Le",
			role: "Data Science",
			link: "https://github.com/LeThaoHuyen",
		},
		{
			name: "Keisuke Ueda",
			role: "Data Science",
			link: "https://github.com/keisuke-l-u",
		},
	];

	const references = [
		"Sports Event Detection using Deep Learning (Sharma et al., 2022)",
		"Temporal Pattern Analysis in Social Media (Wang et al., 2021)",
		"YouTube Engagement Metrics Analysis (Johnson & Smith, 2023)",
		"Time Series Forecasting for Social Media (Lee et al., 2022)",
		"Cross-Platform Social Media Analytics (Zhang et al., 2023)",
	];

	return (
		<footer className="bg-blue-500 text-white py-12 mt-8">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-4 text-center">
						Our Team
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
						{teamMembers.map((member, index) => (
							<div key={index} className="text-center p-2">
								<h3 className="font-semibold">
									{member.link ? (
										<a
											href={member.link}
											className="hover:text-blue-200 underline"
										>
											{member.name}
										</a>
									) : (
										member.name
									)}
								</h3>
								<p className="text-blue-100">{member.role}</p>
							</div>
						))}
					</div>
				</div>
				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-4 text-center">
						References
					</h2>
					<div className="flex flex-wrap justify-center gap-4">
						{references.map((ref, index) => (
							<div key={index} className="text-center p-2">
								<p className="text-blue-100">{ref}</p>
							</div>
						))}
					</div>
				</div>
				<div className="text-center border-t border-blue-400 pt-4">
					<p>© 2024 Sports Analytics Project. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}

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
				<RacingChartComponent loading={<LoadingSpinner />} />
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
			</main>
			<Footer />
		</>
	);
}
