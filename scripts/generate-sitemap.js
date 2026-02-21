import { createClient } from 'contentful';
import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';
import 'dotenv/config'; // Loads .env file contents into process.env

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.premiumtoolshub.in';

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
    console.log('Generating sitemap indices...');
    console.log(`Site URL: ${SITE_URL}`);

    const response = await client.getEntries({
      content_type: 'premiumhub', // Your Contentful model name
      limit: 1000,
      select: 'fields.slug,fields.category,sys.updatedAt',
    });

    const posts = response.items.filter(post => post.fields.slug);
    console.log(`Found ${posts.length} blog posts.`);

    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const sitemaps = [];
    const now = new Date().toISOString();

    // --- 1. Generate Static Pages Sitemap ---
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/blog', priority: 0.8, changefreq: 'daily' },
      { url: '/privacy-policy', priority: 0.5, changefreq: 'monthly' },
      { url: '/terms-and-conditions', priority: 0.5, changefreq: 'monthly' },
      { url: '/about-us', priority: 0.6, changefreq: 'monthly' }
    ];

    let staticDoc = create({ version: '1.0', encoding: 'UTF-8' })
      .ins('xml-stylesheet', 'type="text/xsl" href="/main-sitemap.xsl"')
      .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

    staticPages.forEach(page => {
      staticDoc.ele('url')
        .ele('loc').txt(`${SITE_URL}${page.url}`).up()
        .ele('lastmod').txt(now).up()
        .ele('changefreq').txt(page.changefreq).up()
        .ele('priority').txt(page.priority.toString()).up()
        .up();
    });
    fs.writeFileSync(path.join(publicDir, 'page-sitemap.xml'), staticDoc.end({ prettyPrint: true }));
    sitemaps.push('page-sitemap.xml');

    // --- 2. Generate Services Sitemap ---
    const services = ['linkedin', 'gemini', 'chatgpt', 'loveable', 'n8n', 'adobe', 'gamma', 'replit', 'bolt', 'notion'];
    let servicesDoc = create({ version: '1.0', encoding: 'UTF-8' })
      .ins('xml-stylesheet', 'type="text/xsl" href="/main-sitemap.xsl"')
      .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });
    services.forEach(service => {
      servicesDoc.ele('url')
        .ele('loc').txt(`${SITE_URL}/services/${service}`).up()
        .ele('lastmod').txt(now).up()
        .ele('changefreq').txt('weekly').up()
        .ele('priority').txt('0.9').up()
        .up();
    });
    fs.writeFileSync(path.join(publicDir, 'service-sitemap.xml'), servicesDoc.end({ prettyPrint: true }));
    sitemaps.push('service-sitemap.xml');

    // --- 3. Chunk Blog Posts into Paginated Sitemaps ---
    const POSTS_PER_SITEMAP = 1000;
    let sitemapIndex = 1;

    for (let i = 0; i < posts.length; i += POSTS_PER_SITEMAP) {
      const chunk = posts.slice(i, i + POSTS_PER_SITEMAP);
      const fileName = `post-sitemap${sitemapIndex}.xml`;

      let postDoc = create({ version: '1.0', encoding: 'UTF-8' })
        .ins('xml-stylesheet', 'type="text/xsl" href="/main-sitemap.xsl"')
        .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

      chunk.forEach(post => {
        const url = `/blog/${post.fields.slug}`;
        const lastMod = new Date(post.sys.updatedAt).toISOString();

        postDoc.ele('url')
          .ele('loc').txt(`${SITE_URL}${url}`).up()
          .ele('lastmod').txt(lastMod).up()
          .ele('changefreq').txt('weekly').up()
          .ele('priority').txt('0.7').up()
          .up();
      });

      fs.writeFileSync(path.join(publicDir, fileName), postDoc.end({ prettyPrint: true }));
      sitemaps.push(fileName);
      sitemapIndex++;
    }

    // --- 4. Generate the Sitemap Index File ---
    let indexDoc = create({ version: '1.0', encoding: 'UTF-8' })
      .ins('xml-stylesheet', 'type="text/xsl" href="/main-sitemap.xsl"')
      .ele('sitemapindex', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

    sitemaps.forEach(sitemapFile => {
      indexDoc.ele('sitemap')
        .ele('loc').txt(`${SITE_URL}/${sitemapFile}`).up()
        .ele('lastmod').txt(now).up()
        .up();
    });

    // Output sitemap_index.xml and create a fallback sitemap.xml that just is the index as well for standard crawlers
    const sitemapIndexXML = indexDoc.end({ prettyPrint: true });

    fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexXML);

    // Also maintain standard sitemap.xml pointing to the index so Google Search Console works without changing submission paths
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXML);

    console.log(`✅ Generated ${sitemaps.length} category/page sitemaps and successfully written sitemap_index.xml!`);
  } catch (error) {
    console.error('❌ Error generating sitemap index:', error);
    process.exit(1);
  }
}

generateSitemap();
