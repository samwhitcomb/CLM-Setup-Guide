import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
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

// Move files from dist/client to dist
const distDir = 'dist';
const clientDir = join(distDir, 'client');

// Copy all files from dist/client to dist
copyDir(clientDir, distDir);

console.log('Post-build: Files moved successfully'); 