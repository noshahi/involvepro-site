import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // cPanel's shared-host process limits reject the default worker-per-core
  // fan-out (child_process.spawn EAGAIN), so cap workers when building there.
  experimental: process.env.CPANEL_BUILD
    ? { cpus: 1, workerThreads: false }
    : undefined,
};

export default nextConfig;
