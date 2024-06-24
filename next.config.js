/** @type {import('next').NextConfig} */
const config = {
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
