import fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';
import 'dotenv/config'; // Loads .env file contents into process.env

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.premiumtoolshub.in';

async function generateSitemap() {
  try {
    console.log('Generating sitemap indices...');
    console.log(`Site URL: ${SITE_URL}`);

    // --- 0. Fetch ALL posts from WordPress (Recursive Pagination) ---
    let allPosts = [];
    let page = 1;
    let totalPages = 1;

    console.log('Fetching posts from WordPress API...');

    do {
      const wpResponse = await fetch(`https://premiumtoolshub.orphicsolution.com/wp-json/wp/v2/posts?per_page=100&page=${page}`);
      if (!wpResponse.ok) {
        if (wpResponse.status === 400) break; // Reached end of pages
        throw new Error(`Failed to fetch posts: ${wpResponse.statusText}`);
      }

      const posts = await wpResponse.json();
      if (!posts || posts.length === 0) break;

      allPosts = [...allPosts, ...posts];

      // Get total pages from headers
      totalPages = parseInt(wpResponse.headers.get('X-WP-TotalPages')) || 1;
      console.log(`Fetched page ${page} of ${totalPages} (${posts.length} posts)...`);

      page++;
    } while (page <= totalPages);

    const filteredPosts = allPosts.filter(post => post.slug);
    console.log(`✅ Total posts found: ${filteredPosts.length}. Splitting into sitemaps...`);

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

    // --- 3. Chunk Blog Posts into Paginated Sitemaps (100 posts per file) ---
    const POSTS_PER_SITEMAP = 100; // As requested: split every 100 posts
    let sitemapIndexNum = 1;

    for (let i = 0; i < filteredPosts.length; i += POSTS_PER_SITEMAP) {
      const chunk = filteredPosts.slice(i, i + POSTS_PER_SITEMAP);
      const fileName = `post-sitemap${sitemapIndexNum}.xml`;

      let postDoc = create({ version: '1.0', encoding: 'UTF-8' })
        .ins('xml-stylesheet', 'type="text/xsl" href="/main-sitemap.xsl"')
        .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

      chunk.forEach(post => {
        const url = `/blog/${post.slug}`;
        const lastMod = new Date(post.modified).toISOString();

        postDoc.ele('url')
          .ele('loc').txt(`${SITE_URL}${url}`).up()
          .ele('lastmod').txt(lastMod).up()
          .ele('changefreq').txt('weekly').up()
          .ele('priority').txt('0.7').up()
          .up();
      });

      fs.writeFileSync(path.join(publicDir, fileName), postDoc.end({ prettyPrint: true }));
      sitemaps.push(fileName);
      sitemapIndexNum++;
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

    const sitemapIndexXML = indexDoc.end({ prettyPrint: true });
    fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexXML);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXML);

    console.log(`✅ Successfully generated ${sitemaps.length} sitemaps containing all ${filteredPosts.length} posts!`);
  } catch (error) {
    console.error('❌ Error generating sitemap index:', error);
    process.exit(1);
  }
}

generateSitemap();
