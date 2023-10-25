/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config
  },
  //rewrite for /database to /database/dashboard
  async rewrites() {
    return [
      {
        source: '/database',
        destination: '/database/dashboard',
      },
    ]
  },
  
}


