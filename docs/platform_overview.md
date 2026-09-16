# Huntrify Platform Brief & Architecture Guide

## 1. Overview
**Huntrify** is an AI-powered freelancing and hiring platform designed to unify various stakeholders into a single ecosystem. It is an India-first launch targeting 15M+ freelancers, with global expansion planned.
*Scope:* Web App Only (Public marketing website is excluded).

## 2. User Types (5 Dashboards)
The platform serves 5 distinct user types, each requiring a specialized dashboard:
1. **Freelancer** (Tools Hub: proposal/portfolio tools)
2. **Job Seeker**
3. **Client** (Tools Hub: project management)
4. **Agency** (Tools Hub: team/analytics dashboard)
5. **Hiring Partner** (Tools Hub: applicant tracking + campaigns)

## 3. Core AI Systems
1. **Matchmaking:** Provides 0–100% compatibility scoring between users.
2. **Skill Gap Detection:** Advanced learning path suggestions (not just free YouTube links).
3. **Fraud Detection:** Tightly integrated with the 4-layer verification flow.
4. **Behavior-Learning AI:** Learns user behavior to improve matching accuracy over time.
5. **AI Chat Assistant:** A platform-wide assistant available to users.

## 4. Fraud Prevention & Identity Verification (4-Layer System)
- **Layer 1:** Basic signup.
- **Layer 2:** Profile + government ID submission.
- **Layer 3:** Live selfie facial match.
- **Layer 4:** AI live video test (dynamic, niche-specific questions + lip-sync monitoring to catch proxies/fake profiles).
- **Failure Flow:** Up to 3 retry attempts with 12–24 hr cooldowns -> Account suspension -> Support ticket for manual video review.
- **AI Interview Module Details:** DPDP Act compliance (consent API, data retention), client-side face detection (face-api.js or MediaPipe for cost control), configurable scoring weightage.

## 5. Core Platform Features
- **Social Feed:** Instagram-style feed.
- **Notifications:** Real-time notifications via WhatsApp + email.
- **Tools Hub:** Role-specific tools (as mentioned in User Types).
- **Quick Commerce / Quick Booking:** Instant booking of fixed services directly from providers.

## 6. Monetization (Launch Model)
- **Free Tier Subscription:** 12–15% commission.
- **Paid Tier Subscription:** 4–5% commission, ₹999/month (India).
- **Job Ad Campaigns:** Meta-style ad system (Boost posts).
- **Project Commission:** Standard platform cut.
- *(Note: Connects/pay-to-apply models are intentionally excluded from launch to build trust/user base).*

## 7. Admin Dashboard (11 Modules)
1. Main dashboard
2. Payment management
3. Support
4. Notification center
5. WhatsApp broadcast + direct chat
6. Security & verification
7. Job/Project management
8. AI control panel + Tools Hub management
9. Quick commerce management
10. Logs & monitoring
11. Users management

## Development Guidelines for Frontend
- **Framework:** React + Vite + Tailwind CSS v4.
- **Design System:** Strictly follows `theme.md`. CSS is completely modularized inside `src/styles/` (`theme.css`, `components.css`, `responsiveness.css`) to ensure unified colors, typography, border-radius, and pixel-perfect paddings across all devices.
- **Workflow:** Build step-by-step, focusing on one specific page/dashboard at a time.
- **Rule:** Before building any feature, review this brief to ensure it aligns with the core vision, appropriate user type, and AI/Verification rules.
