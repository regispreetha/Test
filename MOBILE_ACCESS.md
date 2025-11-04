# 📱 How to Access on Mobile

## Option 1: Local Web Server (Easiest for Testing)

If you have the repository on your computer:

1. **Open terminal** in the `/home/user/Test` directory
2. **Run the server script:**
   ```bash
   ./serve.sh
   ```
   OR manually:
   ```bash
   python3 -m http.server 8000
   ```
3. **Note the IP address** shown (e.g., `192.168.1.100:8000`)
4. **On your mobile** (connected to same WiFi):
   - Open browser
   - Go to: `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

## Option 2: Deploy to Free Hosting

### A. GitHub Pages (Recommended)
1. Push to main/master branch
2. Go to GitHub repo settings
3. Enable GitHub Pages
4. Access at: `https://yourusername.github.io/Test`

### B. Netlify (Super Easy)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant URL like: `https://your-app.netlify.app`

### C. Vercel
1. Install: `npm install -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts to deploy

### D. GitHub Codespaces
1. Open repo in GitHub Codespaces
2. Start preview server
3. Make port public
4. Access via generated URL

## Option 3: Direct File Access (Android Only)

On Android devices:
1. Download the repository as ZIP
2. Extract files
3. Open `index.html` with Chrome or Firefox
4. Some features may not work due to browser restrictions

## Option 4: Use a File Manager App

Some mobile file managers support HTML preview:
- **Android**: Solid Explorer, Total Commander
- **iOS**: Documents by Readdle

---

## 🚀 Recommended: Deploy to Netlify

**Quickest way to get it on mobile:**

1. Visit https://app.netlify.com/drop
2. Drag and drop these files:
   - index.html
   - app.js
   - styles.css
   - README.md
3. Get instant live URL!
4. Share with anyone, access from any device!

No signup required for basic usage!
