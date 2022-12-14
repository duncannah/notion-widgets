const isProd = process.env.NODE_ENV === `production`;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	assetPrefix: isProd ? `/notion-widgets/` : `/`,
	basePath: isProd ? `/notion-widgets` : undefined,
};

module.exports = nextConfig;
