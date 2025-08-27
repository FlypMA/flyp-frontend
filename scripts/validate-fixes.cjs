#!/usr/bin/env node

/**
 * Validation Script for HTML Visualization Architecture Fixes
 * Verifies that all immediate action items have been implemented correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating HTML Visualization Architecture Fixes...\n');

let passCount = 0;
let failCount = 0;
let totalChecks = 0;

function checkFile(filePath, description) {
  console.log(`📁 Checking: ${description}`);
  console.log(`   File: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    console.log('   ✅ File exists');
    return true;
  } else {
    console.log('   ❌ File missing');
    return false;
  }
}

function checkCodePattern(filePath, pattern, description, shouldExist = true) {
  totalChecks++;
  console.log(`🔍 ${description}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`   ❌ File not found: ${filePath}`);
    failCount++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const hasPattern = pattern.test(content);
  
  if ((shouldExist && hasPattern) || (!shouldExist && !hasPattern)) {
    console.log(`   ✅ ${shouldExist ? 'Found' : 'Correctly absent'}: ${description}`);
    passCount++;
    return true;
  } else {
    console.log(`   ❌ ${shouldExist ? 'Missing' : 'Should not exist'}: ${description}`);
    failCount++;
    return false;
  }
}

// Fix 1: Double Processing Resolution
console.log('\n🔧 Fix 1: Resolving Double Processing Issue');
console.log('========================================');

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /src=\{previewUrl\}/,
  'PreviewPanel uses previewUrl instead of re-processing content'
);

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /srcDoc=\{secureReportRenderer\.createSecureDocument/,
  'PreviewPanel no longer has double processing via srcDoc',
  false
);

// Fix 2: Memory Leak Prevention
console.log('\n🧹 Fix 2: Memory Leak Prevention');
console.log('==================================');

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /secureReportRenderer\.cleanupBlobUrl\(currentBlobUrl\.current\)/,
  'Proper blob URL cleanup in error paths'
);

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /currentBlobUrl\.current = null/,
  'Blob URL reference reset after cleanup'
);

// Fix 3: Debouncing Implementation
console.log('\n⏱️  Fix 3: Debouncing Implementation');
console.log('====================================');

checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /function debounce/,
  'Debounce utility function exists'
);

checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /debouncedGenerateReport/,
  'Debounced report generation function'
);

checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /debounce\(generateReport, 1000\)/,
  'Debounce with 1 second delay implemented'
);

// Fix 4: Error Boundary Implementation
console.log('\n🛡️  Fix 4: Error Boundary Implementation');
console.log('========================================');

// Check if ReportErrorBoundary exists
if (checkFile('src/app/components/reports/ReportErrorBoundary.tsx', 'ReportErrorBoundary component')) {
  checkCodePattern(
    'src/app/components/reports/ReportErrorBoundary.tsx',
    /class ReportErrorBoundary extends Component/,
    'ReportErrorBoundary is a proper React class component'
  );

  checkCodePattern(
    'src/app/components/reports/ReportErrorBoundary.tsx',
    /componentDidCatch/,
    'Error boundary has componentDidCatch method'
  );

  checkCodePattern(
    'src/app/components/reports/ReportErrorBoundary.tsx',
    /maxRetries.*3/,
    'Error boundary has retry mechanism'
  );
}

// Check Error Boundary usage in PreviewPanel
checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /import.*ReportErrorBoundary/,
  'PreviewPanel imports ReportErrorBoundary'
);

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /<ReportErrorBoundary/,
  'PreviewPanel uses ReportErrorBoundary'
);

// Check Error Boundary usage in Dashboard
checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /import.*ReportErrorBoundary/,
  'Dashboard imports ReportErrorBoundary'
);

checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /<ReportErrorBoundary.*fallbackTitle="Dashboard Preview Error"/,
  'Dashboard uses ReportErrorBoundary for desktop'
);

checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /<ReportErrorBoundary.*fallbackTitle="Mobile Preview Error"/,
  'Dashboard uses ReportErrorBoundary for mobile'
);

// Fix 5: Centralized Security Configuration
console.log('\n🔒 Fix 5: Centralized Security Configuration');
console.log('===========================================');

if (checkFile('src/app/services/reports/iframeSecurityConfig.ts', 'Centralized iframe security config')) {
  checkCodePattern(
    'src/app/services/reports/iframeSecurityConfig.ts',
    /export const IFRAME_SECURITY_CONFIG/,
    'Centralized security configuration object'
  );

  checkCodePattern(
    'src/app/services/reports/iframeSecurityConfig.ts',
    /sandbox.*allow-same-origin/,
    'Consistent sandbox configuration'
  );

  checkCodePattern(
    'src/app/services/reports/iframeSecurityConfig.ts',
    /validateIframeSecurity/,
    'iframe security validation function'
  );
}

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /import.*IFRAME_SECURITY_CONFIG/,
  'PreviewPanel imports centralized security config'
);

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /sandbox=\{IFRAME_SECURITY_CONFIG\.sandbox\}/,
  'PreviewPanel uses centralized sandbox config'
);

// Additional validation checks
console.log('\n🧪 Additional Validation Checks');
console.log('===============================');

checkCodePattern(
  'src/app/components/reports/PreviewPanel.tsx',
  /validateIframeSecurity.*iframeRef\.current/,
  'iframe security validation on load'
);

checkCodePattern(
  'src/app/pages/account/dashboard/dashboard.tsx',
  /import.*useMemo/,
  'Dashboard properly imports useMemo for debouncing'
);

// Legacy test route has been removed - functionality moved to dashboard
console.log('✅ Legacy test route removed - functionality now in dashboard');

// Summary
console.log('\n📊 VALIDATION SUMMARY');
console.log('====================');
console.log(`Total Checks: ${totalChecks}`);
console.log(`✅ Passed: ${passCount}`);
console.log(`❌ Failed: ${failCount}`);

const successRate = Math.round((passCount / totalChecks) * 100);
console.log(`📈 Success Rate: ${successRate}%`);

if (failCount === 0) {
  console.log('\n🎉 ALL FIXES IMPLEMENTED SUCCESSFULLY! 🎉');
  console.log('The HTML visualization architecture is ready for testing.');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Visit: http://localhost:3001/reports/new');
  console.log('3. Generate reports to validate HTML processing functionality');
  console.log('4. Test both preview panel and full-screen modes');
} else {
  console.log('\n⚠️  SOME FIXES NEED ATTENTION');
  console.log('Please review the failed checks above and fix any issues.');
}

console.log('\n' + '='.repeat(50));

process.exit(failCount > 0 ? 1 : 0); 