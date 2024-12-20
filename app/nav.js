import { useEffect, useState } from "react";
import Image from "next/image";

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

	const [showDatasets, setShowDatasets] = useState(false);
    const [showLibraries, setShowLibraries] = useState(false);

	const NavDropdown = ({ items }) => (
		<div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
			{items.map((item, index) => (
				<a
					key={index}
					href={item.href}
					className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
				>
					{item.text}
				</a>
			))}
		</div>
	);

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
                        Robodatapioneers2024
                    </h1>
                    <div className="hidden md:flex space-x-6">
                        <a
                            href="https://github.com/epfl-ada/ada-2024-project-robodatapioneers2024"
                            className="hover:text-blue-600 transition-colors font-semibold"
                        >
                            Github
                        </a>
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowDatasets(!showDatasets);
                                    setShowLibraries(false);
                                }}
                                className="hover:text-blue-600 transition-colors font-semibold"
                            >
                                The datasets used
                            </button>
                            {showDatasets && (
                                <NavDropdown
                                    items={[
                                        {
                                            href: "https://github.com/epfl-dlab/YouNiverse",
                                            text: "YouNiverse",
                                        },
                                    ]}
                                />
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowLibraries(!showLibraries);
                                    setShowDatasets(false);
                                }}
                                className="hover:text-blue-600 transition-colors font-semibold"
                            >
                                Libraries used
                            </button>
                            {showLibraries && (
                                <NavDropdown
                                    items={[
                                        {
                                            href: "https://huggingface.co/",
                                            text: "Hugging Face",
                                        },
                                        {
                                            href: "nextjs.org",
                                            text: "Next.js",
                                        },
                                        {
                                            href: "tailwindcss.com",
                                            text: "Tailwind CSS",
                                        },
                                        {
                                            href: "https://www.chartjs.org/",
                                            text: "Chart.js",
                                        },
                                        {
                                            href: "https://plotly.com/javascript/",
                                            text: "Plotly",
                                        },
                                    ]}
                                />
                            )}
                        </div>
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
