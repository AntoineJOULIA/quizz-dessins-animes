import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NODE_ENV === "production" ? "/quizz-dessins-animes/" : "",
};

export default nextConfig;
