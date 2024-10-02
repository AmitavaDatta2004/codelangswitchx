/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}
 export default nextConfig