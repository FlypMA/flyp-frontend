#!/usr/bin/env node

import fs from 'fs';
import { glob } from 'glob';

// Function to remove console statements from a file
function removeConsoleStatements(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Remove console.log, console.warn, console.error, console.info statements
    // This regex matches console statements that are on their own line or part of a statement
    content = content.replace(/^\s*console\.(log|warn|error|info|debug)\([^)]*\);\s*$/gm, '');

    // Remove console statements that are part of larger expressions (more complex)
    content = content.replace(/console\.(log|warn|error|info|debug)\([^)]*\);\s*/g, '');

    // Clean up empty lines that might be left behind
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned console statements from: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to process all TypeScript/JavaScript files
async function processFiles() {
  const patterns = ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'];

  let totalFiles = 0;
  let cleanedFiles = 0;

  for (const pattern of patterns) {
    const files = await glob(pattern, {
      cwd: process.cwd(),
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/*.d.ts', '**/scripts/**'],
    });

    files.forEach(file => {
      totalFiles++;
      if (removeConsoleStatements(file)) {
        cleanedFiles++;
      }
    });
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files cleaned: ${cleanedFiles}`);
  console.log(`   Files unchanged: ${totalFiles - cleanedFiles}`);
}

// Run the script
console.log('🧹 Removing console statements from production code...\n');
processFiles()
  .then(() => {
    console.log('\n✅ Console statement removal complete!');
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
