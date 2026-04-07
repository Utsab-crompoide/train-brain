import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/train-brain" : "",
  assetPrefix: isProd ? "/train-brain/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
