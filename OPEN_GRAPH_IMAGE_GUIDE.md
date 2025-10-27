# Open Graph Image Guide - Andria Labs

## Overview
This guide provides specifications for creating Open Graph (OG) images for social media sharing across Facebook, Twitter, LinkedIn, and other platforms.

## Image Specifications

### Standard Open Graph Image
- **Dimensions**: 1200 x 630 pixels (1.91:1 ratio)
- **Format**: PNG or JPG (PNG preferred for quality)
- **File size**: Under 1MB (ideally 200-500KB)
- **Location**: `/images/og/`
- **Minimum safe area**: Keep text/logo within 1200 x 600px center

### Twitter Card Image (Optional)
- **Dimensions**: 1200 x 600 pixels (2:1 ratio)
- **Format**: PNG or JPG
- **File size**: Under 5MB
- **Alternative**: Can reuse OG image

## Required Images to Create

### 1. Homepage OG Image
**Filename**: `og-home.png`
**Content**:
- Andria Labs logo (prominent)
- Tagline: "AI & SaaS Agency"
- Subtext: "Building Digital Innovation"
- Background: Branded gradient or tech-themed design
- Brand colors: Purple (#6366F1) and complementary tones

**Design tips**:
- Large, readable text (60px+ for main headline)
- High contrast between text and background
- Include subtle visual elements (abstract shapes, tech patterns)
- Leave 20% margin on all sides for safe area

### 2. Team Page OG Image
**Filename**: `og-team.png`
**Content**:
- "Meet Our Team" headline
- Andria Labs logo (top-left or bottom-right)
- Subtle team member silhouettes or abstract people icons
- Background with brand colors

### 3. Testimonials Page OG Image
**Filename**: `og-testimonials.png`
**Content**:
- "Client Reviews" or "What Our Clients Say" headline
- 5-star rating visual
- Andria Labs logo
- Quote marks or testimonial-themed design

### 4. Contact Page OG Image
**Filename**: `og-contact.png`
**Content**:
- "Get In Touch" or "Contact Us" headline
- Email icon or contact-themed visual
- Andria Labs logo
- "hello@andrialabs.ai" text

### 5. 404 Page OG Image (Optional)
**Filename**: `og-404.png`
**Content**:
- "404 - Page Not Found" headline
- Friendly error-themed visual
- Andria Labs logo
- Lighter, less formal design

## Design Tools You Can Use

### Free Options
1. **Canva** (https://canva.com)
   - Pre-made OG image templates
   - Easy drag-and-drop interface
   - Export at exact dimensions

2. **Figma** (https://figma.com)
   - Professional design tool
   - Free for personal use
   - Full control over design

3. **Adobe Express** (https://express.adobe.com)
   - Free templates
   - Easy to use
   - Good quality exports

### Quick AI Generation
1. **DALL-E** or **Midjourney**
   - Generate base images
   - Refine in Canva/Figma

2. **Remove.bg** (https://remove.bg)
   - Remove backgrounds from images
   - Clean up generated assets

## Design Best Practices

### Typography
- **Headline**: 60-80px, bold, high contrast
- **Subtext**: 30-40px, medium weight
- **Body**: 24-32px for any additional text
- **Font**: Sans-serif (Inter, Poppins, Roboto)

### Colors
- **Primary**: #6366F1 (Indigo/Purple from your brand)
- **Secondary**: #10B981 (Accent green) or #F59E0B (Amber)
- **Background**: White, off-white, or subtle gradient
- **Text**: Dark (#1F2937) on light, White (#FFFFFF) on dark

### Composition
- **F-Pattern**: Most important info top-left
- **Hierarchy**: Logo → Headline → Supporting text
- **Breathing room**: Don't overcrowd
- **Consistency**: Similar style across all images

## Brand Elements to Include

### Logo
- Location: `/images/logo-icon.svg` (your current logo)
- Placement: Top-left corner or bottom-right
- Size: 80-120px height
- Add padding/margin around it

### Colors from Your Site
- **Purple/Indigo**: `#6366F1` (primary buttons)
- **Dark**: `#1A1F2E` (text, backgrounds)
- **Accent**: Use sparingly for highlights

### Typography
- **Primary font**: "Funnel Display" (your headings)
- **Alternative**: "Inter" (body text) - widely available
- **Backup**: System sans-serif

## File Organization

```
/images/og/
├── og-home.png           (Homepage - Main OG image)
├── og-team.png           (Team page)
├── og-testimonials.png   (Reviews page)
├── og-contact.png        (Contact page)
├── og-404.png           (404 page - optional)
└── og-default.png        (Fallback for other pages)
```

## Testing Your Images

### Before Going Live
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
   - Test how images appear on Facebook
   - Clear cache if needed

2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Preview Twitter card appearance
   - Check image dimensions

3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
   - Validate LinkedIn sharing
   - Preview appearance

4. **General OG Checker**: https://www.opengraph.xyz/
   - Test multiple platforms at once

### Image Checklist
- [ ] Correct dimensions (1200x630)
- [ ] File size under 1MB
- [ ] Text is readable at thumbnail size
- [ ] Logo is visible and clear
- [ ] No text cut off at edges
- [ ] High contrast between text/background
- [ ] Branded colors used
- [ ] Saved as PNG or high-quality JPG

## Quick Start Template

If you want to create a simple OG image right now:

1. Open Canva
2. Search for "Open Graph Image" template
3. Choose a template you like
4. Replace text with:
   - Your page title
   - Andria Labs logo
   - Brand colors (#6366F1)
5. Export as PNG (1200x630)
6. Save to `/images/og/og-[pagename].png`
7. Update HTML with image path

## Example Code (Already Added to HTML)

```html
<!-- Open Graph / Facebook -->
<meta property="og:title" content="Andria Labs - AI & SaaS Agency">
<meta property="og:description" content="Building Digital Innovation">
<meta property="og:image" content="https://andrialabs.ai/images/og/og-home.png">
<meta property="og:url" content="https://andrialabs.ai">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Andria Labs">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Andria Labs - AI & SaaS Agency">
<meta name="twitter:description" content="Building Digital Innovation">
<meta name="twitter:image" content="https://andrialabs.ai/images/og/og-home.png">
```

## Next Steps

1. **Create the images** using the specs above
2. **Save them** to `/images/og/` directory
3. **Test them** using the validation tools
4. **Submit to social media** after deployment:
   - Share a test post on Facebook
   - Tweet a link
   - Post on LinkedIn

## Mobile Considerations

Social media platforms display OG images differently on mobile:
- **Facebook Mobile**: Crops to square (600x600) from center
- **Twitter Mobile**: Full image visible
- **LinkedIn Mobile**: Similar to Facebook

**Design tip**: Keep critical elements (logo, main text) in the center 600x600px area.

## Common Mistakes to Avoid

❌ **Don't**:
- Use text smaller than 60px for headlines
- Put important info near edges
- Use low-contrast text
- Create file sizes over 1MB
- Forget to test on actual platforms

✅ **Do**:
- Use high contrast
- Keep it simple and bold
- Test at small sizes
- Include your logo
- Use brand colors consistently

## Resources

- **Canva OG Templates**: https://www.canva.com/templates/s/open-graph/
- **Figma OG Kit**: https://www.figma.com/community/search?model_type=files&q=open%20graph
- **OG Image Guide**: https://www.opengraph.xyz/blog/open-graph-image-guide/
- **Facebook Sharing**: https://developers.facebook.com/docs/sharing/webmasters/

---

**Status**: Guide complete. Images need to be created using design tools.

**Estimated time to create all images**: 1-2 hours using Canva templates.

**Priority order**:
1. Homepage (most important)
2. Contact page
3. Team page
4. Testimonials page
5. 404 page (optional)
