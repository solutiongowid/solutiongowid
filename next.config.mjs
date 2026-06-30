/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
  async headers() {
    return [
      {
        source: '/cc-demo/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
      {
        source: '/seo-strategy/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/cc-demo', destination: '/cc-demo/deck-marketer/index.html', permanent: false },
      { source: '/cc-demo/', destination: '/cc-demo/deck-marketer/index.html', permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: '/card-data-api', destination: '/card-data-api/index.html' },
      { source: '/card-data-api/', destination: '/card-data-api/index.html' },
      { source: '/card-api-landing', destination: '/card-api-landing/index.html' },
      { source: '/card-api-landing/', destination: '/card-api-landing/index.html' },
      { source: '/cosmetic/kakao-sync', destination: '/cosmetic/kakao-sync/index.html' },
      { source: '/cc-demo/anua/dashboard-2', destination: '/cc-demo/anua/dashboard-2/index.html' },
      { source: '/cc-demo/anua/dashboard-2/', destination: '/cc-demo/anua/dashboard-2/index.html' },
      { source: '/seo-strategy', destination: '/api/serve-html/seo-strategy' },
      { source: '/seo-strategy/', destination: '/api/serve-html/seo-strategy' },
      { source: '/cc-demo/deck-marketer/index.html', destination: '/api/serve-html/deck-marketer' },
      { source: '/anua-dashboard', destination: '/api/serve-html/anua-dashboard' },
      { source: '/anua-dashboard/', destination: '/api/serve-html/anua-dashboard' },
      { source: '/self-check/fashion', destination: '/self-check/fashion/index.html' },
      { source: '/self-check/fashion/', destination: '/self-check/fashion/index.html' },
    ];
  },
};

export default nextConfig;
