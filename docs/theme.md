# Huntrify Platform Theme

## Vision
Huntrify is a premium AI-powered hiring & freelancing platform. Design language combines Stripe (premium gradients for onboarding), Linear (minimal dark UI for dashboards), Perplexity (clean whitespace), Notion (readability), and Razorpay (enterprise trust for admin & payments).

## Brand Personality
- Premium & Trustworthy
- AI-first
- Enterprise-ready
- Minimal & Data-focused
- Fast & Responsive for all devices

## Default Theme
Dark mode by default (ideal for extended dashboard usage).

## Color Palette

### Dark
- Background: #000000
- Surface: #111113
- Card: #16171A
- Primary: #533afd
- Primary Hover: #3010fe
- Accent: #715cfcd5
- Success: #0dd456
- Warning: #ffa50a
- Error: #fb3d3d
- Text: #FFFFFF
- Secondary Text: #A1A1AA
- Muted: #71717A
- Border: #27272A

### Light
- Background: #FFFFFF
- Surface: #FAFAFA
- Card: #FFFFFF
- Primary: #533afd
- Primary Hover: #3010fe
- Accent: #715cfcd5
- Success: #0dd456
- Warning: #ffa50a
- Error: #fb3d3d
- Text: #09090B
- Secondary Text: #52525B
- Muted: #71717A
- Border: #E4E4E7

## Typography
- Heading A: Outfit ExtraBold (`font-headingA`)
- Heading B: Crimson Text Italic (`font-headingB`)
- Subheading: Righteous (`font-subheading`)
- Body/UI: Inter (fallback Poppins) (`font-body`)
*Important: Main heading is the combination of Heading A and Heading B. For platform dashboards, Body/UI font is heavily utilized for readability.*

## Layout
- Max width 1350px centered (Navbar/Sidebar/Footer via `content-container` class).
- Max width 1280px for page content (via `max-w-7xl` Tailwind class).
- Desktop: auto margins.
- Tablet: 32px padding.
- Mobile: 20px padding.
- Section spacing: 120px desktop / 72px mobile (adapted for dashboard panel spacing where necessary).
- 8px spacing system.
- Custom scrollbar: thin, themed with border color (essential for heavy data feeds).

## Components
- Buttons:
  - Primary: purple (#533afd), white text, 8px radius.
  - Secondary: outline, 8px radius.
  - Ghost: text only.
- Radius: Buttons 8px, Cards 24px, Inputs 14px.
- Navigation (Platform): Glass blur, sticky Sidebar/Topbar, minimal, 80px height standard.
- Cards: Thin border, soft shadow (for jobs, tools, analytics).
- Inputs: Animated bottom line on focus, glow effect.
- Modals: PopupBackdrop with blur background, CloseButton with rotate-90 hover.
- Backgrounds: GridBackground (CSS grid), DotBackground (canvas), GrainyBackground (animated grain).
- Glass wrappers: GlassCard, BlurGlassCard for glass morphism effects.

## Design Rules
- Large whitespace to keep dashboards uncluttered.
- Never stretch content beyond 1350px (Navbar/Footer/Layout container) or 1280px (page content via max-w-7xl).
- Hero/Onboarding uses gradients.
- Dashboard data sections and other areas mostly flat.
- Linear borders for data separation.
- Subtle animations only to ensure the platform remains fast.

## Responsive Breakpoints
- Desktop: >=1440px
- Laptop: 1280px
- Tablet: 768px
- Mobile: 390px
