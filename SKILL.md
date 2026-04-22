---
name: npm-skill-scaffold
description: "Scaffold and validate npm-packaged agent skills for Claude Code, Cursor, and Windsurf. Generates SKILL.md with frontmatter, creates package.json with install hooks, and checks skill structure against the specification. Use when creating a new agent skill, packaging a skill for npm, scaffolding a Claude Code skill, validating skill frontmatter, or setting up skill distribution."
allowed-tools: Read, Bash, Write
---

# NPM Skill Scaffold

Generate properly structured agent skills packaged for npm distribution. Creates SKILL.md files with valid frontmatter, package.json with install/uninstall hooks, and validates the result against the skill specification.

## Instructions

When the user asks to create, scaffold, or package a new agent skill:

1. **Gather requirements**: Ask for the skill name (kebab-case, max 64 chars), a one-line description, and which tools the skill needs (`Read`, `Bash`, `Edit`, `Write`, etc.).

2. **Generate SKILL.md**: Create the skill definition with:
   - YAML frontmatter: `name`, `description` (with a "Use when..." clause and natural trigger keywords), and `allowed-tools`
   - An Instructions section with numbered, actionable steps
   - At least one concrete Example showing user input and expected behavior
   - A progressive disclosure link to `reference.md` if the skill exceeds 200 lines

3. **Generate package.json**: Create the npm package configuration with `postinstall` and `preuninstall` hooks pointing to `agent-skill-installer`:
   ```json
   {
     "scripts": {
       "postinstall": "agent-skill-installer install",
       "preuninstall": "agent-skill-installer uninstall"
     }
   }
   ```

4. **Validate the skill**:
   ```bash
   # Check frontmatter exists and has required fields
   sed -n '/^---$/,/^---$/p' SKILL.md | grep -E "^(name|description):"

   # Verify name is kebab-case
   grep "^name:" SKILL.md | grep -Eq "^name: [a-z0-9-]{1,64}$"

   # Confirm description has trigger keywords and "Use when" clause
   grep "^description:" SKILL.md | grep -q "Use when"
   ```

5. **Report results**: Display the generated files and suggest next steps — test locally with `node install-skill.js`, then publish with `npm publish --access public`.

## Examples

### Example 1: Create a Git Commit Helper Skill

**User asks**: "Create an agent skill that helps write conventional commit messages"

**What the skill does**:
1. Generates `SKILL.md` with name `git-commit-helper` and description including "conventional commits", "commit message", and "Use when committing"
2. Creates `package.json` with `@user-org/git-commit-helper`, install hooks, and `"claude-code"` keyword
3. Validates frontmatter structure and reports the result

**Generated frontmatter**:
```yaml
---
name: git-commit-helper
description: "Generate conventional commit messages from staged changes. Analyzes diffs, detects change type, and formats messages per the Conventional Commits spec. Use when committing code, writing commit messages, or following conventional commits format."
allowed-tools: Read, Bash
---
```

### Example 2: Validate an Existing Skill

**User asks**: "Check if my SKILL.md is valid for npm publishing"

**What the skill does**:
1. Reads `SKILL.md` and parses YAML frontmatter
2. Checks name is kebab-case, under 64 characters, and matches the directory name
3. Confirms description includes a "Use when..." clause with domain-specific trigger keywords
4. Verifies `allowed-tools` only lists recognized tool names
5. Reports pass/fail for each check with fix suggestions

## Best Practices

- Keep skill names in kebab-case, max 64 characters — must match the installation directory name
- Write descriptions under 300 characters with a "Use when..." clause listing 3-5 natural trigger keywords
- Limit `allowed-tools` to only what the skill needs — fewer tools means fewer permission prompts for users
- Keep SKILL.md under 500 lines — use `reference.md` for API docs and `examples.md` for additional usage patterns
- Include at least one concrete example with real input/output, not just placeholder brackets
- Test locally before publishing: run `node install-skill.js` and verify the skill appears in `~/.claude/skills/`

## Limitations

- Only scaffolds skills for tools that follow the SKILL.md frontmatter convention (Claude Code, Cursor, Windsurf)
- Does not publish to npm — the user must run `npm publish` separately
- Cannot validate that the skill logic actually works — only checks structural correctness

For complete specification details, see [reference.md](reference.md).
