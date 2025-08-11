#!/bin/bash

# GitHub Pages Deployment Validation Script  
# This script validates that the game deployment is properly configured

echo "🔍 Validating GitHub Pages Deployment Setup..."

# Check if required files exist
REQUIRED_FILES=(
    ".github/workflows/deploy.yml"
    "landing.html"
    "game.html" 
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
    "dist/game.html"
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

# Check version indicators in built file
echo "🏷️  Checking version indicators..."
EXPECTED_VERSION="v2.1.0"
if grep -q "$EXPECTED_VERSION" dist/index.html; then
    echo "✅ Version indicator found: $EXPECTED_VERSION"
else
    echo "❌ Version indicator not found in built file"
    exit 1
fi

# Check for UPDATED badge
echo "🆕 Checking for UPDATED badge..."
if grep -q "UPDATED" dist/index.html; then
    echo "✅ UPDATED badge found in landing page"
else
    echo "❌ UPDATED badge not found"
    exit 1
fi

# Check for build timestamp replacement
echo "⏰ Checking build timestamp replacement..."
if grep -q "Built:" dist/index.html && ! grep -q "{{ BUILD_DATE }}" dist/index.html; then
    echo "✅ Build timestamps properly replaced"
    BUILD_TIME=$(grep -o "Built:.*202[0-9][^<]*" dist/index.html | head -1)
    echo "   $BUILD_TIME"
else
    echo "❌ Build timestamp replacement failed"
    exit 1
fi

# Check for cache-busting headers
echo "🚫 Checking cache-busting headers..."
if grep -q "no-cache" dist/index.html; then
    echo "✅ Cache-busting headers found"
else
    echo "❌ Cache-busting headers not found"
    exit 1
fi

echo "🎉 GitHub Pages deployment validation passed!"
echo "🌐 Game should be deployable to: https://opensource-for-freedom.github.io/skirbys_world/"
echo ""
echo "🔥 New features added for visibility:"
echo "- Flashing version badge: '🚀 v2.1.0 - UPDATED! 🆕'"
echo "- Build timestamp in footer"
echo "- Cache-busting meta tags"
echo "- Live page indicators"
echo ""
echo "Users will now clearly see when the page has been updated!"