# Andria Labs Website Redesign Plan
## Transformation to Clean, Professional Multi-Page Site

**Objective:** Transform the current site into a polished, professional multi-page website inspired by minimal, focused design principles (like cusp.ai) while maintaining SEO benefits and showcasing services effectively.

---

## Phase 1: Content Audit & Cleanup (Priority: CRITICAL)
**Timeline:** 2-3 days

### 1.1 Remove All Dummy/Empty Content
**Problem:** Multiple cards and sections contained empty placeholder content (`w-dyn-bind-empty` class) that looked broken.

**Action Items:**
- [x] **index.html - Remove empty service card** (line ~258)
  - Contains: `<h3 class="w-dyn-bind-empty"></h3>`
  - Empty service icon and description
  - **Action:** Deleted entire `<a class="service-card">` element so the collection renders nothing until real CMS data exists.

- [x] **index.html - Remove empty work/project card** (line ~1281)
  - Contains: Empty heading and description
  - **Action:** Removed `<a class="our-work-card">` markup to prevent blank project tiles.

- [x] **index.html - Remove empty blog card** (line ~1460)
  - Contains: `<h3 class="blog-heading w-dyn-bind-empty"></h3>`
  - **Action:** Removed `<a class="blog-card">` wrapper so blog preview stays hidden until populated.

- [x] **Verify no other empty content**
  - Search for: `w-dyn-bind-empty` class across all HTML files
  - Result: `rg` confirms zero remaining matches (`index.html` only)

**Status:** Completed — no broken/empty cards remain on the homepage.

---

### 1.2 Simplify Navigation Structure
**Problem:** Navigation references pages that don't exist, creating broken user experience.

**Action Items:**
- [ ] **Update navigation to only show existing pages:**
  ```html
  Current Navigation:
  - Home ✅
  - Team ✅
  - Reviews ✅
  - Contact Us ✅

  Remove from any footer/nav references:
  - Style Guide (doesn't exist)
  - Blog (no content)
  - Services page (no content)
  - Projects page (no content)
  ```

- [ ] **Clean up footer links** (already partially done)
  - Keep: Team, Reviews, Licenses, Changelog, Privacy Policy, Terms & Conditions
  - Remove: Style Guide, 404 page, Protected page (or make these functional)

**Expected Outcome:** All navigation links work, no dead ends.

---

### 1.3 Content Consolidation
**Problem:** Too many sections on homepage create overwhelming scroll experience.

**Action Items:**
- [ ] **Audit homepage sections:**
  - Banner/Hero ✅ Keep
  - Services ✅ Keep (but simplify)
  - Why Choose Us ✅ Keep
  - Tools We Use ✅ Keep
  - Pricing ⚠️ Review (do you have pricing?)
  - Workflow ⚠️ Review (is this needed?)
  - Testimonials ✅ Keep (short version)
  - Team preview ⚠️ Decide (link to team page instead?)
  - Blog preview ❌ Remove (no blog content)
  - Contact form ✅ Keep

- [ ] **Recommended homepage structure:**
  1. Hero section with clear value proposition
  2. Services overview (3-4 key services)
  3. Why Choose Us (3-4 key benefits)
  4. Testimonials (2-3 featured)
  5. Contact CTA section

**Expected Outcome:** Homepage is focused, not overwhelming.

---

## Phase 2: Visual Design Cleanup (Priority: HIGH)
**Timeline:** 3-4 days

### 2.1 Fix Color Consistency Issues
**Problem:** Some text appears invisible or low contrast.

