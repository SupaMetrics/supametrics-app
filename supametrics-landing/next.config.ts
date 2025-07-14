import type { NextConfig } from "next";

const DOCS_SITE = process.env.DOCS_SITE || "https://supametricsdocs.vercel.app";
const DASHBOARD_SITE = process.env.DASHBOARD_SITE || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      "pbs.twimg.com",
      "api.iconify.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ].map((host) => ({
      protocol: "https",
      hostname: host,
      pathname: "/**",
    })),
  },
  async rewrites() {
    const dashboardRoutes = [
      "login",
      "signup",
      "forgot-password",
      "verify-otp",
      "dashboard",
      "new",
      "new/:path+",
      "/project",
      "/project/:path+",
      "settings",
      "ai",
    ];

    const staticRoutes = [
      {
        source: "/docs",
        destination: `${DOCS_SITE}`,
      },
      {
        source: "/docs/:path+",
        destination: `${DOCS_SITE}/docs/:path+`,
      },
      {
        source: "/docs-static/:path+",
        destination: `${DOCS_SITE}/docs-static/:path+`,
      },
      {
        source: "/dashboard-static/:path+",
        destination: `${DASHBOARD_SITE}/dashboard-static/:path+`,
      },
    ];

    return [
      ...dashboardRoutes.map((route) => ({
        source: `/${route}`,
        destination: `${DASHBOARD_SITE}/${route}`,
      })),
      ...staticRoutes,
    ];
  },
};

export default nextConfig;
