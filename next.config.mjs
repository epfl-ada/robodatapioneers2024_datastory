/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
	output: "export", // Enables static HTML export
	images: {
		unoptimized: true, // Ensures images work without external optimization servers
	},
	assetPrefix: "./", // Ensures assets have the correct relative paths for GitHub Pages
	trailingSlash: true, // Adds trailing slashes to URLs for GitHub Pages compatibility
	basePath: isProd ? "/robodatapioneers2024_datastory" : "",
	assetPrefix: isProd ? "/robodatapioneers2024_datastory/" : "",
};

export default nextConfig;
