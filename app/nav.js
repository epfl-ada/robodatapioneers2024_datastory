import { useEffect, useState } from "react";

const NavBar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 20;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "h-12 bg-red-600/90 backdrop-blur-sm shadow-md"
					: "h-16 bg-red-600"
			}`}
		>
			<div className="max-w-7xl px-4 h-full flex items-center justify-between">
				<div className="flex items-center space-x-8">
					<h1
						className={`font-bold transition-all ${
							scrolled ? "text-lg" : "text-xl"
						}`}
					>
						Logo
					</h1>
					<div className="hidden md:flex space-x-6">
						<a
							href="https://github.com/epfl-ada/ada-2024-project-robodatapioneers2024"
							className="hover:text-blue-600 transition-colors"
						>
							Github
						</a>
						<a
							href="#"
							className="hover:text-blue-600 transition-colors"
						>
							About the team
						</a>
						<a
							href="#"
							className="hover:text-blue-600 transition-colors"
						>
							The datasets used
						</a>
					</div>
				</div>
				<button className="md:hidden">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
};

export { NavBar };