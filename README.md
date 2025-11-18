# SV Dev Soft TV - VIDAA App

A VIDAA Smart TV application that displays tv.svdevsoft.com in a TV-optimized interface.

## 🌐 Installation Page
**Install from:** https://romanvsydorenko.github.io/VIDAAtv.svdevsoft.com/install.html

## Project Structure

```
monitoryng/
├── config.xml              # VIDAA app manifest and configuration
├── index.html              # Main application entry point
├── icon.png                # Application icon (512x512)
├── css/
│   └── style.css          # TV-optimized styles (1920x1080)
└── js/
    ├── vidaa-handler.js   # VIDAA platform API integration
    └── main.js            # Main application logic
```

## Features

- **TV.SVDevSoft.com Integration**: Full-screen display of tv.svdevsoft.com website
- **VIDAA Platform Integration**: Full integration with VIDAA Smart TV APIs
- **Remote Control Support**: Navigate using TV remote control
- **TV-Optimized UI**: Designed for 1920x1080 resolution
- **Development Mode**: Works in browser for development/testing
- **Reload Function**: Press R to reload content

## Development

### Testing in Browser
Open `index.html` in a web browser or visit https://romanvsydorenko.github.io/VIDAAtv.svdevsoft.com/
The app will run in mock mode with keyboard navigation:
- **ESC**: Exit
- **Backspace**: Go back
- **R**: Reload content
- **Arrow Keys**: Navigate within site
- **Enter**: Select

### Building for VIDAA

1. Ensure all required files are present:
   - `config.xml`
   - `index.html`
   - `icon.png`
   - CSS and JS files

2. Package the application:
   - Create a `.wgt` file (widget package) containing all files
   - Use: `zip -r svdevsoft-tv.wgt config.xml index.html icon.png css/ js/`
   - Sign the package with your developer certificate

3. Deploy to VIDAA TV:
   - Use VIDAA SDK tools to install on TV
   - Or submit to VIDAA App Store

## Configuration

Edit `config.xml` to customize:
- App ID, name, and version
- Author information
- Permissions and features
- Resolution and preferences

## Remote Control Key Codes

- **VK_BACK (10009)**: Back button
- **VK_EXIT (10182)**: Exit button
- **VK_ENTER (13)**: OK/Select button
- **VK_UP/DOWN/LEFT/RIGHT (38/40/37/39)**: Navigation

## VIDAA APIs Used

- `webapis.tv`: Device information and TV control
- `webapis.network`: Network status and connectivity
- Key event handling for remote control

## Requirements

- VIDAA TV (or VIDAA SDK for development)
- Modern web browser for testing
- VIDAA developer account for distribution

## License

Copyright © 2025 SV Dev Soft
