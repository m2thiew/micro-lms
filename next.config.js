// plugin per rilevare i "dependency cycle" e segnalarli come errori.
const CircularDependencyPlugin = require("circular-dependency-plugin");
const fs = require("fs");

const pluginDetectCycles = new CircularDependencyPlugin({
  include: /src/,
  failOnError: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_PRIVATE_KEY: fs.readFileSync("./secrets/jwt_private.pem", { encoding: "utf-8" }),
    JWT_PUBLIC_KEY: fs.readFileSync("./secrets/jwt_public.pem", { encoding: "utf-8" }),
  },

  // aggiunge alla configurazione webpack usata da NextJS il plugin per
  // rilevare i "dependency cycle".
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.plugins.push(pluginDetectCycles);
    return config;
  },
};

module.exports = nextConfig;
