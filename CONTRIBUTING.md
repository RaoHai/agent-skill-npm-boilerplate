# Contributing to Agent Skill NPM Boilerplate

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🎯 Ways to Contribute

There are many ways you can contribute:

- 🐛 **Report bugs** - Found an issue? Let us know!
- 💡 **Suggest features** - Have ideas for improvements?
- 📝 **Improve documentation** - Help others understand better
- 🔧 **Submit code** - Fix bugs or add features
- 🌟 **Share examples** - Show how you're using this template
- 💬 **Help others** - Answer questions in discussions

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork this repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/agent-skill-npm-boilerplate.git
cd agent-skill-npm-boilerplate
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

- Follow the existing code style
- Add tests if applicable
- Update documentation as needed

### 4. Test Your Changes

```bash
# Test the installation script
npm run test

# Verify manually
node install-skill.js
ls -la ~/.claude/skills/
```

### 5. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new template option"
git commit -m "fix: correct installation path detection"
git commit -m "docs: update README examples"
```

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📋 Contribution Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Keep functions focused and small
- Use meaningful variable names

### Documentation

- Update README.md for user-facing changes
- Add examples for new features
- Keep documentation clear and concise
- Use proper markdown formatting

### Commits

Use Conventional Commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat(install): add support for custom installation paths
fix(script): correct permission check on Windows
docs(readme): add troubleshooting section
```

### Pull Request Process

1. **Describe your changes**: Explain what and why in the PR description
2. **Link related issues**: Reference any related GitHub issues
3. **Update documentation**: Include relevant doc updates
4. **Add examples**: Show how your change works
5. **Be responsive**: Address review feedback promptly

### PR Title Format

```
<type>(<scope>): <description>

Example:
feat(templates): add advanced template option
```

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: How to trigger the bug
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**: OS, Node version, npm version
6. **Screenshots**: If applicable

Use this template:

```markdown
### Bug Description
[Clear description]

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- OS: [e.g., macOS 14.0]
- Node: [e.g., v18.0.0]
- npm: [e.g., 9.0.0]

### Additional Context
[Screenshots, logs, etc.]
```

## 💡 Suggesting Features

When suggesting features:

1. **Use case**: Describe the problem you're trying to solve
2. **Proposed solution**: How you think it should work
3. **Alternatives**: Other solutions you've considered
4. **Examples**: Show examples of similar features

Use this template:

```markdown
### Feature Request

**Problem**: [Describe the problem]

**Proposed Solution**: [How it should work]

**Use Case**: [Real-world scenario]

**Alternatives Considered**: [Other options]

**Additional Context**: [Examples, mockups, etc.]
```

## 📝 Documentation Contributions

Documentation is crucial! You can help by:

- Fixing typos or grammar
- Adding examples
- Clarifying confusing sections
- Translating to other languages
- Creating tutorials or guides

## 🧪 Testing

Before submitting:

```bash
# Test installation
npm run test

# Test on different platforms (if possible)
# - macOS
# - Linux
# - Windows (via WSL)

# Verify SKILL.md format
cat SKILL.md

# Check for broken links
# [Add link checking command]
```

## 📦 Submitting Skills

If you've created a skill using this template:

1. Add it to the "Examples" section in README.md
2. Include:
   - Skill name and npm package link
   - Brief description
   - Link to source code (if public)

Example:
```markdown
- `@antskill/your-skill-name` - Brief description ([source](https://github.com/...))
```

## 🤔 Questions?

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Use GitHub Issues for bugs
- 📧 **Email**: [Contact email if applicable]

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment.

### Standards

**Positive behavior**:
- Be respectful and inclusive
- Accept constructive feedback gracefully
- Focus on what's best for the community
- Show empathy towards others

**Unacceptable behavior**:
- Harassment or discriminatory language
- Personal attacks
- Trolling or insulting comments
- Publishing others' private information

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to [maintainer contact].

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

Thank you for contributing! 🎉

## 📚 Resources

- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)

---

**Questions?** Open a discussion or issue, we're here to help!
