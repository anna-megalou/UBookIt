#!/usr/bin/env node

/**
 * Deployment Package Script
 * Prepares the application for deployment to Fezila Client
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const DEPLOY_DIR = 'deploy';
const PACKAGE_NAME = 'ubookit-deployment.zip';

console.log('📦 Preparing deployment package for Fezila Client...\n');

(async () => {
  try {
    // Step 1: Clean previous deployment package
    if (fs.existsSync(DEPLOY_DIR)) {
      console.log('🧹 Cleaning previous deployment directory...');
      fs.rmSync(DEPLOY_DIR, { recursive: true, force: true });
    }

    if (fs.existsSync(PACKAGE_NAME)) {
      console.log('🧹 Removing previous package...');
      fs.unlinkSync(PACKAGE_NAME);
    }

    // Step 2: Build the application
    console.log('🔨 Building application for production...\n');
    execSync('npm run export', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });

    // Step 3: Verify dist directory exists
    if (!fs.existsSync('dist')) {
      throw new Error('Build failed: dist directory not found');
    }

    // Step 4: Create deployment directory structure
    console.log('\n📁 Creating deployment package structure...');
    fs.mkdirSync(DEPLOY_DIR, { recursive: true });

    // Step 5: Copy dist files to deployment directory
    console.log('📋 Copying build files...');
    copyRecursiveSync('dist', path.join(DEPLOY_DIR, 'dist'));

    // Step 6: Copy public assets if needed (they should already be in dist)
    if (fs.existsSync('public') && fs.statSync('public').isDirectory()) {
      const publicFiles = fs.readdirSync('public');
      if (publicFiles.length > 0) {
        console.log('📋 Copying public assets...');
        copyRecursiveSync('public', path.join(DEPLOY_DIR, 'public'));
      }
    }

    // Step 7: Create deployment info file
    console.log('📝 Creating deployment info...');
    const deploymentInfo = {
      appName: 'UBookIt',
      version: require('../package.json').version,
      buildDate: new Date().toISOString(),
      basePath: '/ismgroup17/ubookit',
      nodeVersion: process.version,
      deploymentInstructions: [
        '1. Open Fezila Client application',
        '2. Import this package or select the dist/ folder',
        '3. Configure basePath as /ismgroup17/ubookit',
        '4. Enable SPA routing in Fezila Client settings',
        '5. Deploy/Publish the application'
      ]
    };

    fs.writeFileSync(
      path.join(DEPLOY_DIR, 'deployment-info.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );

    // Step 8: Create README for deployment
    const readmeContent = `# UBookIt Deployment Package

## Package Contents

- \`dist/\` - Static build files (copy to web server)
- \`public/\` - Public assets (if separate from dist)
- \`deployment-info.json\` - Deployment metadata

## Deployment Steps for Fezila Client

1. Open Fezila Client application
2. Create a new project or select existing project
3. Import this package (zip file) or select the \`dist/\` folder directly
4. Configure the following settings in Fezila Client:
   - **Base Path**: \`/ismgroup17/ubookit\`
   - **Project Type**: Static Website / SPA
   - **Enable SPA Routing**: Yes (for client-side routing)
5. Deploy/Publish the application through Fezila Client interface

## Fezila Client Configuration

### Required Settings in Fezila Client:

1. **Base Path Configuration**
   - Set base path to: \`/ismgroup17/ubookit\`
   - This ensures all routes and assets use the correct path

2. **SPA Routing**
   - Enable "Single Page Application" mode
   - Enable "Client-side routing" or "SPA fallback"
   - This ensures all routes fallback to \`index.html\`

3. **Static File Serving**
   - Ensure static files are served correctly
   - Verify MIME types are configured properly

### Alternative: Manual Server Configuration (if Fezila Client uses a web server)

If Fezila Client deploys to a web server, you may need to configure:

**Apache (.htaccess)**
\`\`\`
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /ismgroup17/ubookit/
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /ismgroup17/ubookit/index.html [L]
</IfModule>
\`\`\`

**Nginx**
\`\`\`
location /ismgroup17/ubookit {
  try_files $uri $uri/ /ismgroup17/ubookit/index.html;
}
\`\`\`

## Verification

After deployment, visit:
\`https://your-server.com/ismgroup17/ubookit\`

Check browser console for any 404 errors or missing assets.

## Build Information

- Version: ${deploymentInfo.version}
- Build Date: ${deploymentInfo.buildDate}
- Node Version: ${deploymentInfo.nodeVersion}
`;

    fs.writeFileSync(path.join(DEPLOY_DIR, 'README-DEPLOYMENT.md'), readmeContent);

    // Step 9: Create zip package
    console.log('🗜️  Creating zip package...');
    await createZipPackage(DEPLOY_DIR, PACKAGE_NAME);

    // Step 10: Calculate package size
    const stats = fs.statSync(PACKAGE_NAME);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n✅ Deployment package created successfully!');
    console.log(`📦 Package: ${PACKAGE_NAME}`);
    console.log(`📊 Size: ${sizeInMB} MB`);
    console.log(`📁 Location: ${path.resolve(PACKAGE_NAME)}`);
    console.log('\n📤 Ready to deploy to Fezila Client!');
    console.log('\n💡 Next steps:');
    console.log('   1. Open Fezila Client application');
    console.log('   2. Import the zip file or select the dist/ folder');
    console.log('   3. Configure basePath: /ismgroup17/ubookit');
    console.log('   4. Enable SPA routing in Fezila Client settings');
    console.log('   5. Deploy/Publish the application');
    console.log('   6. Follow instructions in README-DEPLOYMENT.md');

  } catch (error) {
    console.error('\n❌ Deployment package creation failed:', error.message);
    process.exit(1);
  }
})();

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

// Helper function to create zip package
async function createZipPackage(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    output.on('close', () => {
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

