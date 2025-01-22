import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'reqres.in',
      port: '',
      pathname: '/img/**'
    }]
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
