import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
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
  const content = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CLM Setup Guide</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>`;

  writeFileSync(join('dist', '404.html'), content);
}

// Move files from dist/client to dist
const distDir = 'dist';
const clientDir = join(distDir, 'client');

// Copy all files from dist/client to dist
copyDir(clientDir, distDir);

// Create 404.html for SPA routing
create404Html();

console.log('Post-build: Files moved successfully'); 