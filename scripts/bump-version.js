#!/usr/bin/env node
/**
 * Bump the patch version in .claude-plugin/plugin.json
 */
const fs = require('fs');
const path = require('path');

const pluginJsonPath = path.join(__dirname, '..', '.claude-plugin', 'plugin.json');

try {
  const content = fs.readFileSync(pluginJsonPath, 'utf8');
  const obj = JSON.parse(content);
  
  const [major, minor, patch] = obj.version.split('.').map(Number);
  const newVersion = `${major}.${minor}.${patch + 1}`;
  
  obj.version = newVersion;
  
  fs.writeFileSync(pluginJsonPath, JSON.stringify(obj, null, 2) + '\n');
  
  console.log(`Version bumped: ${obj.version}`);
  process.exit(0);
} catch (error) {
  console.error('Error bumping version:', error.message);
  process.exit(1);
}
