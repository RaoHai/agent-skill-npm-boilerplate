#!/bin/bash

# Post-installation setup script for your skill
# This script runs after npm installs your skill package

echo "🔧 Setting up your skill..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Create config file if it doesn't exist
CONFIG_FILE="$SCRIPT_DIR/config.json"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "📝 Creating default configuration..."

  cat > "$CONFIG_FILE" <<EOF
{
  "version": "1.0.0",
  "enabled": true,
  "options": {
    "option1": "default-value",
    "option2": true
  }
}
EOF

  echo "✅ Created configuration at $CONFIG_FILE"
else
  echo "✅ Configuration already exists at $CONFIG_FILE"
fi

# Add any other setup tasks here
# Examples:
# - Download required data files
# - Initialize databases
# - Check for required dependencies
# - Create symlinks
# - Set permissions

echo ""
echo "✨ Setup complete!"
echo ""
echo "You can customize your skill by editing:"
echo "  $CONFIG_FILE"
echo ""
echo "For more information, see the README or reference.md"
