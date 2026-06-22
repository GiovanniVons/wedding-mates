"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/site";

export interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  /** Transparent over a photographic hero (Home), solid otherwise. */
  transparent?: boolean;
  nav?: NavLink[];
  currentPath?: string;
}

/**
 * Header -- smart marketing header, copy-adapted from patterns/smart-header.
 * Transparent-on-load over the hero (Home only), always-solid on light pages,
 * shrinks + blurs + adds a hairline on scroll past 80px. Mobile drawer is a
 * loud grape field, focus-trapped, closes on Escape / route change.
 */
export function Header({
  transparent = false,
  nav = NAV_LINKS,
  currentPath,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScrollY.current) < 5) return;
      lastScrollY.current = y;
      setScrolled(y > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + focus trap while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  // Header is "solid" when scrolled, when never transparent, or when the
  // drawer is open. Transparent mode resolves text to page-white over the hero.
  const isSolid = scrolled || !transparent;
  const headerTheme = transparent && !isSolid ? "grape" : undefined;

  return (
    <header
      data-theme={headerTheme}
      className="fixed inset-x-0 top-0 z-[100]"
      style={{
        height: scrolled
          ? "var(--header-height-scrolled)"
          : "var(--header-height)",
        backgroundColor: isSolid ? "var(--header-bg-scrolled)" : "transparent",
        backdropFilter: scrolled ? "blur(var(--header-blur))" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(var(--header-blur))" : undefined,
        borderBottom: scrolled
          ? "var(--border-width-main) solid var(--header-border-scrolled)"
          : "var(--border-width-main) solid transparent",
        transition:
          "height var(--motion-duration-base) ease, background-color var(--motion-duration-base) ease, border-color var(--motion-duration-base) ease",
      }}
    >
      <div
        className="mx-auto flex h-full w-full items-center justify-between"
        style={{
          maxWidth: "var(--nav-max-width)",
          paddingInline: "var(--nav-padding-x)",
        }}
      >
        <a href="/" aria-label="Wedding Mates home" className="link-plain inline-flex">
          <Logo
            color={isSolid ? "var(--color-grape)" : "var(--color-page)"}
            counterFill="transparent"
            width={140}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[var(--space-5)] lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link link-plain"
              style={{
                color: isSolid ? "var(--color-grape)" : "var(--color-page)",
              }}
              aria-current={currentPath === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/login"
            className="nav-link link-plain"
            style={{
              color: isSolid ? "var(--color-grape-soft)" : "var(--color-page)",
              fontSize: "var(--font-size-text-small)",
            }}
          >
            Login
          </a>
          <Button as="a" href="/book" variant="primary" size="small">
            Book Now
          </Button>
        </nav>

        {/* Mobile trigger */}
        <button
          ref={triggerRef}
          className="flex flex-col items-center justify-center gap-[6px] lg:hidden"
          style={{ width: "44px", height: "44px" }}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "var(--nav-hamburger-thickness)",
                backgroundColor: isSolid
                  ? "var(--color-grape)"
                  : "var(--color-page)",
                borderRadius: "2px",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer (loud grape field) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close menu"
              className="fixed inset-0 z-[110] lg:hidden"
              style={{ backgroundColor: "var(--color-grape-fill-o50)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={drawerRef}
              data-theme="grape"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed right-0 top-0 z-[120] flex h-full w-[min(86vw,340px)] flex-col lg:hidden"
              style={{
                backgroundColor: "var(--nav-drawer-bg)",
                padding: "var(--space-5)",
              }}
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-[var(--space-6)] flex items-center justify-between">
                <Logo
                  color="var(--color-page)"
                  counterFill="transparent"
                  width={130}
                />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  style={{ width: "44px", height: "44px", color: "var(--color-page)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 5l14 14M19 5L5 19"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-[var(--space-4)]">
                {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn("drawer-link")}
                    style={{ fontSize: "var(--font-size-h2)" }}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-[var(--space-3)]">
                <Button as="a" href="/book" variant="primary" size="large" fullWidth>
                  Book Now
                </Button>
                <a
                  href="/login"
                  className="drawer-link"
                  style={{ fontSize: "var(--font-size-text-large)", fontFamily: "var(--font-body)", textTransform: "none" }}
                  onClick={() => setOpen(false)}
                >
                  Login
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
