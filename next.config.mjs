/** @type {import('next').NextConfig} */
const nextConfig = {
  // puppeteer-core는 번들링 대상에서 빼고 node_modules 그대로 쓴다.
  // (@sparticuz/chromium-min은 바이너리를 패키지에 안 들고 있어 이 문제 자체가 없다 —
  // 런타임에 GitHub 릴리즈에서 받아 /tmp에 풀어 쓴다. app/api/proposal-render/route.ts 참고)
  serverExternalPackages: ['puppeteer-core'],
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
      { source: '/self-check/food', destination: '/self-check/food/index.html' },
      { source: '/self-check/food/', destination: '/self-check/food/index.html' },
      { source: '/event/seminar/ai-decision-making-2026', destination: '/event/seminar/ai-decision-making-2026/index.html' },
      { source: '/event/seminar/ai-decision-making-2026/', destination: '/event/seminar/ai-decision-making-2026/index.html' },
    ];
  },
};

export default nextConfig;
