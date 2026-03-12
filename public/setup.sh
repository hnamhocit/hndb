#!/bin/bash
# smart-setup.sh - Hoàn toàn tự động!

echo "============================================"
echo "   One-Click MySQL Cloud Connect"
echo "============================================"
echo ""

# Auto-detect MySQL port
MYSQL_PORT=$(netstat -an | grep LISTEN | grep 3306 | head -1 | awk '{print $4}' | cut -d: -f2)

if [ -z "$MYSQL_PORT" ]; then
    MYSQL_PORT=3306
    echo "⚠️  MySQL not detected on port 3306"
    echo "   Make sure MySQL is running!"
    echo ""
fi

# Install ngrok
if ! command -v ngrok &> /dev/null; then
    echo "📦 Installing ngrok..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install ngrok/ngrok/ngrok
    else
        curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
          sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
        echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
          sudo tee /etc/apt/sources.list.d/ngrok.list
        sudo apt update && sudo apt install ngrok -y
    fi
fi

# Check if already configured
if ngrok config check &> /dev/null; then
    echo "✅ ngrok already configured"
else
    echo ""
    echo "🔑 One-time setup:"
    echo "   1. Opening ngrok signup page..."

    # Auto-open browser
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://dashboard.ngrok.com/signup"
    else
        xdg-open "https://dashboard.ngrok.com/signup" 2>/dev/null || \
        echo "   Please visit: https://dashboard.ngrok.com/signup"
    fi

    echo "   2. After signup, copy your auth token"
    echo ""
    read -p "   Paste token here: " TOKEN

    ngrok config add-authtoken "$TOKEN"

    echo ""
    echo "✅ Configuration saved!"
fi

echo ""
echo "============================================"
echo "   🚀 Starting Tunnel to MySQL..."
echo "============================================"
echo ""
echo "⚠️  Keep this window OPEN!"
echo ""
echo "📋 Copy the connection URL below:"
echo ""

# Start ngrok and parse output
ngrok tcp $MYSQL_PORT --log=stdout 2>&1 | grep -o 'tcp://[0-9].tcp.ngrok.io:[0-9]*' | head -1 | while read url; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Connection URL:"
    echo "  $url"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Auto-copy to clipboard
    if command -v pbcopy &> /dev/null; then
        echo "$url" | pbcopy
        echo "✅ Copied to clipboard!"
    elif command -v xclip &> /dev/null; then
        echo "$url" | xclip -selection clipboard
        echo "✅ Copied to clipboard!"
    fi
done