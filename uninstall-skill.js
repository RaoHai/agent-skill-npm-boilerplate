#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const { getEnabledTargets, extractSkillName, detectInstallLocation } = require('./utils');

function uninstallFromTarget(target, config) {
  console.log(`\n🗑️  Uninstalling from ${target.name}...`);

  const isGlobal = process.env.npm_config_global === 'true';
  const location = detectInstallLocation(target.paths, isGlobal);
  
  // Extract skill name from package name (remove scope prefix)
  const skillName = extractSkillName(config.name);
  
  // Path format using skill name
  const skillNameTargetDir = path.join(location.base, skillName);
  
  // Path format with full package name (including scope)
  const fullPackageNameTargetDir = path.join(location.base, config.name);
  
  let removed = false;
  
  // Check and remove path using skill name
  if (fs.existsSync(skillNameTargetDir)) {
    fs.rmSync(skillNameTargetDir, { recursive: true, force: true });
    console.log(`  ✓ Removed skill directory: ${skillName}`);
    removed = true;
  }
  
  // Check and remove path with full package name (for compatibility)
  if (fs.existsSync(fullPackageNameTargetDir) && fullPackageNameTargetDir !== skillNameTargetDir) {
    fs.rmSync(fullPackageNameTargetDir, { recursive: true, force: true });
    console.log(`  ✓ Removed skill directory: ${config.name}`);
    removed = true;
  }

  // Update manifest
  const manifestPath = path.join(location.base, '.skills-manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (manifest.skills && manifest.skills[config.name]) {
        delete manifest.skills[config.name];
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`  ✓ Updated manifest`);
      }
    } catch (error) {
      console.warn('  Warning: Could not update manifest:', error.message);
    }
  }

  if (removed) {
    console.log(`  ✅ Uninstalled from ${target.name}`);
    return true;
  } else {
    console.log(`  ℹ️  Skill was not installed in ${target.name}`);
    return false;
  }
}

function uninstallSkill() {
  console.log('🗑️  Uninstalling AI Coding Skill...\n');

  // Read configuration
  const configPath = path.join(__dirname, '.claude-skill.json');
  if (!fs.existsSync(configPath)) {
    console.warn('Warning: .claude-skill.json not found, skipping cleanup');
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Get enabled targets
  const enabledTargets = getEnabledTargets(config);

  console.log(`Uninstalling skill "${config.name}" from ${enabledTargets.length} target(s):`);
  enabledTargets.forEach(target => {
    console.log(`  • ${target.name}`);
  });

  // Uninstall from all enabled targets
  const uninstalledFrom = [];
  for (const target of enabledTargets) {
    try {
      const success = uninstallFromTarget(target, config);
      if (success) {
        uninstalledFrom.push(target.name);
      }
    } catch (error) {
      console.error(`\n❌ Failed to uninstall from ${target.name}:`, error.message);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  if (uninstalledFrom.length > 0) {
    console.log('✅ Uninstallation Complete!');
    console.log('='.repeat(60));
    console.log('\nUninstalled from:');
    uninstalledFrom.forEach(target => {
      console.log(`  • ${target}`);
    });
  } else {
    console.log('ℹ️  Skill was not installed');
    console.log('='.repeat(60));
  }
}

// Execute uninstall
try {
  uninstallSkill();
} catch (error) {
  console.error('\n⚠️  Warning during uninstall:', error.message);
  // Don't exit with error code as uninstall should be best-effort
}
