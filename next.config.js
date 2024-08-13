module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
  reactStrictMode: true,
  images: {
    
    domains: [
      '*',
      'storage.googleapis.com',
      'localhost'
    ], // Add your external domains here
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true, // atau false jika redirect tidak permanen
      },
    ];
  },
};
