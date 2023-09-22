/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://147.182.197.5:8001 http://147.182.197.5:8002; object-src 'none';",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
