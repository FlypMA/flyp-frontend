#!/bin/bash

# 🚀 Production Environment Setup Script
# This script helps you set up the required environment variables for production

echo "🚀 Setting up Production Environment Variables"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the upswitch-frontend directory"
    exit 1
fi

echo ""
echo "📋 Required Environment Variables:"
echo "=================================="
echo "1. VITE_SUPABASE_URL=https://your-project-id.supabase.co"
echo "2. VITE_SUPABASE_ANON_KEY=your-supabase-anon-key"
echo ""

echo "🔧 How to get your Supabase credentials:"
echo "========================================"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Select your project (or create a new one)"
echo "3. Go to Settings > API"
echo "4. Copy the 'Project URL' and 'anon public' key"
echo ""

echo "🌐 Deployment Platform Setup:"
echo "============================="
echo ""
echo "For Vercel:"
echo "1. Go to your Vercel project dashboard"
echo "2. Click on 'Settings' tab"
echo "3. Click on 'Environment Variables'"
echo "4. Add the two variables above"
echo "5. Redeploy your application"
echo ""
echo "For Railway:"
echo "1. Go to your Railway project dashboard"
echo "2. Click on 'Variables' tab"
echo "3. Add the two variables above"
echo "4. Redeploy your application"
echo ""

echo "✅ After setting up environment variables:"
echo "=========================================="
echo "1. Redeploy your application"
echo "2. Test login/signup functionality"
echo "3. Check browser console for any remaining errors"
echo ""

echo "🔍 Current Environment Check:"
echo "============================="
if [ -f ".env.local" ]; then
    echo "📁 Found .env.local file"
    if grep -q "VITE_SUPABASE_URL" .env.local; then
        echo "✅ VITE_SUPABASE_URL is set"
    else
        echo "❌ VITE_SUPABASE_URL is missing"
    fi
    if grep -q "VITE_SUPABASE_ANON_KEY" .env.local; then
        echo "✅ VITE_SUPABASE_ANON_KEY is set"
    else
        echo "❌ VITE_SUPABASE_ANON_KEY is missing"
    fi
else
    echo "❌ No .env.local file found"
fi

echo ""
echo "🚨 If you're still getting ERR_NAME_NOT_RESOLVED errors:"
echo "======================================================"
echo "1. Double-check your Supabase URL format"
echo "2. Ensure your Supabase project is active"
echo "3. Verify the anon key is correct"
echo "4. Check that environment variables are set in production"
echo ""

echo "📞 Need help? Check the PRODUCTION_DEPLOYMENT.md file for detailed instructions."
