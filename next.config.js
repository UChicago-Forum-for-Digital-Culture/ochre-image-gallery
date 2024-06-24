/** @type {import('next').NextConfig} */
const config = {
  basePath: "/image-gallery",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ochre.lib.uchicago.edu",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default config;
