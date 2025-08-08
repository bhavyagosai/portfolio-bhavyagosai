/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bhavyagosai.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://bhavyagosai.com/sitemap.xml"],
  },
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
};
