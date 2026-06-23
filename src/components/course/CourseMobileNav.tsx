"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CourseSidebar, type ModuleTreeItem } from "@/components/ui/CourseUI";
import { Logo } from "@/components/ui/Logo";
import { MODULES, COURSE_TOTAL_LESSONS } from "@/content/course";
import { useProgress } from "@/lib/course/progress-client";
import { moduleState } from "@/lib/course/sequence";

/**
 * CourseMobileNav -- the mobile course chrome: a sticky top bar with a logo and
 * a menu button that opens a focus-trapped drawer holding the same module tree,
 * resources and support as the desktop rail. Hidden at lg (the persistent rail
 * takes over). Closes on Escape, on route change, and on backdrop click. Locks
 * body scroll while open. Mirrors the marketing Header drawer's a11y contract.
 *
 * The drawer's module states are live (useProgress), so they match the rail and
 * update after a complete-and-continue.
 */
export function CourseMobileNav({
  initialCompleted,
}: {
  initialCompleted: string[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { completed, count } = useProgress(initialCompleted);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + focus trap while the drawer is open.
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

  const modules: ModuleTreeItem[] = MODULES.map((m) => ({
    label: m.title,
    status: moduleState(m.slug, completed),
    href: `/course/${m.slug}`,
  }));

  return (
    <div className="lg:hidden">
      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-[90] flex items-center justify-between"
        data-surface="calm"
        style={{
          backgroundColor: "var(--course-topbar-bg)",
          backdropFilter: "blur(var(--header-blur))",
          WebkitBackdropFilter: "blur(var(--header-blur))",
          borderBottom:
            "var(--border-width-main) solid var(--course-sidebar-border)",
          paddingInline: "var(--site-margin)",
          paddingBlock: "var(--space-3)",
        }}
      >
        <a href="/course" aria-label="Course dashboard" className="link-plain inline-flex">
          <Logo color="var(--color-grape)" width={130} />
        </a>
        <div className="flex items-center gap-[var(--space-3)]">
          <span className="meta-caps" style={{ color: "var(--color-grape-soft)" }}>
            {count} of {COURSE_TOTAL_LESSONS}
          </span>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="course-drawer"
            aria-label="Open course menu"
            className="inline-flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-small)",
              border: "var(--border-width-main) solid var(--color-grape-o20)",
              backgroundColor: "transparent",
              color: "var(--color-grape)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer + backdrop */}
      {open && (
        <div className="fixed inset-0 z-[95]">
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0"
            style={{ backgroundColor: "var(--overlay-bg-light)" }}
          />
          <div
            ref={drawerRef}
            id="course-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Course menu"
            className="absolute inset-y-0 left-0 flex w-[85%] max-w-[20rem] flex-col overflow-y-auto"
          >
            <div
              className="flex items-center justify-end"
              style={{
                backgroundColor: "var(--course-sidebar-bg)",
                paddingInline: "var(--space-4)",
                paddingTop: "var(--space-4)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close course menu"
                className="inline-flex items-center justify-center"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-small)",
                  backgroundColor: "transparent",
                  color: "var(--color-grape)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <CourseSidebar
              completed={count}
              total={COURSE_TOTAL_LESSONS}
              modules={modules}
              className="flex-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
