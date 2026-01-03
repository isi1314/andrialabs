# Andria Labs Graphics Guide

All graphics follow the **Abundance Theme** with champagne gold accents.

## Color Palette
- Background: `#1A1814` (dark)
- Primary Gold: `#C9A961` (champagne gold)
- Light Gold: `#E8D7B0` (highlights)
- Dark Gold: `#A68B4E` (depth)
- Medium: `#697565` (secondary text)
- Warm Cream: `#FBF6F0` (primary text)

## Web & Browser Graphics

### Favicons (Browser Tabs & Bookmarks)
- **favicon.svg** (32x36) - Primary favicon, original cream colors
- **favicon.png** (32x32) - PNG fallback
- **apple-touch-icon.png** (180x180) - iOS home screen icon

### Open Graph / Social Sharing
- **og-image.svg** (1200x630) - Source file with abundance theme
- **og-image.png** (1200x630) - Optimized for Facebook, LinkedIn, Twitter cards

## Social Media Assets

### Twitter / X
- **twitter-cover.png** (1500x500) - Profile banner
- **social-profile.png** (400x400) - Profile picture

### LinkedIn
- **linkedin-cover.png** (1128x191) - Company page banner
- **social-profile.png** (400x400) - Company logo (reuse)

### Profile Images
- **social-profile.svg** (400x400) - Universal square profile source
- **social-profile.png** (400x400) - Used for all social platforms

## Logo Files

### Main Logos
- **logo-icon.svg** (160x180) - Primary logo, original cream fills
- **logo-icon-dark.svg** (160x180) - Dark variant for light backgrounds

## Background Patterns
- **constellation.svg** - Repeating constellation pattern for backgrounds

## Usage Notes

1. **Favicons remain with original colors** (#ECDFCC cream) per user preference
2. **Social media graphics use abundance theme** with gold accents (#C9A961)
3. **Logo files use original colors** for brand consistency
4. **All SVG files** are optimized and minified
5. **PNG files** are generated from SVG sources for compatibility

## Updating Graphics

To regenerate PNG files from SVG:
```bash
# Favicon
magick images/favicon.svg -resize 32x32 images/favicon.png
magick images/favicon.svg -resize 180x180 images/apple-touch-icon.png

# Social Media
magick images/twitter-cover.svg -resize 1500x500 images/twitter-cover.png
magick images/linkedin-cover.svg -resize 1128x191 images/linkedin-cover.png
magick images/social-profile.svg -resize 400x400 images/social-profile.png

# Open Graph
magick images/og-image.svg -resize 1200x630 images/og-image.png
```

## Platform-Specific Recommendations

### Twitter / X
- Profile image: social-profile.png (400x400)
- Header: twitter-cover.png (1500x500)
- Optimal format: PNG with transparent backgrounds where applicable

### LinkedIn (Company Page)
- Logo: social-profile.png (300x300 min)
- Cover: linkedin-cover.png (1128x191)
- Format: PNG or JPG

### Facebook
- Profile: social-profile.png (min 180x180)
- Cover: Can use og-image.png or custom (820x312)

### Google Search
- Uses og-image.png from meta tags
- Structured data includes logo-icon.svg reference
- Favicon.svg/png appears in browser and search results
