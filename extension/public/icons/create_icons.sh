#!/bin/bash
# Script to create simple placeholder icons using ImageMagick
# If ImageMagick is not available, icons need to be created manually

if command -v convert &> /dev/null; then
    # Create 16x16 icon
    convert -size 16x16 xc:#667eea -pointsize 10 -fill white -gravity center -annotate +0+0 "HW" icon16.png
    
    # Create 48x48 icon
    convert -size 48x48 xc:#667eea -pointsize 24 -fill white -gravity center -annotate +0+0 "HW" icon48.png
    
    # Create 128x128 icon
    convert -size 128x128 xc:#667eea -pointsize 64 -fill white -gravity center -annotate +0+0 "HW" icon128.png
    
    echo "Icons created successfully!"
else
    echo "ImageMagick not found. Please create icons manually or install ImageMagick."
    echo "Icon sizes needed: 16x16, 48x48, 128x128"
fi
