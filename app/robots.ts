import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.waytoindia.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/auth/',
          '/api/admin/',
          '/user/',
          '/checkout/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      // Block bad bots
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'BLEXBot', 'PetalBot'],
        disallow: '/',
      },
    ],
    sitemap: [`${siteURL}/sitemap.xml`],
  };
}
