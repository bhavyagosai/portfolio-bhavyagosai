import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/Bhavya_Gosai_Resume.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
