/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/card-data-api', destination: '/card-data-api/index.html' },
      { source: '/card-data-api/', destination: '/card-data-api/index.html' },
    ];
  },
};

export default nextConfig;
