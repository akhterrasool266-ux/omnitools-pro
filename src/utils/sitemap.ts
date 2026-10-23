/**
 * Sitemap & Robots.txt generation utilities
 */

export interface SitemapItem {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(items: SitemapItem[]): string {
  const urlNodes = items
    .map((item) => {
      const cleanUrl = escapeXml(item.url.trim());
      const lastmodTag = item.lastmod ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>` : '';
      const changefreqTag = item.changefreq ? `\n    <changefreq>${item.changefreq}</changefreq>` : '';
      const priorityTag = item.priority !== undefined ? `\n    <priority>${item.priority.toFixed(1)}</priority>` : '';
      return `  <url>\n    <loc>${cleanUrl}</loc>${lastmodTag}${changefreqTag}${priorityTag}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;
}

export function validateSitemapXml(xmlString: string): { valid: boolean; error?: string; urlCount: number } {
  if (!xmlString.trim()) {
    return { valid: false, error: 'Sitemap XML is empty', urlCount: 0 };
  }
  if (!xmlString.includes('<urlset') || !xmlString.includes('</urlset>')) {
    return { valid: false, error: 'Missing <urlset> root node or namespace', urlCount: 0 };
  }
  const locMatches = xmlString.match(/<loc>(.*?)<\/loc>/g) || [];
  if (locMatches.length === 0) {
    return { valid: false, error: 'No valid <loc> URL nodes detected in XML', urlCount: 0 };
  }
  return { valid: true, urlCount: locMatches.length };
}

export function generateRobotsTxt(options: {
  domain: string;
  allowAll?: boolean;
  disallowPaths?: string[];
  sitemapPath?: string;
  crawlDelay?: number;
}): string {
  const { domain, allowAll = true, disallowPaths = ['/admin', '/private'], sitemapPath = '/sitemap.xml', crawlDelay } = options;
  const normalizedDomain = domain.replace(/\/+$/, '');
  const lines: string[] = [
    '# Robots.txt for ' + normalizedDomain,
    '# Optimized for Googlebot, Bingbot and modern search engine crawlers',
    'User-agent: *',
  ];

  if (crawlDelay && crawlDelay > 0) {
    lines.push(`Crawl-delay: ${crawlDelay}`);
  }

  if (allowAll) {
    lines.push('Allow: /');
  }

  disallowPaths.forEach((path) => {
    if (path.trim()) {
      lines.push(`Disallow: ${path.trim()}`);
    }
  });

  if (sitemapPath) {
    const sitemapFullUrl = sitemapPath.startsWith('http')
      ? sitemapPath
      : `${normalizedDomain}${sitemapPath.startsWith('/') ? '' : '/'}${sitemapPath}`;
    lines.push('');
    lines.push(`Sitemap: ${sitemapFullUrl}`);
  }

  return lines.join('\n');
}
