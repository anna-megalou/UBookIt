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

  // Build the project
  execSync('next build', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
