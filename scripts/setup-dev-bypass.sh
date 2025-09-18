#!/bin/bash

# =============================================================================
# FLYP FRONTEND DEVELOPMENT BYPASS SETUP
# =============================================================================
# This script sets up the development environment with dev bypass authentication
# =============================================================================

echo "🚀 Setting up Flyp Frontend Development Bypass"
echo "=========================================================="

# Create development .env.local file with dev bypass enabled
cat > .env.local << 'EOF'
# =============================================================================
# FLYP FRONTEND DEVELOPMENT ENVIRONMENT WITH BYPASS
# =============================================================================
# Development configuration with dev bypass authentication enabled
# This allows testing all dashboards without authentication
# =============================================================================

# =============================================================================
# SUPABASE CONFIGURATION
# =============================================================================
VITE_SUPABASE_URL=https://falgeqzvvjtoahrppqsy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbGdlcXp2dmp0b2FocnBwcXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTk5MTQsImV4cCI6MjA3MTY5NTkxNH0.PsMflaeikjL1-EyobO3gnm2xLBRsvGxyegHea23scSM

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
# API CONFIGURATION
# =============================================================================
VITE_API_BASE_URL=http://localhost:3001
VITE_API_TIMEOUT=30000

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
# DEMO MODE (for production showcase)
# =============================================================================
VITE_DEMO_MODE=false

# =============================================================================
# END OF DEVELOPMENT ENVIRONMENT CONFIGURATION
# =============================================================================
EOF

echo "✅ Development environment file created: .env.local"
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
echo "   yarn dev"
echo ""

echo "🌐 ACCESS PROTECTED AREAS:"
echo "   • Business Dashboard: http://localhost:3000/my-business"
echo "   • User Settings: http://localhost:3000/account/settings"
echo "   • Messages: http://localhost:3000/messages"
echo "   • All other protected routes work without login"
echo ""

echo "🚨 WARNING: This is for development only!"
echo "   Make sure to disable bypass in production by setting:"
echo "   VITE_DEV_BYPASS_AUTH=false"
echo ""

# Make script executable
chmod +x "$0"

echo "✅ Development bypass setup complete!"
echo "Run 'yarn dev' to start the development server with bypass enabled."
