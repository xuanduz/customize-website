const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'extension', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to create a simple PNG icon using Canvas (if available) or base64
function createIcon(size, filename) {
  // Create a simple SVG
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#667eea"/>
      <text x="50%" y="50%" font-family="Arial" font-size="${size * 0.4}" 
            fill="white" text-anchor="middle" dy=".35em" font-weight="bold">HW</text>
    </svg>
  `;
  
  // For now, we'll create a simple colored square as base64 PNG
  // This is a minimal valid PNG (1x1 pixel, but we'll create proper ones)
  const createSimplePNG = (size) => {
    // This creates a minimal valid PNG file
    const canvas = createCanvas(size);
    return canvas;
  };
  
  // Save SVG temporarily (for manual conversion if needed)
  fs.writeFileSync(path.join(iconsDir, filename.replace('.png', '.svg')), svg);
  
  console.log(`Created ${filename.replace('.png', '.svg')}`);
}

function createCanvas(size) {
  // Create a simple valid PNG buffer
  // This is a transparent 1x1 PNG, but we'll make it colorful
  const header = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  ]);
  
  // For simplicity, let's create a base64 encoded valid PNG
  // A simple colored square PNG
  const pngData = {
    16: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABcSURBVDiN7ZMxCgAgDAS7/z/tC3wBPoKDk4ODg4t0kA4uQRBRcLO5XC4X5RxjjPEHVVVV1b9U1XVd13Vd13Vd13Vd13Vd13X9VlXf933f933f933f933f9/0HSZIkyZ+TAXwAHWuZ6XAAAAAASUVORK5CYII=',
    48: 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGQSURBVGiB7Zq9SgNBFIW/3U0MQUEQbCxsLCxsbCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz8q5vZzJ3dTTY7M5tNziNwD1wBF8A5cAacAafACXAMHAFHwCFwABwA+8AesAvsADvANrAFbAKbwAawDqwBq8AKsAwsAYvAArAAzAPzwBwwC8wAM8A0MA1MAdPAFDAFTAKTwAQwDowD48AYMA6MAmPAKDAKjAIjwCgwAowAI8AIMNzy9/+q',
    128: 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARpSURBVHic7Z29ctNAFIW/lUgcQkEBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQX/aru7e/fH1tqSvXt379k7R5J0JemSpCuSLki6IOm8pHOSzkk6K+mMpNOSTkk6KemEpOOSjkk6KumIpMOSDkk6KOmApP2S9knaK2mPpN2Sdknaoe+rq/nv1/9VAAAAAElFTkSuQmCC'
  };
  
  return Buffer.from(pngData[size], 'base64');
}

// Create icons
console.log('Creating icons...');
createIcon(16, 'icon16.png');
createIcon(48, 'icon48.png');
createIcon(128, 'icon128.png');

// Create actual PNG files using the base64 data
const sizes = [16, 48, 128];
const colors = {
  16: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQklEQVQ4T2NkoBAwUqifYdQAhtEwIBgGo2EwGgYEw2A0DEbDgGAYjIbBaBgQDIPRMBgNA4JhMBoGo2FAMAxGw2BQhAEAbR4AFRs4G4UAAAAASUVORK5CYII=', 'base64'),
  48: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAnklEQVRoQ+2YQQ6AIAwE6///NB40JtKGXRqPxgN7ZKaAJBQKbdo2OuFHAv5fYL7AXABcYC4ALjAXABeYC4ALzAXABeYC4AJzAXCBuQC4wFwAXGAuAC4wFwAXmAuAC8wFwAXmAuACcwFwgbkAuMBcAFxgLgAuMBcAF5gLgAvMBcAF5gLgAnMBcIG5ALjAXABcYC4ALjAX+L3AASKcMTFPxu5GAAAAAElFTkSuQmCC', 'base64'),
  128: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAC0klEQVR4nO3bMW7bQBRF0Q+RQDu7yDqyDq/D69AqvJBsIgsxEAQIYJDkzJDv6Z6qrCb/fZr5FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDf+nR9egLgHQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHAgARxIAAcSwIEEcCABHEgABxLAgQRwIAEcSAAHEsCBBHCgL9cnAN5BAP+p2+32+Hy6PV2fAz5KAH/sdDo9Pp+uTwEf9+X6BMA7COBAn69PALyDAA4kgAMJ4EACOJAADiSAAwngQAI4kAAOJIADCeBAnyL4jQEOI4DCBPB/+i2A+30Yv9/H4wzgzXy6Pv0xfr+P+z2A/38vAnjzAP7HT79PAe8+gK/n87cIwJsH8HME4M0D+DWCX38APT+A/zk/wP/9AfTPn0N9qJ/EvvYJ7Nd+DvuhfhT9tX8W/9o/zH/0HwdA/XUQ1F8HQv11MNRfB0T9dVDUXwdG/XVw1F8HSP11kNRfB0r9dbDUXwdM/XXQ1F8HTv110NRfB0799QugPul9qH8tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfNpP0LaSsqE/iXcAAAAASUVORK5CYII=', 'base64')
};

sizes.forEach(size => {
  fs.writeFileSync(
    path.join(iconsDir, `icon${size}.png`),
    colors[size]
  );
  console.log(`Created icon${size}.png`);
});

console.log('\n✅ Icons created successfully!');
console.log(`📁 Location: ${iconsDir}`);
console.log('\nYou can now load the extension in Chrome!');
