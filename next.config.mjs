/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/card-data-api', destination: '/card-data-api/index.html' },
      { source: '/card-data-api/', destination: '/card-data-api/index.html' },
      { source: '/card-api-landing', destination: '/card-api-landing/index.html' },
      { source: '/card-api-landing/', destination: '/card-api-landing/index.html' },
      { source: '/cosmetic/kakao-sync', destination: '/cosmetic/kakao-sync/index.html' },
    ];
  },
};

export default nextConfig;
