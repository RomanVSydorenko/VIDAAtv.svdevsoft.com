# Installing on Hisense VIDAA TV - Complete Guide

## 📦 Package Created
✅ **tv-monitoring.wgt** - Ready to install on your Hisense TV

## 🔧 Installation Methods

### Method 1: USB Installation (Recommended for Development)

#### Step 1: Enable Developer Mode on Your Hisense TV
1. On your TV remote, press **Home**
2. Go to **Settings** → **System** → **About**
3. Find **Software Version** and press OK 5 times quickly
4. Enter Developer Mode PIN: **0000** or **1234** (default)
5. Developer Mode is now enabled

#### Step 2: Install via USB
1. Copy `tv-monitoring.wgt` to a USB drive (root directory)
2. Insert USB into your Hisense TV
3. Press **Home** → **Apps**
4. Look for **Developer** or **My Apps** section
5. Select **Install from USB**
6. Choose `tv-monitoring.wgt`
7. App will install and appear in your apps list

### Method 2: Network Installation (Advanced)

#### Step 1: Get Your TV's IP Address
1. On TV: **Settings** → **Network** → **Network Status**
2. Note the IP address (e.g., 192.168.1.100)

#### Step 2: Enable Remote Installation
1. Enable Developer Mode (see Method 1)
2. Go to **Settings** → **System** → **Developer Settings**
3. Enable **USB Debugging** or **Network Installation**

#### Step 3: Install from Computer
```bash
# Using VIDAA SDK (if you have it installed)
vidaa-cli install tv-monitoring.wgt --device 192.168.1.100

# Or use HTTP server method
python3 -m http.server 8080
# On TV browser, navigate to: http://YOUR_COMPUTER_IP:8080/tv-monitoring.wgt
```

### Method 3: VIDAA Store Submission (For Public Distribution)

If you want to publish your app:
1. Register at **VIDAA Developer Portal**: https://developer.vidaa.com
2. Submit `tv-monitoring.wgt` for review
3. Wait for approval (usually 1-2 weeks)
4. App becomes available in VIDAA App Store

## 🎮 Using the App on Your TV

Once installed:
1. Press **Home** on your remote
2. Go to **Apps** or **My Apps**
3. Find **TV Monitoring** app
4. Press **OK** to launch

### Remote Control:
- **Arrow Keys**: Navigate
- **OK/Enter**: Select
- **Back**: Go back
- **Exit**: Close app

## ⚠️ Important Notes

### For Unsigned Apps:
- Developer mode must remain enabled
- App may show "Unsigned App" warning
- This is normal for development/testing

### For Production Use:
- Apps should be signed with VIDAA certificate
- Register for developer account
- Submit to VIDAA Store for official distribution

### Troubleshooting:
- **App won't install**: Check if Developer Mode is enabled
- **Black screen**: Check TV logs or try reinstalling
- **Remote not working**: App may need focus - press Home then relaunch
- **"Invalid package" error**: Ensure .wgt file is not corrupted

## 📱 File Location
Your installable package: `/home/roman/projects/monitoryng/tv-monitoring.wgt`

## 🌐 Web Version
Test in browser first: https://romanvsydorenko.github.io/VIDAAtv.svdevsoft.com/

## 🔒 For Signed Production App

Contact VIDAA for signing certificate:
1. Get developer certificate from VIDAA portal
2. Sign the package:
   ```bash
   vidaa-sign tv-monitoring.wgt --cert your-cert.pem
   ```
3. Deploy signed version

---

**Note**: The .wgt file is already created and ready to copy to USB!
