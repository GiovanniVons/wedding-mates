# Production File Manifest -- Wedding Mates
_Generated 2026-06-22 for Phase 4 reviewers. Only audit these reachable files._

## Routes (pages + handlers)
- src/app/(auth)/auth/callback/route.ts
- src/app/(auth)/forgot-password/page.tsx
- src/app/(auth)/layout.tsx
- src/app/(auth)/login/page.tsx
- src/app/(auth)/register/page.tsx
- src/app/(auth)/reset-password/page.tsx
- src/app/(booking)/book/confirmation/page.tsx
- src/app/(booking)/book/page.tsx
- src/app/(booking)/layout.tsx
- src/app/(course)/course/[moduleSlug]/page.tsx
- src/app/(course)/course/introduction/page.tsx
- src/app/(course)/course/page.tsx
- src/app/(course)/course/readings/page.tsx
- src/app/(course)/course/strategies/page.tsx
- src/app/(course)/layout.tsx
- src/app/(internal)/design-book/layout.tsx
- src/app/(internal)/design-book/page.tsx
- src/app/(locked)/course/locked/page.tsx
- src/app/(marketing)/about/page.tsx
- src/app/(marketing)/blog/[slug]/page.tsx
- src/app/(marketing)/blog/page.tsx
- src/app/(marketing)/contact/page.tsx
- src/app/(marketing)/faq/page.tsx
- src/app/(marketing)/how-it-works/page.tsx
- src/app/(marketing)/layout.tsx
- src/app/(marketing)/page.tsx
- src/app/(marketing)/pricing/page.tsx
- src/app/(marketing)/privacy/page.tsx
- src/app/(marketing)/reviews/page.tsx
- src/app/(marketing)/terms/page.tsx
- src/app/api/contact/route.ts
- src/app/api/stripe/checkout/route.ts
- src/app/api/stripe/session-status/route.ts
- src/app/api/stripe/webhook/route.ts
- src/app/error.tsx
- src/app/global-error.tsx
- src/app/layout.tsx
- src/app/not-found.tsx

## Components
- src/components/animations/ConfettiBurst.tsx
- src/components/animations/ScrollReveal.tsx
- src/components/booking/BookingConfirmation.tsx
- src/components/booking/BookingWizard.tsx
- src/components/course/CourseMobileNav.tsx
- src/components/course/CourseSidebarLive.tsx
- src/components/course/DashboardProgress.tsx
- src/components/course/LessonActions.tsx
- src/components/course/LessonBody.tsx
- src/components/course/LessonView.tsx
- src/components/course/SupportBlock.tsx
- src/components/layout/BookingHeader.tsx
- src/components/layout/Footer.tsx
- src/components/layout/Header.tsx
- src/components/layout/MarketingHeader.tsx
- src/components/layout/StickyCtaBar.tsx
- src/components/layout/StickyCtaController.tsx
- src/components/sections/ContactForm.tsx
- src/components/sections/CtaBand.tsx
- src/components/sections/HomeHero.tsx
- src/components/seo/JsonLd.tsx
- src/components/ui/Accordion.tsx
- src/components/ui/AuthShell.tsx
- src/components/ui/BookingExtras.tsx
- src/components/ui/Button.tsx
- src/components/ui/Card.tsx
- src/components/ui/Chip.tsx
- src/components/ui/Container.tsx
- src/components/ui/CourseUI.tsx
- src/components/ui/Field.tsx
- src/components/ui/FormAlert.tsx
- src/components/ui/HypeLine.tsx
- src/components/ui/Logo.tsx
- src/components/ui/ProgressRing.tsx
- src/components/ui/Section.tsx
- src/components/ui/Stepper.tsx

## Lib / content / styles
- src/content/booking.ts
- src/content/copy.ts
- src/content/course.ts
- src/lib/auth/preview.ts
- src/lib/auth/queries.ts
- src/lib/auth/schemas.ts
- src/lib/booking/order.ts
- src/lib/booking/schema.ts
- src/lib/course/progress-client.ts
- src/lib/course/progress.ts
- src/lib/course/sequence.ts
- src/lib/email/resend.ts
- src/lib/email/send-booking-emails.ts
- src/lib/email/templates.ts
- src/lib/fonts.ts
- src/lib/metadata.ts
- src/lib/site.ts
- src/lib/stripe/pricing.ts
- src/lib/stripe/server.ts
- src/lib/supabase/client.ts
- src/lib/supabase/middleware.ts
- src/lib/supabase/server.ts
- src/lib/utils.ts
- src/styles/tokens.css

## Supabase migrations
- supabase/README.md
- supabase/migrations/001_course_foundation.sql
- supabase/migrations/002_course_content.sql
- supabase/migrations/003_progress.sql
- supabase/migrations/004_orders.sql

## Counts
- routes: 29
- components: 36
- migrations: 4
