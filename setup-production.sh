#!/bin/bash

# =============================================================================
# BETWEENDEALS FRONTEND PRODUCTION SETUP
# =============================================================================

echo "🚀 Setting up BetweenDeals Frontend PRODUCTION Environment"
echo "=========================================================="

# Create production .env file
cat > .env.production << 'EOF'
# =============================================================================
# BETWEENDEALS FRONTEND PRODUCTION ENVIRONMENT
# =============================================================================

# Production Environment
VITE_ENVIRONMENT=production

# Backend API Configuration - Railway Production Backend
VITE_API_URL=https://web-production-2edf5.up.railway.app
VITE_API_URL_DEV=https://web-production-2edf5.up.railway.app

# AI Backend Configuration - Railway Production Backend
VITE_AI_API_URL=https://ilara-deep-end-artemis-production.up.railway.app

# Production Security Settings
VITE_DEV_BYPASS_AUTH=false

# Supabase Configuration (Production)
VITE_SUPABASE_URL=https://falgeqzvvjtoahrppqsy.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key_here

# Production Performance Settings
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
VITE_ENABLE_PERFORMANCE_MONITORING=true

# Production Feature Flags
VITE_ENABLE_CHAT=true
VITE_ENABLE_REPORTS=true
VITE_ENABLE_BILLING=true
VITE_ENABLE_ANALYTICS_DASHBOARD=true

# Production URLs
VITE_FRONTEND_URL=https://betweendeals-platform-web.vercel.app
VITE_BACKEND_URL=https://web-production-2edf5.up.railway.app
VITE_AI_BACKEND_URL=https://ilara-deep-end-artemis-production.up.railway.app
EOF

echo "✅ Production environment file created: .env.production"
echo ""
echo "⚠️  IMPORTANT: Update the following in .env.production:"
echo "   1. VITE_SUPABASE_ANON_KEY - Add your production Supabase anon key"
echo ""
echo "🔗 Get your Supabase keys from:"
echo "   https://app.supabase.com/project/falgeqzvvjtoahrppqsy/settings/api"
echo ""
echo "📝 Production deployment commands:"
echo "   npm run build"
echo "   npm run preview"
echo ""
echo "🚀 Vercel deployment will automatically use .env.production"
