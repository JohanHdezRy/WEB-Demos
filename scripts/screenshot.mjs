import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../public/screenshots');

const BASE = 'http://localhost:5173/WEB-Demos';

const demos = [
  { route: '/',       file: 'landing.png',  wait: 800  },
  { route: '/demo-1', file: 'demo-1.png',   wait: 2500 },
  { route: '/demo-2', file: 'demo-2.png',   wait: 2500 },
  { route: '/demo-3', file: 'demo-3.png',   wait: 2500 },
  { route: '/demo-4', file: 'demo-4.png',   wait: 4000 }, // WebGL needs more time
  { route: '/demo-5', file: 'demo-5.png',   wait: 2500 },
  { route: '/demo-6', file: 'demo-6.png',   wait: 2500 },
];

async function main() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  for (const { route, file, wait } of demos) {
    console.log(`📸 Capturing ${route}…`);
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, wait));
      await page.screenshot({ path: path.join(OUT, file), type: 'png' });
      console.log(`   ✓ Saved ${file}`);
    } catch (e) {
      console.warn(`   ✗ Failed ${route}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\n✅ All screenshots done!');
}

main().catch(console.error);
