/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/card-api-landing',
        destination: '/card-api-landing/index.html',
      },
    ];
  },
};

export default nextConfig;
