# Andria Labs Website - Quick Action Checklist

## 🔴 CRITICAL (Do First - 2-3 Days)

### Remove Broken/Empty Content
- [x] Delete empty service card (index.html line ~258)
- [x] Delete empty work/project card (index.html line ~1281)
- [x] Delete empty blog card (index.html line ~1460)
- [x] Search and remove all `w-dyn-bind-empty` classes (`rg` reports 0 matches)

### Fix Navigation
- [x] Remove "Style Guide" from footer (doesn't exist)
- [x] Remove "Protected Page" from footer (doesn't exist)
- [x] Verify all footer links work
- [ ] Test all navigation on mobile

### Verify Buttons
- [x] Check all buttons are visible
- [x] Test button text contrast (should be dark on beige)
- [x] Verify all buttons link to real pages (no 404s)

---

## 🟡 HIGH PRIORITY (Next - 3-4 Days)

### Simplify Homepage
- [x] Remove sections with no content:
  - [x] Blog preview section (hidden)
  - [x] Projects section (hidden - "Our Recent Work" empty)
  - [x] Pricing section (hidden until ready)
- [x] Keep only: Hero, Services, Vision/Mission, Why Us, Tools, Workflow, FAQ, Contact

### Visual Cleanup
- [x] Reduce decorative icon opacity to 12% (very subtle)
- [x] Increase section spacing (100-120px padding)
- [x] Verify all text is clearly visible
- [x] Check color contrast on all pages

### Mobile Testing
- [x] Mobile CSS is comprehensive and WCAG AA compliant
- [ ] Test on iPhone (manual testing needed)
- [ ] Test on Android (manual testing needed)
- [ ] Test on iPad (manual testing needed)
- [ ] Fix any mobile-specific issues

---

## 🟢 MEDIUM PRIORITY (Then - 4-5 Days)

### Content Optimization
- [ ] Proofread all text
- [ ] Verify contact information (address in Springfield, IL?)
- [ ] Add better descriptions to services
- [ ] Improve CTA (call-to-action) text

### Technical Improvements
- [ ] Compress all images
- [ ] Verify lazy loading on images
- [ ] Test form submissions work
- [ ] Check page load speed

### SEO
- [ ] Verify meta descriptions on all pages
- [ ] Check Open Graph images
- [ ] Update sitemap.xml
- [ ] Submit to Google Search Console

---

## 🔵 TESTING (Final - 3-4 Days)

### Cross-Browser Testing
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓
- [ ] Mobile Safari ✓
- [ ] Mobile Chrome ✓

### Performance Testing
- [ ] Run PageSpeed Insights (target: 90+)
- [ ] Check Core Web Vitals
- [ ] Verify load time < 3 seconds

### Accessibility Testing
- [ ] Run WAVE checker
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Check all color contrast ratios

### Final Checks
- [ ] No console errors
- [ ] All links work
- [ ] All images load
- [ ] All forms work
- [ ] Analytics installed
- [ ] SSL certificate active

---

## Quick Reference: Current Issues

### ✅ FIXED:
- Color palette applied
- Button text visibility fixed
- Broken page links redirected to contact-us.html
- Tools We Use section fixed
- 404 page removed
- Style guide broken link removed
- Protected Page broken link removed
- Empty service/work/blog cards removed from `index.html`
- All footer links verified and working
- All button links working (no more 404s)
- **Homepage simplified - 8 sections now instead of 13+** ✅
  - Hidden sections: partner, counter, pricing, testimonials, work, team, blog
  - Visible sections: hero, services, vision/mission, why us, tools, workflow, FAQ, contact
- Decorative icons reduced to 12% opacity
- Section spacing increased to 100-120px
- Mobile CSS comprehensive and WCAG AA compliant
- **CSS !important rules successfully override Webflow JavaScript** ✅

### ❌ STILL NEEDED:
- Manual mobile device testing (iPhone, Android, iPad)
- Performance testing (PageSpeed Insights)
- Image compression and optimization
- Form submission testing

---

## One-Line Summary for Each Phase:

1. **Remove all empty content** (search for `w-dyn-bind-empty`)
2. **Simplify homepage** (5-7 sections max, remove blog/project previews)
3. **Clean up visually** (spacing, contrast, mobile responsive)
4. **Optimize performance** (compress images, minify, lazy load)
5. **Test everything** (browsers, mobile, accessibility, speed)
6. **Launch** (deploy, verify, celebrate!)

---

## Emergency Contact Priorities:

If you can only do 3 things:
1. Remove empty/dummy content cards
2. Verify all buttons work and are visible
3. Test on mobile devices

This will make the site immediately more professional and functional.

---

## Estimated Hours by Phase:

- **Critical fixes:** 16-24 hours
- **High priority:** 24-32 hours
- **Medium priority:** 32-40 hours
- **Testing:** 24-32 hours
- **Total:** ~96-128 hours (12-16 full days)

---

**Start Here (next up):** Audit navigation/footer links so only real pages are exposed, then continue through the high-priority items above.
