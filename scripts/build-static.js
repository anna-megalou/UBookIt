#!/usr/bin/env node

/**
 * Build script for static export
 * This script runs Next.js build which automatically exports static files
 * to the dist/ directory (configured in next.config.ts)
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting static export build...\n');

try {
  // Set NODE_ENV to production to ensure basePath is applied
  process.env.NODE_ENV = 'production';
  
  // Run Next.js build (which will export static files due to output: 'export' in next.config.ts)
  console.log('📦 Running Next.js build...');
  execSync('next build', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
  
  console.log('\n✅ Static export completed successfully!');
  console.log('📁 Output directory: dist/');
  console.log('🌐 Base path: /ismgroup17/ubookit');
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}



