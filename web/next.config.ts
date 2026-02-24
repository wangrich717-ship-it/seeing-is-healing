import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES === "true" ? "/Seeing-is-Healing" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
