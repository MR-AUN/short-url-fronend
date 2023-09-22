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
            value: "default-src 'self' https:; connect-src 'self' https: http://147.182.197.5:8001;",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
