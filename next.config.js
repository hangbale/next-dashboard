/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: 'build',
  output: 'export',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:slug*',
  //       destination: 'http://yapi.dev.mchz.com.cn/mock/509/api/:slug*',
  //     },
  //   ]
  // }
}

module.exports = nextConfig
