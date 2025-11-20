# Komitex TV Web Viewer for VIDAA

A VIDAA TV application that displays the website [tv.svdevsoft.com](https://tv.svdevsoft.com/) in a fullscreen web viewer optimized for Hisense VIDAA Smart TVs.

## Features

- 📺 **Fullscreen Web Viewer** - Displays tv.svdevsoft.com in an embedded iframe
- 🎮 **Remote Control Support** - Navigate using your VIDAA TV remote
- 🔄 **Reload Function** - Refresh the website content easily
- ⛶ **Fullscreen Mode** - Toggle fullscreen viewing
- ← **Back Navigation** - Navigate back in browsing history
- ⚠️ **Error Handling** - Graceful error display with retry option
- 🚀 **Loading Screen** - Beautiful loading animation while content loads

## Installation

### For VIDAA TV (Hisense)

1. Download the `tv-monitoring.wgt` package from [Releases](https://github.com/RomanVSydorenko/VIDAAtv.svdevsoft.com/releases)
2. Follow the [VIDAA Installation Guide](https://romanvsydorenko.github.io/VIDAAtv.svdevsoft.com/vidaa-install.html)
3. Install via USB or Network method
4. Launch the app from your TV's Apps menu

### Building the Package

To rebuild the `.wgt` package:

```bash
# Make sure all files are in place
zip -r tv-monitoring.wgt * -x "*.git*" "*.md" "apk/*" "*.wgt"
```

## Controls

### Remote Control
- **Arrow Keys** - Navigate within the website
- **OK/Enter** - Select items
- **Back** - Go back in browsing history
- **Exit** - Close the application

### Keyboard (for testing in browser)
- **R or F5** - Reload website
- **F or F11** - Toggle fullscreen
- **Backspace** - Go back
- **ESC** - Exit fullscreen or app

## Files Structure

```
.
├── viewer.html          # Main web viewer interface
├── js/
│   ├── viewer.js        # Web viewer application logic
│   └── vidaa-handler.js # VIDAA platform integration
├── config.xml           # VIDAA app configuration
└── README-VIEWER.md     # This file
```

## How It Works

The app creates a fullscreen iframe that loads `https://tv.svdevsoft.com/` and provides:

1. **Loading Screen** - Shows while the website loads
2. **Header Controls** - Reload, fullscreen, and back buttons
3. **Iframe Content** - The embedded website
4. **Error Handling** - Displays errors if loading fails
5. **Footer Info** - Usage instructions

## Technical Details

- **Resolution**: Optimized for 1920x1080 Full HD
- **Platform**: Hisense VIDAA Smart TV
- **Package Format**: `.wgt` (Widget)
- **Web Standards**: HTML5, CSS3, JavaScript ES6+
- **iframe Sandbox**: Secure iframe with controlled permissions

## Development

To test in a web browser:

1. Open `viewer.html` in your browser
2. The app will load tv.svdevsoft.com in an iframe
3. Use keyboard shortcuts for testing controls

## Security

The iframe uses sandbox attributes for security:
- `allow-same-origin` - Allows content from the same origin
- `allow-scripts` - Allows JavaScript execution
- `allow-popups` - Allows popup windows
- `allow-forms` - Allows form submission
- `allow-modals` - Allows modal dialogs

## Links

- **Website**: [tv.svdevsoft.com](https://tv.svdevsoft.com/)
- **VIDAA Installation Guide**: [vidaa-install.html](https://romanvsydorenko.github.io/VIDAAtv.svdevsoft.com/vidaa-install.html)
- **Android/Google TV**: [install.html](https://romanvsydorenko.github.io/VIDAAtv.svdevsoft.com/install.html)
- **GitHub Repository**: [VIDAAtv.svdevsoft.com](https://github.com/RomanVSydorenko/VIDAAtv.svdevsoft.com)

## Support

For issues and support, please visit [tv.svdevsoft.com](https://tv.svdevsoft.com/)

## License

© 2025 SV Dev Soft
