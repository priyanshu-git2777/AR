# Portfolio Setup Guide

## Files Included
- index.html  — Main HTML structure
- style.css   — All styles (dark brutalist theme)
- script.js   — Animations, canvas, interactions

## Quick Start
1. Download all 3 files into the same folder
2. Open index.html in your browser — done!
3. No build tools, no npm, no dependencies.

## Customization

### Change Your Name/Info
In index.html, replace "Alex Rivera" with your name, "AR" with your initials.

### Change Colors
In style.css :root:
  --accent: #FF4D00;   (your brand color)
  --accent2: #FFB800;  (secondary)
  --bg: #080808;       (background)

### Add Real Photo
Replace the .about-img-placeholder block:
  <img src="photo.jpg" alt="Name" style="width:280px;height:280px;border-radius:50%;object-fit:cover;" />

### Update Projects
Edit each .project-card — change emoji, colors, title, description, links.

### Contact Form
Replace href="mailto:alex@example.com" and social links with yours.

## Deploy Free
- GitHub Pages: Push repo, enable Pages in Settings
- Netlify: Drag folder to netlify.com/drop
- Vercel: npx vercel

## Features
- Responsive (mobile/tablet/desktop)
- Custom animated cursor
- Interactive particle canvas hero
- Scroll-triggered reveal animations
- Animated counters
- Skill progress bars
- 3D tilt on project cards
- Sticky nav with backdrop blur
- Infinite marquee ticker
- Mobile hamburger menu
- Contact form with success state
- Zero dependencies
