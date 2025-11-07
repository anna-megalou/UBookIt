#!/usr/bin/env node

/**
 * Prepare Static Files for Fezila Client
 * This script creates a clean static files directory excluding server-side code
 */

const fs = require('fs');
const path = require('path');

const STATIC_DIR = 'static-files';
const DIST_DIR = 'dist';

console.log('📦 Preparing static files for Fezila Client deployment...\n');

try {
  // Step 1: Clean previous static files directory
  if (fs.existsSync(STATIC_DIR)) {
    console.log('🧹 Cleaning previous static files directory...');
    fs.rmSync(STATIC_DIR, { recursive: true, force: true });
  }

  // Step 2: Verify dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('dist directory not found. Please run "npm run export" first.');
  }

  // Step 3: Create static files directory
  console.log('📁 Creating static files directory...');
  fs.mkdirSync(STATIC_DIR, { recursive: true });

  // Step 4: Copy only necessary files (exclude server directory)
  console.log('📋 Copying static files (excluding server directory)...\n');

  const itemsToCopy = [
    'static',           // Static assets (CSS, JS, images)
    'build',            // Build chunks
    'cache',            // Cache files
    '*.json',           // Manifest files
    '*.js',             // Root JS files (if any)
    '*.map',            // Source maps (optional)
  ];

  // Copy static directory
  if (fs.existsSync(path.join(DIST_DIR, 'static'))) {
    console.log('  ✓ Copying static/ directory...');
    copyRecursiveSync(
      path.join(DIST_DIR, 'static'),
      path.join(STATIC_DIR, 'static')
    );
  }

  // Copy build directory
  if (fs.existsSync(path.join(DIST_DIR, 'build'))) {
    console.log('  ✓ Copying build/ directory...');
    copyRecursiveSync(
      path.join(DIST_DIR, 'build'),
      path.join(STATIC_DIR, 'build')
    );
  }

  // Copy cache directory
  if (fs.existsSync(path.join(DIST_DIR, 'cache'))) {
    console.log('  ✓ Copying cache/ directory...');
    copyRecursiveSync(
      path.join(DIST_DIR, 'cache'),
      path.join(STATIC_DIR, 'cache')
    );
  }

  // Copy JSON manifest files from root
  const jsonFiles = fs.readdirSync(DIST_DIR).filter(file => 
    file.endsWith('.json') && fs.statSync(path.join(DIST_DIR, file)).isFile()
  );
  
  if (jsonFiles.length > 0) {
    console.log('  ✓ Copying manifest files...');
    jsonFiles.forEach(file => {
      fs.copyFileSync(
        path.join(DIST_DIR, file),
        path.join(STATIC_DIR, file)
      );
    });
  }

  // Check for HTML files or basePath directory
  const distContents = fs.readdirSync(DIST_DIR);
  const hasBasePathDir = distContents.some(item => {
    const fullPath = path.join(DIST_DIR, item);
    return fs.statSync(fullPath).isDirectory() && item === 'ismgroup17';
  });

  if (hasBasePathDir) {
    console.log('  ✓ Copying ismgroup17/ directory (basePath)...');
    copyRecursiveSync(
      path.join(DIST_DIR, 'ismgroup17'),
      path.join(STATIC_DIR, 'ismgroup17')
    );
  } else {
    // Check for HTML files in root
    const htmlFiles = fs.readdirSync(DIST_DIR).filter(file => 
      file.endsWith('.html') && fs.statSync(path.join(DIST_DIR, file)).isFile()
    );
    
    if (htmlFiles.length > 0) {
      console.log('  ✓ Copying HTML files...');
      htmlFiles.forEach(file => {
        fs.copyFileSync(
          path.join(DIST_DIR, file),
          path.join(STATIC_DIR, file)
        );
      });
    } else {
      console.log('  ⚠️  No HTML files found. The build may not have completed successfully.');
      console.log('     Please run "npm run export" and check for build errors.');
    }
  }

  // Step 5: Create README
  const readmeContent = `# Static Files for Fezila Client

This directory contains only the static files needed for deployment.
The \`server\` directory has been excluded as it's not needed for static hosting.

## What to Upload to Fezila Client

Upload the entire contents of this \`static-files\` directory to:
\`/ismgroup17/ubookit/\` on your server

## Important Notes

- Do NOT upload the \`server\` directory
- Upload all files from this directory maintaining the folder structure
- Ensure basePath is set to \`/ismgroup17/ubookit\` in Fezila Client
- Enable SPA routing in Fezila Client settings

## Directory Structure

- \`static/\` - CSS, JS, and media files
- \`build/\` - Build chunks
- \`*.json\` - Manifest files
- HTML files (if present in root or in ismgroup17/ubookit/)
`;

  fs.writeFileSync(path.join(STATIC_DIR, 'README.txt'), readmeContent);

  console.log('\n✅ Static files prepared successfully!');
  console.log(`📁 Location: ${path.resolve(STATIC_DIR)}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Upload the contents of the "static-files" directory to Fezila Client');
  console.log('   2. Upload to: /ismgroup17/ubookit/ on your server');
  console.log('   3. Do NOT upload the "server" directory');
  console.log('   4. Configure basePath: /ismgroup17/ubookit in Fezila Client');

} catch (error) {
  console.error('\n❌ Failed to prepare static files:', error.message);
  process.exit(1);
}

// Helper function to copy directory recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

