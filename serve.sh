#!/bin/bash
# Simple script to serve the guitar app locally

echo "Starting Web Guitar App server..."
echo "=========================================="
echo ""

# Get local IP address
IP=$(hostname -I | awk '{print $1}')

echo "Access the app from your mobile device at:"
echo ""
echo "  http://$IP:8000"
echo ""
echo "Make sure your mobile is on the same WiFi network!"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

# Start Python HTTP server
python3 -m http.server 8000
