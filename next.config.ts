/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Cache optimized images for 31 days; the default TTL is short, which surfaced as
    // `Cache-Control: max-age=0, must-revalidate` and forced repeated re-optimization.
    minimumCacheTTL: 2678400,
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig);