import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chromium from 'chrome-aws-lambda';
import puppeteerCore from 'puppeteer-core';
let puppeteer;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

async function prerender() {
  console.log('Starting pre-rendering...');

  let browser;
  // try serverless-compatible Chromium first
  try {
    const executablePath = await chromium.executablePath;
    browser = await puppeteerCore.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
    });
    console.log('Launched chrome-aws-lambda browser');
  } catch (err) {
    // fallback to full puppeteer for local environment
    console.warn('chrome-aws-lambda launch failed, falling back to puppeteer:', err.message);
    puppeteer = await import('puppeteer');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

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
