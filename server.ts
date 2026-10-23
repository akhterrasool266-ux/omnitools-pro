import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { TOOLS_DATA } from './src/data/tools.ts';
import { generateSitemapXml, generateRobotsTxt } from './src/utils/sitemap.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const APP_URL = process.env.APP_URL || 'https://ais-pre-4ktfcv4nkigd7jjg5shiiw-935260511322.asia-east1.run.app';

// 1. Automated Sitemap XML endpoint for search engine crawlers (Googlebot, Bingbot)
app.get('/sitemap.xml', (_req, res) => {
  const cleanAppUrl = APP_URL.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  const sitemapItems = [
    {
      url: `${cleanAppUrl}/`,
      changefreq: 'daily' as const,
      priority: 1.0,
      lastmod: today,
    },
    ...TOOLS_DATA.map((tool) => ({
      url: `${cleanAppUrl}/?tool=${tool.slug}`,
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: today,
    })),
  ];

  const xml = generateSitemapXml(sitemapItems);
  res.header('Content-Type', 'application/xml');
  res.header('Cache-Control', 'public, max-age=3600');
  res.send(xml);
});

// 2. Robots.txt endpoint
app.get('/robots.txt', (_req, res) => {
  const robots = generateRobotsTxt({
    domain: APP_URL,
    allowAll: true,
    disallowPaths: ['/api/private'],
    sitemapPath: `${APP_URL.replace(/\/+$/, '')}/sitemap.xml`,
  });

  res.header('Content-Type', 'text/plain');
  res.header('Cache-Control', 'public, max-age=86400');
  res.send(robots);
});

// 3. Crawler status health check endpoint
app.get('/api/seo-health', (_req, res) => {
  res.json({
    status: 'ok',
    crawlerAccessible: true,
    sitemapUrl: `${APP_URL}/sitemap.xml`,
    robotsUrl: `${APP_URL}/robots.txt`,
    indexedToolCount: TOOLS_DATA.length,
    timestamp: new Date().toISOString(),
  });
});

// 4. Vite middleware integration for full-stack SPA
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`OmniTools Pro server running on http://0.0.0.0:${PORT}`);
    console.log(`Automated Sitemap: http://0.0.0.0:${PORT}/sitemap.xml`);
    console.log(`Robots Directives: http://0.0.0.0:${PORT}/robots.txt`);
  });
}

startServer();
