# VIDAA App Build Instructions

## Packaging Your VIDAA App

### 1. Prerequisites
- Ensure all files are in place
- Icon file must be 512x512 PNG
- config.xml must be valid XML

### 2. Create Widget Package (.wgt)

The VIDAA app package is a ZIP file with .wgt extension containing:
- config.xml (required)
- index.html (required)
- icon.png (required)
- All CSS, JS, and asset files

**Using command line:**
```bash
npm run package
```

Or manually:
```bash
zip -r tv-monitoring.wgt config.xml index.html icon.png css/ js/
```

### 3. Sign the Package

VIDAA apps must be signed with a developer certificate:
1. Obtain a certificate from VIDAA Developer Portal
2. Sign the .wgt file using VIDAA SDK signing tool
3. This creates a signed package ready for distribution

### 4. Testing

**Local Testing:**
```bash
npm run serve
# Open http://localhost:8080 in browser
```

**On VIDAA TV:**
1. Enable Developer Mode on your TV
2. Use VIDAA SDK to install the .wgt package
3. Launch and test the app

### 5. Submission to VIDAA Store

1. Create account at VIDAA Developer Portal
2. Upload signed .wgt package
3. Provide app metadata and screenshots
4. Submit for review
5. Wait for approval

## File Size Limits
- Maximum package size: ~200 MB
- Recommended size: < 50 MB
- Icon: Must be exactly 512x512 PNG

## Testing Checklist
- [ ] App launches correctly
- [ ] Remote control navigation works
- [ ] All features functional
- [ ] No console errors
- [ ] Back/Exit buttons work
- [ ] UI fits 1920x1080 display
- [ ] Performance is smooth (60fps)

## Common Issues

**App won't install:**
- Check config.xml syntax
- Verify icon.png exists and is correct size
- Ensure package is properly signed

**Remote control not working:**
- Verify key handler registration in vidaa-handler.js
- Check key codes match VIDAA specification

**Blank screen:**
- Check browser console for errors
- Verify all file paths are correct
- Ensure VIDAA SDK scripts load properly
