const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'treatments.html', 'contact.html'];
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

console.log('--- TOOTH FAIRY DENTAL CLINIC INTEGRITY TESTS ---');

// 1. Verify Pages Exist & Have Required Head Tags
for (const p of pages) {
  const filePath = path.resolve(p);
  assert(fs.existsSync(filePath), `Page file ${p} exists`);
  const content = fs.readFileSync(filePath, 'utf-8');

  assert(content.includes('<!DOCTYPE html>'), `${p} has standard DOCTYPE`);
  assert(content.includes('<meta name="viewport"'), `${p} has responsive viewport meta`);
  assert(content.includes('<title>'), `${p} has unique title`);
  assert(content.includes('<meta name="description"'), `${p} has meta description`);
  assert(content.includes('css/style.css'), `${p} links css/style.css`);
  assert(content.includes('js/main.js'), `${p} links js/main.js`);
  assert(content.includes('+91 96000 21777') || content.includes('+919600021777'), `${p} contains primary phone +91 96000 21777`);
  assert(content.includes('+91 4425580832') || content.includes('+914425580832'), `${p} contains landline phone +91 4425580832`);
  assert(content.toLowerCase().includes('sunday') && content.toLowerCase().includes('appointment'), `${p} clearly notes Sunday by appointment`);
  assert(content.includes('application/ld+json'), `${p} includes structured data JSON-LD`);
}

// 2. Verify Key Assets Exist
const assets = [
  'assets/logo.png',
  'assets/logo.webp',
  'assets/tooth-fairy-mark.png',
  'assets/tooth-fairy-mark.webp',
  'assets/favicon.png',
  'assets/dr-tamanna-surgery.jpg',
  'assets/dr-tamanna-surgery.webp',
  'assets/dr-tamanna-portrait.jpg',
  'assets/dr-tamanna-portrait.webp',
  'assets/teeth-before.jpg',
  'assets/teeth-before.webp',
  'assets/teeth-after.jpg',
  'assets/teeth-after.webp',
];

console.log('\n--- VERIFYING ASSET INTEGRITY ---');
for (const a of assets) {
  const p = path.resolve(a);
  assert(fs.existsSync(p) && fs.statSync(p).size > 0, `Asset ${a} exists and is non-empty (${fs.existsSync(p) ? fs.statSync(p).size : 0} bytes)`);
}

// 3. Technical SEO Assets
console.log('\n--- VERIFYING TECHNICAL SEO ASSETS ---');
assert(fs.existsSync('sitemap.xml'), 'sitemap.xml exists');
assert(fs.existsSync('robots.txt'), 'robots.txt exists');
const sitemap = fs.readFileSync('sitemap.xml', 'utf-8');
assert(sitemap.includes('https://toothfairydental.in/'), 'sitemap.xml includes root URL');
assert(sitemap.includes('https://toothfairydental.in/about'), 'sitemap.xml includes /about URL');
assert(sitemap.includes('https://toothfairydental.in/treatments'), 'sitemap.xml includes /treatments URL');
assert(sitemap.includes('https://toothfairydental.in/contact'), 'sitemap.xml includes /contact URL');

// 4. Docker & Deployment Assets
console.log('\n--- VERIFYING DEPLOYMENT CONFIGURATION ---');
assert(fs.existsSync('Dockerfile'), 'Dockerfile exists for production deployment');
assert(fs.existsSync('nginx.conf'), 'nginx.conf exists for clean URL routing and static caching');
const nginx = fs.readFileSync('nginx.conf', 'utf-8');
assert(nginx.includes('try_files $uri $uri.html'), 'nginx.conf supports clean URL fallbacks');

console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('All automated integrity tests passed successfully!');
}
