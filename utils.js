const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Get enabled target configurations
 */
function getEnabledTargets(config) {
  // If no targets configuration, use default Claude Code configuration
  if (!config.targets) {
    return [{
      name: 'claude-code',
      paths: {
        global: '.claude/skills',
        project: '.claude/skills'
      }
    }];
  }

  // Return all enabled targets
  return Object.entries(config.targets)
    .filter(([_, target]) => target.enabled)
    .map(([name, target]) => ({
      name,
      paths: target.paths
    }));
}

/**
 * Extract skill name from package name (remove scope prefix)
 */
function extractSkillName(packageName) {
  return packageName.startsWith('@') ? 
    packageName.split('/')[1] || packageName : 
    packageName;
}

/**
 * Detect installation location
 */
function detectInstallLocation(targetPaths, isGlobal) {
  if (isGlobal) {
    // Global installation: install to user home directory
    return {
      type: 'personal',
      base: path.join(os.homedir(), targetPaths.global)
    };
  } else {
    // Project-level installation: find the actual project root directory
    let currentDir = process.cwd();
    let projectRoot = currentDir;

    // Search upward, skip node_modules directories, find the actual project root
    while (projectRoot !== path.dirname(projectRoot)) {
      // Check if this is a project root directory (contains package.json or .git)
      const hasPackageJson = fs.existsSync(path.join(projectRoot, 'package.json'));
      const hasGit = fs.existsSync(path.join(projectRoot, '.git'));
      
      // Check if current directory is in node_modules
      const isInNodeModules = projectRoot.includes('/node_modules/') || 
                             path.basename(projectRoot) === 'node_modules';
      
      if ((hasPackageJson || hasGit) && !isInNodeModules) {
        // Found the actual project root directory
        break;
      }
      
      // Continue searching upward
      projectRoot = path.dirname(projectRoot);
    }
    
    // Verify the final path is reasonable
    const finalIsInNodeModules = projectRoot.includes('/node_modules/') || 
                                path.basename(projectRoot) === 'node_modules';
    
    if (finalIsInNodeModules) {
      // If suitable project root not found, use current working directory (with warning)
      console.warn('⚠ Warning: Could not find project root directory, using current directory');
      projectRoot = process.cwd();
    }

    return {
      type: 'project',
      base: path.join(projectRoot, targetPaths.project)
    };
  }
}

module.exports = {
  getEnabledTargets,
  extractSkillName,
  detectInstallLocation
};