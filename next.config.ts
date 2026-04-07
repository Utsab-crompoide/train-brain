const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/train-brain" : "",
  assetPrefix: isProd ? "/train-brain/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/train-brain" : "",
  },
};

export default nextConfig;
