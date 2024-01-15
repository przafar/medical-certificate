/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiURL: "http://10.10.10.20:8092/api/v2",
  },
  output: "standalone",
};

module.exports = nextConfig;
