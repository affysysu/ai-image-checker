/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/sitemap.txt',
        destination: '/api/sitemap-txt',
      },
    ];
  },
};

export default nextConfig;
