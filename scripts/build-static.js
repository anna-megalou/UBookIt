#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building static export...');

try {
  // Clean previous build
  if (fs.existsSync('dist')) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build the project with production environment to ensure basePath is used
  execSync('next build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
