/** @type {import('next').NextConfig} */
const nextConfig = {
  // @sparticuz/chromium은 실제 Chromium 바이너리(bin/*.br)를 패키지 안에 파일로 들고 있다 —
  // 번들러가 이 패키지를 코드에 인라인하면 그 바이너리 파일들이 배포에서 빠진다
  // ("input directory .../bin does not exist" 런타임 에러). serverExternalPackages로
  // 번들링 대상에서 빼고 node_modules 그대로 배포하게 한다.
  // https://github.com/Sparticuz/chromium#bundler-configuration
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  // 위 externalize만으로는 부족하다 — chromium.executablePath()가 bin/*.br 경로를
  // 런타임에 동적으로 계산해서 읽기 때문에 Next의 정적 파일 트레이서가 못 잡는다.
  // 이 라우트가 배포될 때 그 바이너리들을 명시적으로 같이 담아준다.
  outputFileTracingIncludes: {
    '/api/proposal-render': ['./node_modules/@sparticuz/chromium/bin/**'],
  },
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
