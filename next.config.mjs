/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "/robodatapioneers2024_datastory";

const nextConfig = {
	reactStrictMode: true,
	output: "export",
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
	basePath: isProd ? repoName : "",
	assetPrefix: isProd ? repoName : "",
};

export default nextConfig;
