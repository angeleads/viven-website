import createNextIntlPlugin from "next-intl/plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, {dev, isServer}) => {
    if (!dev && !isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
