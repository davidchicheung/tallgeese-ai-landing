import { readFileSync } from "node:fs";

/** @type {import('next').NextConfig} */

// The pages live under app/[lang]. The default language is served without its
// prefix: /agent is rewritten to /en/agent, and /en/agent redirects to /agent.
const locales = JSON.parse(
  readFileSync(new URL("./lib/locales.json", import.meta.url), "utf8"),
).map((locale) => locale.id);
const defaultLocale = locales[0];
// First path segments that are not a page of the default language: the
// languages themselves, and the route handlers outside app/[lang].
const notDefaultLocale = [...locales, "api", "download", "_next"].join("|");

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: `/${defaultLocale}`,
        destination: '/',
        permanent: true,
      },
      {
        source: `/${defaultLocale}/:path+`,
        destination: '/:path+',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      afterFiles: [
        { source: '/', destination: `/${defaultLocale}` },
        {
          source: `/:first((?!(?:${notDefaultLocale})(?:/|$))[^/]+)/:rest*`,
          destination: `/${defaultLocale}/:first/:rest*`,
        },
      ],
    }
  },
  images: {
    qualities: [75, 100],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
