"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { FieldLabel, FieldHelper, FieldError } from "./Field";

/**
 * DateField -- the wedding-date input. On touch devices (coarse pointer) it
 * renders the NATIVE <input type="date"> (the iOS wheel is genuinely the best
 * mobile UX, so we keep it). On desktop (fine pointer) it swaps to a branded
 * calendar popover, because the native desktop date control is ugly and off
 * brand. SSR-safe: renders native first (works everywhere), enhances to the
 * custom calendar after mount when a fine pointer is detected.
 *
 * Calm register: grape on page, coral selected day, mint "today" ring.
 * Keyboard: arrow keys move the focused day (roving tabindex), Enter/Space
 * selects, Escape closes.
 */

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function parseIso(iso?: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function formatLong(d: Date): string {
  return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  /** ISO min date (inclusive). */
  min?: string;
  helper?: string;
  error?: string;
  id?: string;
}

export function DateField({ label, value, onChange, min, helper, error, id }: DateFieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;

  const [mounted, setMounted] = useState(false);
  const [coarse, setCoarse] = useState(true);
  useEffect(() => {
    setMounted(true);
    try {
      setCoarse(window.matchMedia("(pointer: coarse)").matches);
    } catch {
      setCoarse(true);
    }
  }, []);
  const useNative = !mounted || coarse;

  const describedBy = error ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined;

  const chrome = (control: React.ReactNode) => (
    <div className="w-full">
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      {control}
      {error ? (
        <span id={`${fieldId}-error`}>
          <FieldError>{error}</FieldError>
        </span>
      ) : helper ? (
        <span id={`${fieldId}-helper`}>
          <FieldHelper>{helper}</FieldHelper>
        </span>
      ) : null}
    </div>
  );

  if (useNative) {
    return chrome(
      <input
        id={fieldId}
        type="date"
        className="field-input"
        value={value}
        min={min}
        data-error={error ? "true" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      />,
    );
  }

  return chrome(
    <DesktopCalendar
      fieldId={fieldId}
      value={value}
      onChange={onChange}
      min={min}
      error={!!error}
      describedBy={describedBy}
    />,
  );
}

function DesktopCalendar({
  fieldId,
  value,
  onChange,
  min,
  error,
  describedBy,
}: {
  fieldId: string;
  value: string;
  onChange: (iso: string) => void;
  min?: string;
  error: boolean;
  describedBy?: string;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const minDate = useMemo(() => (parseIso(min) ? startOfDay(parseIso(min)!) : today), [min, today]);
  const selected = useMemo(() => parseIso(value), [value]);

  const [open, setOpen] = useState(false);
  const initView = selected ?? minDate;
  const [view, setView] = useState({ y: initView.getFullYear(), m: initView.getMonth() });
  const [focusDay, setFocusDay] = useState<number>(selected ? selected.getDate() : 1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Reset the view + focus to the selected (or min) month whenever we open.
  const openCalendar = useCallback(() => {
    const base = selected ?? minDate;
    setView({ y: base.getFullYear(), m: base.getMonth() });
    setFocusDay(base.getDate());
    setOpen(true);
  }, [selected, minDate]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Move focus to the active day button when it changes.
  useEffect(() => {
    if (!open) return;
    const el = gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`);
    el?.focus();
  }, [open, focusDay, view]);

  const firstWeekday = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthDate = (d: number) => new Date(view.y, view.m, d);
  const isDisabled = (d: number) => monthDate(d) < minDate;
  const prevDisabled = new Date(view.y, view.m, 1) <= new Date(minDate.getFullYear(), minDate.getMonth(), 1);

  const step = (delta: number) => {
    const target = new Date(view.y, view.m, focusDay + delta);
    if (target < minDate) return;
    if (target.getMonth() !== view.m || target.getFullYear() !== view.y) {
      setView({ y: target.getFullYear(), m: target.getMonth() });
    }
    setFocusDay(target.getDate());
  };

  const pick = (d: number) => {
    if (isDisabled(d)) return;
    onChange(toIso(monthDate(d)));
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); step(-7); }
    else if (e.key === "ArrowDown") { e.preventDefault(); step(7); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(focusDay); }
    else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
  };

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        id={fieldId}
        className="field-input"
        data-error={error ? "true" : undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openCalendar())}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          textAlign: "left",
          cursor: "pointer",
          color: selected ? "var(--input-text)" : "var(--input-placeholder)",
        }}
      >
        <span>{selected ? formatLong(selected) : "Select your wedding date"}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-grape)" }}>
          <rect x="3" y="4.5" width="14" height="12.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 8h14M7 2.8v3.4M13 2.8v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose your wedding date"
          className="card"
          style={{
            position: "absolute",
            top: "calc(100% + var(--space-2))",
            left: 0,
            zIndex: 50,
            width: "min(20rem, calc(100vw - 2 * var(--site-margin)))",
            padding: "var(--space-4)",
            backgroundColor: "var(--card-bg)",
            border: "var(--border-width-main) solid var(--color-grape-o20)",
            borderRadius: "var(--card-radius)",
            boxShadow: "0 18px 50px -18px var(--color-grape-o40)",
          }}
        >
          <div className="mb-[var(--space-3)] flex items-center justify-between">
            <button
              type="button"
              onClick={() => !prevDisabled && setView(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }))}
              aria-label="Previous month"
              disabled={prevDisabled}
              className="cal-nav"
            >
              <Chevron dir="left" />
            </button>
            <span
              aria-live="polite"
              style={{ fontFamily: "var(--font-body)", fontWeight: "var(--font-weight-heavy)", color: "var(--color-grape)" }}
            >
              {MONTHS[view.m]} {view.y}
            </span>
            <button
              type="button"
              onClick={() => setView(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }))}
              aria-label="Next month"
              className="cal-nav"
            >
              <Chevron dir="right" />
            </button>
          </div>

          <div className="grid grid-cols-7" style={{ gap: "var(--space-1)" }}>
            {WEEKDAYS.map((w) => (
              <span
                key={w}
                aria-hidden="true"
                className="text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-chip)",
                  fontWeight: "var(--font-weight-bold)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--letter-spacing-wide)",
                  color: "var(--color-grape-soft)",
                  paddingBlock: "var(--space-1)",
                }}
              >
                {w}
              </span>
            ))}
          </div>

          <div ref={gridRef} role="grid" className="grid grid-cols-7" style={{ gap: "var(--space-1)" }} onKeyDown={onKeyDown}>
            {cells.map((d, i) => {
              if (d === null) return <span key={`b${i}`} aria-hidden="true" />;
              const date = monthDate(d);
              const disabled = isDisabled(d);
              const isSel = selected ? sameDay(date, selected) : false;
              const isToday = sameDay(date, today);
              return (
                <button
                  key={d}
                  type="button"
                  data-day={d}
                  role="gridcell"
                  aria-label={formatLong(date)}
                  aria-selected={isSel}
                  disabled={disabled}
                  tabIndex={d === focusDay ? 0 : -1}
                  onClick={() => pick(d)}
                  className="cal-day"
                  data-selected={isSel ? "true" : undefined}
                  data-today={isToday && !isSel ? "true" : undefined}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={dir === "left" ? "M10 3l-5 5 5 5" : "M6 3l5 5-5 5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
