#!/bin/bash

# =============================================================================
# UPSWITCH FRONTEND DEVELOPMENT ENVIRONMENT SETUP
# =============================================================================
# This script sets up the development environment with dev bypass authentication
# =============================================================================

echo "🚀 Setting up UpSwitch Frontend Development Environment"
echo "=========================================================="

# Create development .env file
cat > .env.development << 'EOF'
# =============================================================================
# UPSWITCH FRONTEND DEVELOPMENT ENVIRONMENT
# =============================================================================
# Development configuration with dev bypass authentication enabled
# This allows testing all dashboards without authentication
# =============================================================================

# =============================================================================
# BACKEND API CONFIGURATION
# =============================================================================
# Railway Backend (verified working)
VITE_API_URL=https://web-production-8d00b.up.railway.app
VITE_API_URL_DEV=https://web-production-8d00b.up.railway.app

# AI Backend Configuration
VITE_AI_API_URL=https://ilara-deep-end-artemis-production.up.railway.app

# =============================================================================
# ENVIRONMENT SETTINGS
# =============================================================================
VITE_ENVIRONMENT=development
NODE_ENV=development

# =============================================================================
# DEVELOPMENT BYPASS SETTINGS
# =============================================================================
# 🚨 DEVELOPMENT BYPASS: Enable to test all dashboards without authentication
VITE_DEV_BYPASS_AUTH=true
VITE_DEV_SKIP_EMAIL_VERIFICATION=true
VITE_DEV_ENABLE_DEBUG_MODE=true
VITE_DEV_SHOW_ERROR_DETAILS=true

# =============================================================================
# SUPABASE CONFIGURATION (VERIFIED WORKING)
# =============================================================================
VITE_SUPABASE_URL=https://falgeqzvvjtoahrppqsy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbGdlcXp2dmp0b2FocnBwcXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTk5MTQsImV4cCI6MjA3MTY5NTkxNH0.PsMflaeikjL1-EyobO3gnm2xLBRsvGxyegHea23scSM

# =============================================================================
# FEATURE FLAGS
# =============================================================================
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_MONITORING=true
VITE_ENABLE_FEEDBACK=true
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_API=false

# =============================================================================
# PERFORMANCE SETTINGS
# =============================================================================
VITE_ENABLE_CACHING=true
VITE_ENABLE_COMPRESSION=true
VITE_LAZY_LOADING=true
VITE_PREFETCH_ROUTES=true

# =============================================================================
# AUTHENTICATION SETTINGS
# =============================================================================
VITE_AUTH_COOKIE_NAME=upswitch_auth_dev
VITE_REFRESH_TOKEN_KEY=upswitch_refresh_dev
VITE_JWT_SECRET=dev-secret-key-change-in-production

# =============================================================================
# EXTERNAL SERVICES (OPTIONAL)
# =============================================================================
# VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
# VITE_GOOGLE_ANALYTICS_ID=your_ga_id
# VITE_SENTRY_DSN=your_sentry_dsn
# VITE_MIXPANEL_TOKEN=your_mixpanel_token

# =============================================================================
# SECURITY SETTINGS
# =============================================================================
VITE_CSP_NONCE=dev-nonce
VITE_ENCRYPTION_KEY=dev-encryption-key-change-in-production

# =============================================================================
# DEVELOPMENT TOOLS
# =============================================================================
VITE_ENABLE_HOT_RELOAD=true
VITE_ENABLE_SOURCE_MAPS=true
VITE_ENABLE_ESLINT=true
VITE_ENABLE_TYPE_CHECK=true

# =============================================================================
# MOCK DATA SETTINGS
# =============================================================================
VITE_ENABLE_MOCK_DATA=false
VITE_MOCK_API_DELAY=1000

# =============================================================================
# TESTING SETTINGS
# =============================================================================
VITE_ENABLE_TESTING=true
VITE_TEST_API_URL=http://localhost:3001
VITE_TEST_SUPABASE_URL=https://test.supabase.co

# =============================================================================
# END OF DEVELOPMENT ENVIRONMENT CONFIGURATION
# =============================================================================
EOF

echo "✅ Development environment file created: .env.development"
echo ""

echo "🔧 DEVELOPMENT BYPASS FEATURES ENABLED:"
echo "   ✅ VITE_DEV_BYPASS_AUTH=true - Skip authentication checks"
echo "   ✅ VITE_DEV_SKIP_EMAIL_VERIFICATION=true - Skip email verification"
echo "   ✅ VITE_DEV_ENABLE_DEBUG_MODE=true - Enable debug logging"
echo "   ✅ VITE_DEV_SHOW_ERROR_DETAILS=true - Show detailed error messages"
echo ""

echo "🎯 WHAT THIS ENABLES:"
echo "   • Access to all protected routes without login"
echo "   • View all dashboards (buyer, seller, admin)"
echo "   • Test all features without authentication"
echo "   • Debug mode with detailed logging"
echo "   • Mock user data for testing"
echo ""

echo "🚀 STARTING DEVELOPMENT SERVER:"
echo "   npm run dev"
echo "   # or"
echo "   yarn dev"
echo ""

echo "🔗 ACCESS POINTS:"
echo "   • Frontend: http://localhost:5173"
echo "   • Backend Health: https://web-production-8d00b.up.railway.app/health"
echo "   • Supabase Dashboard: https://app.supabase.com/project/falgeqzvvjtoahrppqsy"
echo ""

echo "⚠️  IMPORTANT NOTES:"
echo "   • This bypass is ONLY for development"
echo "   • Never enable VITE_DEV_BYPASS_AUTH in production"
echo "   • Mock user data will be used for testing"
echo "   • All API calls will still work normally"
echo ""

echo "📋 AVAILABLE DASHBOARDS TO TEST:"
echo "   • /dashboard - Main dashboard"
echo "   • /dashboard/buyer - Buyer dashboard"
echo "   • /dashboard/seller - Seller dashboard"
echo "   • /dashboard/admin - Admin dashboard"
echo "   • /listings - Business listings"
echo "   • /search - Search functionality"
echo "   • /profile - User profile"
echo "   • /settings - Account settings"
echo ""

echo "🎉 DEVELOPMENT ENVIRONMENT READY!"
echo "=================================="
