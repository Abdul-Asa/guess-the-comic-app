/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "meo.comick.pictures",
        port: "",
      },
    ],
  },
};


module.exports = nextConfig
