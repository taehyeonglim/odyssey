const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== [START] Comprehensive Odyssey & Iliad Project Audit ===");
let errorCount = 0;

function check(title, fn) {
  process.stdout.write(`• Checking ${title}... `);
  try {
    fn();
    console.log("PASSED ✅");
  } catch (err) {
    console.log(`FAILED ❌ -> ${err.message}`);
    errorCount++;
  }
}

// 1. Check all image assets exist and are > 0 bytes
check("Image assets on disk (all 8 character portraits + scene paintings)", () => {
  const images = [
    'hero_banner.jpg',
    'iliad_achilles_rage.jpg',
    'iliad_hector_duel.jpg',
    'iliad_trojan_horse.jpg',
    'odyssey_circe.jpg',
    'odyssey_cyclops.jpg',
    'odyssey_ithaca_return.jpg',
    'odyssey_sirens.jpg',
    'portrait_achilles.jpg',
    'portrait_odysseus.jpg',
    'portrait_athena.jpg',
    'portrait_hector.jpg',
    'portrait_penelope.jpg',
    'portrait_circe.jpg',
    'portrait_polyphemus.jpg',
    'portrait_agamemnon.jpg'
  ];
  for (const img of images) {
    const p = path.join(__dirname, '../public/assets/images', img);
    if (!fs.existsSync(p)) throw new Error(`Missing image: ${img}`);
    const stat = fs.statSync(p);
    if (stat.size === 0) throw new Error(`Empty image file: ${img}`);
  }
});

// 2. TypeScript compilation check
check("TypeScript type check (tsc --noEmit)", () => {
  const output = execSync('npx tsc --noEmit', { stdio: 'pipe' }).toString();
  if (output.trim().length > 0) {
    throw new Error(`TypeScript errors:\n${output}`);
  }
});

// 3. Vite production build check
check("Vite production build (npx vite build)", () => {
  const output = execSync('npx vite build', { stdio: 'pipe' }).toString();
  if (!fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
    throw new Error("dist/index.html was not generated");
  }
});

// 4. Dist bundle & assets integrity
check("Dist bundle & assets integrity", () => {
  const distAssets = fs.readdirSync(path.join(__dirname, '../dist/assets'));
  const jsFile = distAssets.find(f => f.endsWith('.js'));
  const cssFile = distAssets.find(f => f.endsWith('.css'));
  if (!jsFile) throw new Error("No JS bundle found in dist/assets");
  if (!cssFile) throw new Error("No CSS bundle found in dist/assets");
});

// 5. GitHub Actions workflow syntax check
check("GitHub Actions workflow (.github/workflows/deploy.yml)", () => {
  const workflowPath = path.join(__dirname, '../.github/workflows/deploy.yml');
  if (!fs.existsSync(workflowPath)) throw new Error("deploy.yml does not exist");
  const content = fs.readFileSync(workflowPath, 'utf8');
  if (!content.includes('actions/deploy-pages')) throw new Error("Missing deploy-pages step in deploy.yml");
});

console.log("\n==========================================");
console.log(`Audit Finished. Total Errors: ${errorCount}`);
console.log("==========================================\n");

if (errorCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
