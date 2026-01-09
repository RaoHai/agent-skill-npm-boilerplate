#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function detectInstallLocation() {
  // 检测是否为全局安装
  const isGlobal = process.env.npm_config_global === 'true';

  if (isGlobal) {
    return {
      type: 'personal',
      base: path.join(os.homedir(), '.claude', 'skills')
    };
  } else {
    // 项目级安装：查找项目根目录
    let currentDir = process.cwd();
    let projectRoot = currentDir;

    while (projectRoot !== path.dirname(projectRoot)) {
      if (fs.existsSync(path.join(projectRoot, 'package.json')) ||
          fs.existsSync(path.join(projectRoot, '.git'))) {
        break;
      }
      projectRoot = path.dirname(projectRoot);
    }

    return {
      type: 'project',
      base: path.join(projectRoot, '.claude', 'skills')
    };
  }
}

function uninstallSkill() {
  console.log('🗑️  Uninstalling Claude Code Skill...\n');

  // 读取配置
  const configPath = path.join(__dirname, '.claude-skill.json');
  if (!fs.existsSync(configPath)) {
    console.warn('Warning: .claude-skill.json not found, skipping cleanup');
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const location = detectInstallLocation();
  const targetDir = path.join(location.base, config.name);

  console.log(`Uninstalling from: ${targetDir}`);

  if (fs.existsSync(targetDir)) {
    // 删除 skill 目录
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log('✓ Removed skill directory');

    // 更新 manifest
    const manifestPath = path.join(location.base, '.skills-manifest.json');
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        if (manifest.skills && manifest.skills[config.name]) {
          delete manifest.skills[config.name];
          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
          console.log('✓ Updated manifest');
        }
      } catch (error) {
        console.warn('Warning: Could not update manifest:', error.message);
      }
    }

    console.log('\n✅ Skill uninstalled successfully!');
  } else {
    console.log('ℹ️  Skill was not installed, nothing to remove');
  }
}

// 执行卸载
try {
  uninstallSkill();
} catch (error) {
  console.error('\n⚠️  Warning during uninstall:', error.message);
  // Don't exit with error code as uninstall should be best-effort
}
