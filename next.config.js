require('dotenv').config();
// console.log(process.env.DATABASE_URL); // This should print the DATABASE_URL value

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  reactStrictMode: true,
  swcMinify: false,
};
