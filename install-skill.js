#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function detectInstallLocation() {
  // 检测是否为全局安装
  const isGlobal = process.env.npm_config_global === 'true';

  if (isGlobal) {
    // 全局安装：安装到 ~/.claude/skills/
    return {
      type: 'personal',
      base: path.join(os.homedir(), '.claude', 'skills')
    };
  } else {
    // 项目级安装：查找项目根目录
    let currentDir = process.cwd();
    let projectRoot = currentDir;

    // 向上查找 package.json 或 .git
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

function installSkill() {
  console.log('📦 Installing Claude Code Skill...\n');

  // 读取配置
  const configPath = path.join(__dirname, '.claude-skill.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('.claude-skill.json not found');
  }
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // 确定安装位置
  const location = detectInstallLocation();
  const targetDir = path.join(location.base, config.name);

  console.log(`Installation type: ${location.type}`);
  console.log(`Target directory: ${targetDir}\n`);

  // 创建目标目录
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 拷贝 SKILL.md（必需）
  const skillMdSource = path.join(__dirname, 'SKILL.md');
  if (!fs.existsSync(skillMdSource)) {
    throw new Error('SKILL.md is required but not found');
  }
  fs.copyFileSync(skillMdSource, path.join(targetDir, 'SKILL.md'));
  console.log('✓ Copied SKILL.md');

  // 拷贝其他文件
  if (config.files) {
    Object.entries(config.files).forEach(([source, dest]) => {
      const sourcePath = path.join(__dirname, source);
      if (!fs.existsSync(sourcePath)) {
        console.warn(`⚠ Warning: ${source} not found, skipping`);
        return;
      }

      const destPath = path.join(targetDir, dest);

      if (fs.statSync(sourcePath).isDirectory()) {
        copyDir(sourcePath, destPath);
        console.log(`✓ Copied directory: ${source}`);
      } else {
        // 确保目标目录存在
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✓ Copied file: ${source}`);
      }
    });
  }

  // 更新 manifest
  updateManifest(location.base, config);

  console.log('\n✅ Skill installed successfully!');
  console.log(`\nLocation: ${targetDir}`);
  console.log(`Type: ${location.type} skill`);

  // 运行 postinstall hooks
  if (config.hooks && config.hooks.postinstall) {
    console.log('\n🔧 Running postinstall hook...');
    const { execSync } = require('child_process');
    try {
      execSync(config.hooks.postinstall, {
        cwd: targetDir,
        stdio: 'inherit'
      });
    } catch (error) {
      console.warn(`\n⚠ Warning: postinstall hook failed: ${error.message}`);
    }
  }

  console.log('\n📖 Usage:');
  console.log('Ask Claude: "What skills are available?"');
  console.log('Or: "Help me write a commit message"');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function updateManifest(skillsDir, config) {
  const manifestPath = path.join(skillsDir, '.skills-manifest.json');
  let manifest = { skills: {} };

  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
      console.warn('Warning: Could not parse existing manifest, creating new one');
      manifest = { skills: {} };
    }
  }

  manifest.skills[config.name] = {
    version: config.version,
    installedAt: new Date().toISOString(),
    package: config.package || `@antskill/${config.name}`,
    path: path.join(skillsDir, config.name)
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

// 执行安装
try {
  installSkill();
} catch (error) {
  console.error('\n❌ Failed to install skill:', error.message);
  console.error('\nTroubleshooting:');
  console.error('- Ensure .claude-skill.json exists and is valid JSON');
  console.error('- Ensure SKILL.md exists');
  console.error('- Check file permissions for ~/.claude directory');
  console.error('- Try running with sudo for global installation (if needed)');
  process.exit(1);
}
