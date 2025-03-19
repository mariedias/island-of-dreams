/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    images: {
      domains: ["islandofdreams.vercel.app"],
    },
  };
  
export default nextConfig;
  
