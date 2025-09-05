/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages compatibility
  output: 'export',
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
  
  // Configure base path for GitHub Pages (disabled in development)
  basePath: process.env.NODE_ENV === 'production' ? '/Financial-Manager' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Financial-Manager/' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure static export directory
  distDir: 'dist',
  
  // Ensure compatibility with GitHub Pages
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  }
};

export default nextConfig;