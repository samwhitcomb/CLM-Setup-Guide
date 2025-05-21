import { copyFileSync, mkdirSync, readdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Function to recursively copy files
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// Create 404.html for SPA routing
function create404Html() {
  // Read the index.html file
  const indexHtml = readFileSync(join('dist', 'index.html'), 'utf-8');
  
  // Create 404.html with the same content as index.html
  writeFileSync(join('dist', '404.html'), indexHtml);
  
  // Create a .nojekyll file to prevent GitHub Pages from processing the site with Jekyll
  writeFileSync(join('dist', '.nojekyll'), '');
}

// Move files from dist/client to dist
const distDir = 'dist';
const clientDir = join(distDir, 'client');

// Copy all files from dist/client to dist
copyDir(clientDir, distDir);

// Create 404.html for SPA routing
create404Html();

console.log('Post-build: Files moved successfully'); 