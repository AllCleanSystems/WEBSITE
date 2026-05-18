import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/services", "/services/carpet-cleaning", "/areas", "/gallery", "/contact"],
      disallow: ["/app", "/admin-autopilot", "/ops-console", "/phone", "/integrations", "/zoho-hub"],
    },
    sitemap: "https://acsbismarck.com/sitemap.xml",
  };
}
