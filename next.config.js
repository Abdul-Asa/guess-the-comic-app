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
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
      },
    ],
  },
};


module.exports = nextConfig
