# Chrome Extension - Hello World

A sample Chrome extension built with TypeScript that displays "Hello World" message on web pages.

## 🚀 Features

- Display "Hello World" message on page load
- Enable/disable extension via popup
- Customizable page styles with presets
- Domain-specific settings
- Options page for advanced configuration

## 📁 Project Structure

```
extension-customize-page/
├─ extension/
│  ├─ public/
│  │  ├─ icons/
│  │  └─ manifest.json
│  ├─ src/
│  │  ├─ content/          # Content scripts
│  │  ├─ background/       # Service worker
│  │  ├─ popup/            # Extension popup
│  │  ├─ options/          # Options page
│  │  ├─ core/             # Core functionality
│  │  ├─ storage/          # Storage management
│  │  ├─ types/            # TypeScript types
│  │  └─ utils/            # Utility functions
│  └─ tsconfig.json
├─ docs/
├─ README.md
└─ package.json
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `extension/dist` folder

## 🔧 Development

### Build Commands

```bash
# Build once
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch

# Clean build directory
npm run clean
```

### File Modifications

- **Content Script**: Edit `extension/src/content/contentScript.ts`
- **Popup**: Edit files in `extension/src/popup/`
- **Options**: Edit files in `extension/src/options/`
- **Background**: Edit `extension/src/background/serviceWorker.ts`

After making changes, run `npm run build` and reload the extension in Chrome.

## 📝 Usage

### Basic Usage

1. Click the extension icon in Chrome toolbar
2. Toggle the extension on/off
3. Visit any website to see "Hello World" message

### Advanced Configuration

1. Click "Open Options" in the popup
2. Create custom style presets
3. Add domain-specific rules
4. Test the "Hello World" message

## 🎨 Customization

### Adding Icons

Place your icon files in `extension/public/icons/`:
- `icon16.png` (16x16)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

### Modifying Styles

Edit the style presets in `extension/src/types/setting.ts` or through the Options page.

## 📚 Documentation

See the `docs/` folder for:
- `architecture.md` - System architecture
- `roadmap.md` - Development roadmap

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🐛 Troubleshooting

### Extension not working?

1. Check Chrome DevTools console for errors
2. Verify the extension is enabled in `chrome://extensions/`
3. Reload the extension after making changes
4. Clear browser cache if styles aren't applying

### Build errors?

1. Delete `node_modules` and `extension/dist`
2. Run `npm install` again
3. Run `npm run build`

## 📞 Support

For issues or questions, please open an issue on GitHub.