**Action Items:**
- [ ] **Verify button text visibility**
  - All buttons should have dark text (#1B3C53) on beige background (#D2C1B6)
  - Test all button states: normal, hover, active
  - Location: `css/color-palette-override.css` (already fixed, but verify)

- [ ] **Check all text contrast ratios**
  - Body text: #D2C1B6 on #1B3C53 background ✅
  - Headings: #D2C1B6 on #1B3C53 background ✅
  - Button text: #1B3C53 on #D2C1B6 background ✅
  - Use WCAG contrast checker to verify all meet AA standards (4.5:1 minimum)

**Expected Outcome:** All text is clearly visible with proper contrast.

---

### 2.2 Remove Unnecessary Visual Clutter
**Problem:** Too many decorative elements distract from content.

**Action Items:**
- [ ] **Reduce decorative icon opacity**
  - Already set to 30% in `color-palette-override.css`
  - Consider removing entirely: `.decorative-icon-01`, `.decorative-icon-08`, etc.
  - OR reduce further to 10-15% opacity

- [ ] **Remove background patterns**
  - Already done: `background-image: none !important` on all elements
  - Verify no patterns visible on any section

- [ ] **Simplify section backgrounds**
  - Use only 2-3 background colors maximum:
    - Main: #1B3C53 (deep blue-gray)
    - Accent: #234C6A (medium blue-gray)
    - Cards: #1E4259 (slightly lighter)

**Expected Outcome:** Clean, minimal visual hierarchy.

---

### 2.3 Improve Spacing & Breathing Room
**Problem:** Sections feel cramped, not enough white space.

**Action Items:**
- [ ] **Increase section padding**
  - Current: 60px top/bottom
  - Recommended: 100-120px top/bottom for major sections
  - Mobile: 60-80px top/bottom

- [ ] **Add more space between elements**
  - Card grids: increase gap from 30px to 40-50px
  - Heading margins: add 30-40px bottom margin
  - Paragraph spacing: 20-24px line height

- [ ] **Container width optimization**
  - Keep current responsive containers
  - Ensure content never feels squeezed on any screen size

**Expected Outcome:** Design feels spacious and premium.

---

### 2.4 Typography Refinement
**Problem:** Text hierarchy could be clearer.

**Action Items:**
- [ ] **Review font sizes:**
  ```
  H1 (Page titles): 48-64px (desktop), 36-42px (mobile)
  H2 (Section headings): 36-48px (desktop), 28-32px (mobile)
  H3 (Card titles): 24-28px (desktop), 20-24px (mobile)
  Body text: 16-18px (desktop), 16px (mobile)
  Small text: 14px
  ```

- [ ] **Font weight consistency:**
  - Headings: 600-700 weight
  - Body: 400 weight
  - Bold emphasis: 600 weight

- [ ] **Line height optimization:**
  - Headings: 1.2-1.3
  - Body text: 1.6-1.8
  - Buttons: 1.4

**Expected Outcome:** Clear typographic hierarchy.

---

## Phase 3: Layout & Structure Improvements (Priority: MEDIUM)
**Timeline:** 4-5 days

### 3.1 Homepage Restructuring

**Current Issues:**
- Too many sections (10+)
- Unclear user journey
- Sections with no content (blog, projects)

**Recommended Structure:**

```
HOMEPAGE SECTIONS:
┌─────────────────────────────────────┐
│ 1. HERO / BANNER                     │
│    - Clear headline                  │
│    - Value proposition               │
│    - Primary CTA button              │
│    - Height: 100vh (full screen)     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 2. SERVICES                          │
│    - 3-6 service cards               │
│    - Grid layout: 2-3 columns        │
│    - Each with icon, title, desc     │
│    - Remove empty service cards      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 3. WHY CHOOSE US                     │
│    - 4-6 benefit cards               │
│    - Grid layout: 2-3 columns        │
│    - Keep existing content           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 4. TOOLS WE USE (OPTIONAL)           │
│    - Tool icons (fixed blend mode)   │
│    - 4 tools displayed               │
│    - Keep or remove based on value   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 5. TESTIMONIALS                      │
│    - 2-3 featured testimonials       │
│    - Link to full testimonials page  │
│    - Carousel or grid                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 6. TEAM PREVIEW (OPTIONAL)           │
│    - 3-4 key team members            │
│    - Link to full team page          │
│    - OR remove and just link to page │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 7. CONTACT / CTA                     │
│    - Clear call to action            │
│    - Contact form or button          │
│    - Email & address                 │
└─────────────────────────────────────┘

REMOVE THESE SECTIONS:
❌ Pricing (if no pricing available)
❌ Workflow (unless critical)
❌ Blog preview (no blog content)
❌ Projects preview (no projects content)
```

**Action Items:**
- [ ] Delete sections with no real content
- [ ] Reorder remaining sections for logical flow
- [ ] Ensure each section has clear purpose
- [ ] Add smooth transitions between sections (optional: CSS scroll-snap)

**Expected Outcome:** Homepage tells clear story in 5-7 sections max.

---

### 3.2 Individual Page Optimization

#### **Team Page**
**Current State:** ✅ Good structure
**Action Items:**
- [ ] Verify all team member images load
- [ ] Ensure social links work or remove if not used
- [ ] Add brief team introduction section at top
- [ ] Consider limiting to 6-8 team members (most important)

#### **Testimonials Page**
**Current State:** ✅ Good structure
**Action Items:**
- [ ] Verify all 8 testimonials display correctly
- [ ] Ensure star ratings are visible
- [ ] Add filter/category if needed (by service type)
- [ ] Link back to contact page clearly

#### **Contact Page**
**Current State:** ✅ Good structure
**Action Items:**
- [ ] Verify form submissions work
- [ ] Test email validation
- [ ] Ensure Google Maps link works (currently goes to Springfield, IL)
- [ ] Add FAQ section if common questions exist

**Expected Outcome:** Each page serves clear purpose, no wasted sections.

---

### 3.3 Mobile Responsiveness Check
**Problem:** Need to ensure mobile experience matches desktop quality.

**Action Items:**
- [ ] **Test on actual devices:**
  - iPhone (Safari)
  - Android (Chrome)
  - Tablet (iPad)

- [ ] **Verify mobile breakpoints:**
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: 320px - 767px

- [ ] **Check mobile-specific issues:**
  - Navigation menu (hamburger) works
  - Buttons are large enough (44px min touch target)
  - Text is readable (16px minimum)
  - Forms are easy to fill out
  - Images scale properly

- [ ] **Mobile performance:**
  - Page loads in < 3 seconds
  - No horizontal scrolling
  - Smooth scrolling on touch devices

**Expected Outcome:** Perfect mobile experience.

---

## Phase 4: Performance & Technical Optimization (Priority: MEDIUM)
**Timeline:** 2-3 days

### 4.1 Image Optimization
**Action Items:**
- [ ] **Compress all images:**
  - Use WebP format where possible
  - Fallback to optimized PNG/JPG
  - Target: < 100KB per image

- [ ] **Implement lazy loading:**
  - Add `loading="lazy"` to all images
  - Already done for most, verify all images have it

- [ ] **Provide alt text:**
  - Every image needs descriptive alt text
  - Check for generic "Image" alt text and improve

**Expected Outcome:** Faster page loads, better SEO.

---

### 4.2 Code Cleanup
**Action Items:**
- [ ] **Remove unused CSS:**
  - Audit `isidoras-agency.webflow.css` for unused rules
  - Consider using PurgeCSS or similar tool

- [ ] **Minify assets:**
  - CSS: Already have minified versions
  - JS: Ensure all scripts are minified
  - HTML: Consider minification for production

- [ ] **Consolidate CSS files:**
  - Currently loading 9 CSS files
  - Consider combining into 2-3 files max
  - Order: normalize.css → design-tokens.css → main.css → overrides.css

**Expected Outcome:** Reduced file size, faster loads.

---

### 4.3 SEO Improvements
**Action Items:**
- [ ] **Add/verify meta tags on all pages:**
  ```html
  <title>Page Title | Andria Labs</title>
  <meta name="description" content="150-160 char description">
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="URL to image">
  ```

- [ ] **Verify structured data:**
  - Organization schema ✅ (already present)
  - Breadcrumbs ✅ (already present)
  - Reviews schema ✅ (already present)

- [ ] **Check internal linking:**
  - All pages link to each other logically
  - No orphan pages
  - Clear site hierarchy

- [ ] **Create/update sitemap.xml:**
  - List all pages
  - Submit to Google Search Console

**Expected Outcome:** Better search engine visibility.

---

## Phase 5: Final Polish & Testing (Priority: HIGH)
**Timeline:** 3-4 days

### 5.1 Cross-Browser Testing
**Test on:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Check for:**
- [ ] Layout consistency
- [ ] Button functionality
- [ ] Form submissions
- [ ] Image loading
- [ ] Animation performance
- [ ] Font rendering

---

### 5.2 Accessibility Audit
**Action Items:**
- [ ] **Run WAVE accessibility checker:**
  - URL: https://wave.webaim.org/

- [ ] **Verify keyboard navigation:**
  - Tab through entire site
  - All interactive elements accessible
  - Focus indicators visible

- [ ] **Check screen reader compatibility:**
  - Test with NVDA (Windows) or VoiceOver (Mac)
  - Ensure alt text is descriptive
  - Verify ARIA labels where needed

- [ ] **Color contrast:**
  - Already checked, but verify with tool:
  - https://webaim.org/resources/contrastchecker/

**Expected Outcome:** WCAG 2.1 AA compliance minimum.

---

### 5.3 Performance Testing
**Action Items:**
- [ ] **Run Google PageSpeed Insights:**
  - URL: https://pagespeed.web.dev/
  - Target: 90+ score on mobile and desktop

- [ ] **Check Core Web Vitals:**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

- [ ] **Optimize if needed:**
  - Defer non-critical JavaScript
  - Preload critical resources
  - Optimize font loading

**Expected Outcome:** Fast, smooth user experience.

---

### 5.4 Content Review
**Action Items:**
- [ ] **Proofread all text:**
  - Check for typos
  - Verify grammar
  - Ensure consistent tone/voice

- [ ] **Verify all links:**
  - Internal links work
  - External links open in new tabs
  - No broken links (404s)

- [ ] **Check contact information:**
  - Email: hello@andrialabs.ai ✅
  - Address: Verify if Springfield, IL is correct
  - Social media links (if applicable)

**Expected Outcome:** Professional, error-free content.

---

## Phase 6: Optional Enhancements (Priority: LOW)
**Timeline:** As needed

### 6.1 Animation & Interactions
**Consider Adding:**
- [ ] Smooth scroll-snap between sections
- [ ] Fade-in animations for sections on scroll
- [ ] Hover effects on cards (already have some)
- [ ] Loading animations
- [ ] Page transition effects

**Libraries to Consider:**
- GSAP (already loaded)
- Intersection Observer API
- CSS scroll-snap

---

### 6.2 Advanced Features
**Future Considerations:**
- [ ] Blog system (if needed)
- [ ] Portfolio/case studies section (if have projects)
- [ ] Client login area
- [ ] Live chat integration
- [ ] Newsletter integration (form already exists)
- [ ] Analytics dashboard

---

## Success Criteria

### Must Have (Phase 1-3):
✅ No broken/empty content visible
✅ All navigation links work
✅ All buttons visible and functional
✅ Mobile responsive on all devices
✅ Clear visual hierarchy
✅ Fast page loads (< 3s)

### Should Have (Phase 4-5):
✅ WCAG AA accessibility compliance
✅ 90+ PageSpeed score
✅ All SEO meta tags present
✅ Cross-browser compatibility
✅ Professional, polished design

### Nice to Have (Phase 6):
✅ Smooth animations
✅ Interactive elements
✅ Advanced features as needed

---

## Delivery Checklist

Before considering the project complete:

- [ ] All dummy/empty content removed
- [ ] All navigation links functional
- [ ] All buttons visible with correct styling
- [ ] Color palette consistently applied
- [ ] Mobile responsive (tested on real devices)
- [ ] Cross-browser compatible (tested on 4+ browsers)
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance optimized (90+ PageSpeed score)
- [ ] SEO meta tags complete
- [ ] All content proofread
- [ ] No console errors in browser
- [ ] Forms tested and working
- [ ] Analytics tracking installed (if applicable)
- [ ] Site deployed to production
- [ ] DNS configured correctly
- [ ] SSL certificate active

---

## Current Site Status (As of Oct 27, 2025)

### ✅ Completed:
- Color palette implementation (#1B3C53, #234C6A, #456882, #D2C1B6)
- Removed 404 page and broken references
- Fixed style guide broken link
- Fixed Tools We Use section (removed blend mode)
- Fixed button text visibility (was invisible - beige on beige)
- Fixed all placeholder href="#" links
- Fixed address links to Google Maps
- Changed broken page links to contact-us.html

### ⚠️ Remaining Issues:
- Empty/dummy content cards still visible (w-dyn-bind-empty)
- Too many sections on homepage (10+ sections)
- Some sections have no actual content
- Need to simplify and consolidate

### 🎯 Priority Next Steps:
1. Remove all empty content (service, work, blog cards)
2. Simplify homepage to 5-7 focused sections
3. Clean up navigation (remove non-existent pages)
4. Test mobile responsiveness
5. Run accessibility and performance audits

---

## Timeline Summary

**Total Estimated Time:** 14-20 days

- Phase 1 (Content Cleanup): 2-3 days
- Phase 2 (Visual Design): 3-4 days
- Phase 3 (Layout Improvements): 4-5 days
- Phase 4 (Technical Optimization): 2-3 days
- Phase 5 (Testing & Polish): 3-4 days
- Phase 6 (Optional): As needed

**Recommended Approach:**
Execute phases sequentially. Each phase should be reviewed and approved before moving to the next.

---

## Developer Notes

### Current Tech Stack:
- HTML5
- CSS3 (Multiple stylesheets)
- Webflow-generated CSS
- GSAP for animations
- Custom JavaScript for interactions
- Vercel for hosting

### Key Files:
- `index.html` - Homepage
- `team.html` - Team page
- `testimonial.html` - Reviews page
- `contact-us.html` - Contact page
- `css/color-palette-override.css` - Main color overrides (load LAST)
- `css/design-tokens.css` - Design system variables
- `css/isidoras-agency.webflow.css` - Webflow-generated styles

### Deployment:
- Platform: Vercel
- Command: `vercel --prod`
- Live URL: https://andrialabs.ai (configured via DNS)

### Important CSS Override Order:
```html
1. normalize.css
2. webflow.css
3. isidoras-agency.webflow.css
4. design-tokens.css
5. design-tokens-overrides.css
6. mobile-optimizations.css
7. cookie-consent.css
8. skip-navigation.css
9. color-palette-override.css ← MUST BE LAST
```

---

## Support & Questions

For questions or clarifications on any phase of this plan, contact:
- Email: hello@andrialabs.ai
- Developer can also reference this document for step-by-step guidance

---

**Document Version:** 1.0
**Last Updated:** October 27, 2025
**Status:** Ready for Development
