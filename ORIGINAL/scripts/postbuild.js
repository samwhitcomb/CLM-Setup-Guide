import fs from 'fs';
import path from 'path';

// Function to recursively copy files
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Function to create 404.html for SPA routing
function create404Html() {
  const indexPath = path.join('dist', 'index.html');
  const notFoundPath = path.join('dist', '404.html');

  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    fs.writeFileSync(notFoundPath, indexContent);
    console.log('Created 404.html for SPA routing');
  }

  // Create .nojekyll file to prevent GitHub Pages from processing with Jekyll
  fs.writeFileSync(path.join('dist', '.nojekyll'), '');
  console.log('Created .nojekyll file');
}

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Create 404.html and .nojekyll
create404Html();

console.log('Post-build processing completed successfully'); 