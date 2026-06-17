import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a lockfile in the parent dir would
  // otherwise be picked up and break file tracing on Vercel).
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
