import { useEffect } from "react";

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
            <img
                src="landing_page_image.webp"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas
                id="animated-bg"
                className="absolute inset-0 w-full h-full opacity-50"
            ></canvas>
            <div className="absolute inset-0 flex items-center justify-center px-20">
                <h1 className="text-8xl text-black text-center font-monoton">
                    Game-changer
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
		<footer className="bg-green2-300 text-white py-12 mt-8">
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
				<div className="text-center border-t border-green2-400 pt-4">
					<p>© 2024 robodatapioneers2024. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}

export { LandingPage, Footer };