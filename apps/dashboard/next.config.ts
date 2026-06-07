import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // consume TypeScript source directly from workspace packages
  transpilePackages: ["@clickstream/schema"],
};

export default nextConfig;
