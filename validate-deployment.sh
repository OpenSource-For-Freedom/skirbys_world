#!/bin/bash

# GitHub Pages Deployment Validation Script
# This script validates that the game deployment is properly configured

echo "🔍 Validating GitHub Pages Deployment Setup..."

# Check if required files exist
REQUIRED_FILES=(
    ".github/workflows/deploy.yml"
    "index.php"
    "src/player.js"
    "src/platforms.js" 
    "src/boss.js"
    "public/game.js"
    "public/styles.css"
    "package.json"
)

echo "📁 Checking required files..."
for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ Found: $file"
    else
        echo "❌ Missing: $file"
        exit 1
    fi
done

# Check if build works
echo "🔨 Testing build process..."
if npm run build; then
    echo "✅ Build process successful"
else
    echo "❌ Build process failed"
    exit 1
fi

# Validate dist folder contents
echo "📂 Validating dist folder..."
DIST_FILES=(
    "dist/index.html"
    "dist/src/player.js"
    "dist/public/game.js"
    "dist/IMG_2133.jpeg"
)

for file in "${DIST_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ Built: $file"
    else
        echo "❌ Missing in dist: $file"
        exit 1
    fi
done

# Check that index.html has proper module imports
echo "🔗 Checking module imports..."
if grep -q "public/game.js" dist/index.html; then
    echo "✅ Module imports found in index.html"
else
    echo "❌ Module imports not found in index.html"
    exit 1
fi

echo "🎉 GitHub Pages deployment validation passed!"
echo "🌐 Game should be deployable to: https://your-username.github.io/skirbys_world/"