import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

async function prerender() {
  console.log('Starting pre-rendering...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the local file
    const indexPath = `file://${path.join(distDir, 'index.html')}`;
    console.log(`Navigating to: ${indexPath}`);
    
    await page.goto(indexPath, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for React to finish rendering
    await page.waitForSelector('#root', { timeout: 10000 });
    
    // Get the fully rendered HTML
    const html = await page.content();
    
    // Save the pre-rendered HTML
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
    console.log('✓ Pre-rendering complete!');
    console.log('✓ Static HTML has been generated with all content visible to search engines');
    
  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

prerender();
