/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false; // 👈 disable cache in dev
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // SVG loader
    });

    return config;
  },
};

export default nextConfig;
