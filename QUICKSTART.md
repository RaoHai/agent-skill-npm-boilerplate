# Quick Start Guide

Get your Claude Code skill up and running in 5 minutes!

## 🚀 Step 1: Use This Template

Click the "Use this template" button at the top of this repository, or:

```bash
git clone https://github.com/YOUR-ORG/agent-skill-npm-boilerplate.git my-skill
cd my-skill
rm -rf .git
git init
```

## ✏️ Step 2: Find and Replace

Replace these placeholders throughout the project:

| Find | Replace With | Files |
|------|-------------|-------|
| `YOUR-SKILL-NAME` | `my-awesome-skill` | `package.json`, `.claude-skill.json` |
| `YOUR SKILL DESCRIPTION` | `Your description` | `package.json`, `SKILL.md` |
| `your-skill-name` | `my-awesome-skill` | `SKILL.md`, `.claude-skill.json` |
| `YOUR NAME` | `Your Name` | `package.json` |
| `YOUR-USERNAME` | `your-github-username` | `package.json`, `README.md` |
| `YOUR-REPO-NAME` | `my-awesome-skill` | `package.json` |

### Quick Replace Command

```bash
# macOS/Linux
find . -type f -name "*.json" -o -name "*.md" | xargs sed -i '' 's/YOUR-SKILL-NAME/my-awesome-skill/g'

# Or use your text editor's find-and-replace feature
```

## 📝 Step 3: Customize SKILL.md

Edit `SKILL.md` and update:

1. **Frontmatter** (lines 2-5):
   ```yaml
   ---
   name: my-awesome-skill
   description: Your clear description here. Use when [scenarios].
   allowed-tools: Read, Bash
   ---
   ```

2. **Instructions section**: Add your skill's logic
3. **Examples section**: Show how it works

## 🧪 Step 4: Test Locally

```bash
# Test installation
npm test

# Or manually
node install-skill.js

# Verify
ls -la ~/.claude/skills/my-awesome-skill/
cat ~/.claude/skills/my-awesome-skill/SKILL.md
```

Open Claude Code and ask: "What skills are available?"

## 📦 Step 5: Publish to npm

```bash
# One-time setup
npm login

# Publish
npm publish --access public
```

## ✅ Verification Checklist

Before publishing, verify:

- [ ] Replaced all placeholders
- [ ] Updated SKILL.md with your logic
- [ ] Tested installation locally
- [ ] Verified skill appears in Claude Code
- [ ] Updated README.md
- [ ] Added examples
- [ ] Committed to git

## 🎯 What's Next?

1. **Share**: Tell others about your skill
2. **Iterate**: Get feedback and improve
3. **Document**: Add more examples and use cases
4. **Contribute**: Help improve this template

## 💡 Tips

### Naming Your Skill

Good names are:
- ✅ Descriptive: `git-commit-helper`
- ✅ Specific: `typescript-error-checker`
- ✅ Clear: `code-reviewer`

Avoid:
- ❌ Generic: `helper`, `tool`, `utility`
- ❌ Vague: `my-skill`, `test`

### Writing Descriptions

Include:
- What it does
- When to use it
- Keywords users would say

Example:
```yaml
description: Generates conventional commit messages from git diffs. Use when writing commit messages, creating commits, or reviewing staged changes.
```

### Progressive Disclosure

Keep SKILL.md concise (<500 lines). Put detailed content in:
- `reference.md` - Detailed documentation
- `examples.md` - More examples
- `scripts/` - Utility scripts

## 🆘 Troubleshooting

### Skill Not Installing

```bash
# Check permissions
ls -la ~/.claude/

# Try sudo (if global)
sudo npm install -g @antskill/my-skill

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

### Skill Not Appearing

- Check `~/.claude/skills/my-skill-name/`
- Verify SKILL.md has proper frontmatter
- Restart Claude Code

### Publishing Fails

```bash
# Check if name is available
npm view @antskill/my-skill

# Verify you're logged in
npm whoami

# Check package.json is valid
cat package.json | jq
```

## 📚 Resources

- [Full Documentation](README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Claude Code Skills Docs](https://code.claude.com/docs/en/skills)
- [Examples](examples.md)

---

Need help? [Open an issue](https://github.com/YOUR-ORG/agent-skill-npm-boilerplate/issues) or [start a discussion](https://github.com/YOUR-ORG/agent-skill-npm-boilerplate/discussions)!
