import { createClient } from 'contentful';
import fs from 'fs';
import path from 'path';
import 'dotenv/config'; // Loads .env file contents into process.env

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
// You can define a VITE_SITE_URL in your .env or Environment Variables on Vercel
const SITE_URL = process.env.VITE_SITE_URL || 'https://premiumhub.click';

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error('Error: VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN is missing.');
  process.exit(1);
}

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

async function generateSitemap() {
  try {
    console.log('Generating sitemap...');
    console.log(`Site URL: ${SITE_URL}`);

    // Fetch all blog posts
    // Note: limit is 100 by default. If you have more, you need pagination.
    // For now, we'll fetch up to 1000.
    const response = await client.getEntries({
      content_type: 'premiumhub',
      limit: 1000,
      select: 'fields.slug,sys.updatedAt',
    });

    const posts = response.items;
    console.log(`Found ${posts.length} blog posts.`);

    // Helper to escape XML special characters
    const escapeXml = (unsafe) => {
      return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
        }
      });
    };

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${escapeXml(SITE_URL)}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${escapeXml(SITE_URL)}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${escapeXml(SITE_URL)}/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${escapeXml(SITE_URL)}/terms-and-conditions</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Services Pages -->
${['linkedin', 'gemini', 'chatgpt', 'loveable', 'n8n', 'adobe', 'gamma', 'replit', 'bolt', 'notion']
        .map(id => `  <url>
    <loc>${escapeXml(`${SITE_URL}/services/${id}`)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}

  <!-- Other static pages -->

  <!-- Dynamic Blog Posts -->
${posts
        .filter(post => post.fields.slug) // Ensure slug exists
        .map((post) => {
          const slug = post.fields.slug;
          const lastMod = new Date(post.sys.updatedAt).toISOString();
          return `  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/${slug}`)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        })
        .join('\n')}
</urlset>`;

    // Ensure public directory exists
    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent);

    console.log(`✅ Sitemap successfully written to ${sitemapPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
