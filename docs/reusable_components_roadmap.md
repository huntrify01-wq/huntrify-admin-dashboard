# Huntrify Reusable UI Components Roadmap

This document serves as the master tracking list for all reusable UI components required for the Huntrify Platform, based on the `Huntrify_Platform_Brief_Dev.pdf`. It follows an Atomic Design approach to ensure consistency, reusability, and clean code architecture across all 5 user dashboards and 11 admin modules.

---

## ✅ Phase 1: Completed Components
These components have already been designed, integrated with the global theme (`var(--primary-color)`, `var(--success-color)`), and are fully functional.

### Base / Globals
- [x] **`ThemeToggle`** (`themetoggle.tsx`) - Premium sliding pill dark/light mode toggle.
- [x] **`MainLoader`** (`mainloader.tsx`) - Standard platform-wide loading spinner.
- [x] **`AnimatedIcon`** (`animated_icon.tsx`) - Lottie/Lordicon wrapper with real-time theme CSS variable injection.

### Buttons (`src/components/button/`)
- [x] **`PrimaryButton`** - Standard action button.
- [x] **`SecondaryButton`** - Secondary outlined/ghost action button.
- [x] **`ButtonWithIcon`** - Button with leading/trailing icon.
- [x] **`OnlyIconButton`** - Icon-only button with built-in `<MainLoader>` loading state.

### Form Inputs (`src/components/form_components/`)
- [x] **`Input`** - Base text input with floating label and validation states.
- [x] **`EmailInput`** - Custom email input with Regex validation.
- [x] **`PasswordInput`** - Secure input with visibility toggle and strength progress bar.
- [x] **`PhoneInput`** - Advanced phone input with custom `react-phone-number-input` country flag selector, search dropdown, and live validation.
- [x] **`Selector`** - Custom dropdown selector with icons and smooth dropdown animations.
- [x] **`Checkbox`** - Custom premium checkbox with centered checkmark.
- [x] **`Radio`** - Custom radio button matching platform theme.
- [x] **`CheckboxCard`** (Various) - Selectable UI cards (Base, WithIcon, WithEmoji, WithNumber, WithAvatar).

### Cards / Containers (`src/components/card/`)
- [x] **`DottedLinesCard`** (`dottedlinescard.tsx`) - Flexible container with dashed borders and hover states.

---

## ⏳ Phase 2: Pending Components To Be Created

These components need to be built to fulfill the complete platform brief.

### 1. Core Atoms & Feedback
- [x] **RangeSelector** - Dual thumb range slider.
 - Reusable user profile picture component (sizes: sm, md, lg, xl, rounded/square).
- [x] **`Badge` / `Chip`** - Role tags, Status markers (e.g., Verified, Active, Suspended).
- [x] **InfoBanner** - Highlighted contextual alerts and notices.
 - Monospace tech/code tags for file names, skills, or technical labels.
- [x] **`ProgressBar`** - General progress bar (e.g., Match Compatibility 0-100%).
- [x] **`SkeletonLoader`** - Skeleton loading state for cards and feeds.
- [x] **`Toast` / `Snackbar`** - Global notification alerts (Success, Error, Info).
- [x] **`Tooltip` / `Popover`** - Hover-based context info boxes.
- [x] **`Modal`** - Base overlay wrapper for centered dialogs.
- [x] **`Drawer` / `SlideOver`** - Right-side sliding panel for admin settings/filters.

### 2. Layout & Navigation
- [ ] **`Sidebar`** - Collapsible vertical navigation based on user role.
- [ ] **`TopNavbar`** - Header with global search, notifications bell, and profile menu.
- [ ] **`Tabs`** - Segmented controls for switching views (e.g., Analytics vs Settings).
- [ ] **`Breadcrumbs`** - Top-level navigation path (mainly for Admin modules).
- [ ] **`BottomNav`** - Mobile-only navigation bar.

### 3. Forms (Advanced)
- [x] **`TextArea`** - Multi-line text input with character limits (for proposals, bios).
- [x] **`RichTextEditor`** - WYSIWYG editor for job postings and portfolio descriptions.
- [x] **`MultiSelect`** - Tag-based selector for skills and categories.
- [x] **`ToggleSwitch`** - On/Off switch for settings and preferences.
- [x] **`FileUpload`** - Drag-and-drop zone with thumbnail previews.

### 4. Verification & AI Video Security (4-Layer)
- [ ] **`GovIdScanner`** - Document capture frame for ID submission (Layer 2).
- [ ] **`LiveCameraFeed`** - Webcam preview container for Selfie capture (Layer 3).
- [ ] **`AIInterviewScreen`** - Video recording UI with dynamic text question overlay (Layer 4).
- [ ] **`CountdownTimer`** - Visual timer for AI test questions.
- [ ] **`ConsentBanner`** - DPDP Act compliant consent dialog.

### 5. Social Feed (Instagram-Style)
- [ ] **`FeedPostCard`** - Media/Text wrapper for social feed.
- [ ] **`VideoPlayer`** - Auto-play optimized video component for feed.
- [ ] **`PostActionBar`** - Like, Comment, Share, Save action row.
- [ ] **`CommentItem`** & **`CommentInput`** - Modular thread components.
- [ ] **`StoryThumbnail`** - Circular rings for short-form content.

### 6. Tools Hub & Matchmaking
- [ ] **`MatchScoreGauge`** - Circular ring indicating 0-100% compatibility.
- [ ] **`SkillGapCard`** - Recommendation card for AI learning paths.
- [ ] **`KanbanBoard`** & **`TaskCard`** - Drag-and-drop project management components.
- [ ] **`ProposalCard`** - Pitch presentation UI for freelancers.
- [ ] **`ApplicantRow`** - ATS (Applicant Tracking System) list item for Hiring Partners.

### 7. Monetization & Quick Commerce
- [ ] **`ServiceCard`** - Quick booking UI with service image, price, and CTA.
- [ ] **`PricingPlanCard`** - Free vs Paid tier comparison card (highlighting 4-5% vs 12-15% commission).
- [ ] **`CheckoutSummary`** - Payment detail, tax, and total breakdown modal.
- [ ] **`AdCampaignCard`** - Boosted post tracking and analytics mini-card.

### 8. Communication
- [ ] **`ChatBubble`** - Incoming/Outgoing message design.
- [ ] **`ChatInputBar`** - Text input with attachment and voice note actions.
- [ ] **`AIAssistantWidget`** - Floating chat icon and panel for platform-wide assistant.
- [ ] **`NotificationItem`** - Single row layout for real-time alerts.

### 9. Admin Modules (11 Dashboards)
- [ ] **`DataTable`** - High-performance grid with sorting, filtering, and pagination.
- [ ] **`StatWidget`** - Number summary card (e.g., Total Revenue, Active Users).
- [ ] **`ChartWrapper`** - Container for Line, Bar, and Pie analytics charts.
- [ ] **`LogViewer`** - Terminal-style read-only view for system logs.
