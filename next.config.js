/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiURL: "https://test-api.ssv.uz/v2/MedicalCertificate",
  },
  output: "standalone",
};

module.exports = nextConfig;
