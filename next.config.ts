import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/moysklad-testtask",
  output: "export", // <=== enables static exports
  ignoreBuildErrors: true,
};

export default nextConfig;
