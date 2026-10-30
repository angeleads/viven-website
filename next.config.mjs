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
  async redirects() {
    return [
      {
        source: "/es/seccion/administrador-de-fincas/ef6c358766122053c98c3cc21b010bdd/es",
        destination: "/es/administrador-de-fincas",
        permanent: true,
      },
      {
        source: "/es/seccion/administrador-de-fincas/ef6c358766122053c98c3cc21b010bdd/es/",
        destination: "/es/administrador-de-fincas",
        permanent: true,
      },
      {
        source: "/seccion/administrador-de-fincas/ef6c358766122053c98c3cc21b010bdd/es",
        destination: "/es/administrador-de-fincas",
        permanent: true,
      },
      {
        source: "/seccion/administrador-de-fincas/ef6c358766122053c98c3cc21b010bdd/es/",
        destination: "/es/administrador-de-fincas",
        permanent: true,
      },
      {
        source: "/:locale(es|en|ca|fr)/seccion/administrador-de-fincas/:path*",
        destination: "/:locale/administrador-de-fincas",
        permanent: true,
      },
      {
        source: "/seccion/administrador-de-fincas/:path*",
        destination: "/es/administrador-de-fincas",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
