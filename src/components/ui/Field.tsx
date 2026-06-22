import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * useFieldId -- a stable, SSR/hydration-safe id for a field. Always calls
 * useId() (hooks run unconditionally) and falls back to the caller-provided id
 * when one is supplied. Replaces the old module-level counter, which could
 * mismatch between server and client render order.
 */
function useFieldId(provided?: string) {
  const generated = useId();
  return provided ?? generated;
}

interface FieldLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}

export function FieldLabel({ htmlFor, children, optional }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[var(--space-2)] flex items-center gap-[var(--space-2)]"
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: "var(--font-weight-bold)",
        fontSize: "var(--font-size-text-small)",
        color: "var(--color-grape)",
      }}
    >
      {children}
      {optional && (
        <span
          style={{
            color: "var(--step-optional-label)",
            fontWeight: "var(--font-weight-semibold)",
            textTransform: "uppercase",
            letterSpacing: "var(--letter-spacing-wide)",
          }}
        >
          Optional
        </span>
      )}
    </label>
  );
}

export function FieldHelper({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-[var(--space-2)]"
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-text-small)",
        color: "var(--color-grape-soft)",
        lineHeight: "var(--line-height-relaxed)",
      }}
    >
      {children}
    </p>
  );
}

export function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="mt-[var(--space-2)] flex items-center gap-[var(--space-1)]"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-text-small)",
        fontWeight: "var(--font-weight-semibold)",
        color: "var(--color-coral-deep)",
        lineHeight: "var(--line-height-relaxed)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.9" fill="currentColor" />
      </svg>
      {children}
    </p>
  );
}

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  id?: string;
  optional?: boolean;
  helper?: string;
  error?: string;
}

export function TextField({
  label,
  id,
  optional,
  helper,
  error,
  className,
  ...props
}: TextFieldProps) {
  const fieldId = useFieldId(id);
  return (
    <div className={cn("w-full", className)}>
      <FieldLabel htmlFor={fieldId} optional={optional}>
        {label}
      </FieldLabel>
      <input
        id={fieldId}
        className="field-input"
        data-error={error ? "true" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined}
        {...props}
      />
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
}

interface TextareaFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label: string;
  id?: string;
  optional?: boolean;
  helper?: string;
  error?: string;
}

export function TextareaField({
  label,
  id,
  optional,
  helper,
  error,
  className,
  ...props
}: TextareaFieldProps) {
  const fieldId = useFieldId(id);
  return (
    <div className={cn("w-full", className)}>
      <FieldLabel htmlFor={fieldId} optional={optional}>
        {label}
      </FieldLabel>
      <textarea
        id={fieldId}
        className="field-textarea"
        data-error={error ? "true" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined}
        {...props}
      />
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
}

interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  label: string;
  id?: string;
  optional?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}

export function SelectField({
  label,
  id,
  optional,
  helper,
  error,
  className,
  children,
  ...props
}: SelectFieldProps) {
  const fieldId = useFieldId(id);
  return (
    <div className={cn("w-full", className)}>
      <FieldLabel htmlFor={fieldId} optional={optional}>
        {label}
      </FieldLabel>
      <select
        id={fieldId}
        className="field-select"
        data-error={error ? "true" : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <FieldError>{error}</FieldError>
      ) : helper ? (
        <FieldHelper>{helper}</FieldHelper>
      ) : null}
    </div>
  );
}

interface ChoiceProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  type: "radio" | "checkbox";
}

/**
 * Choice -- radio / checkbox, 24px, grape border, checked fill = mint with a
 * grape tick. The native control is the peer; the styled box and the tick
 * react to peer-checked / peer-focus-visible. Checked state and tick colour
 * live in globals.css @layer components (.choice-box) since peer-checked needs
 * CSS not inline style.
 */
export function Choice({ label, type, id, className, ...props }: ChoiceProps) {
  const fieldId = useFieldId(id);
  return (
    <label
      htmlFor={fieldId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-[var(--space-3)]",
        className,
      )}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: "var(--font-size-text-main)",
        color: "var(--color-grape)",
        lineHeight: "var(--line-height-medium)",
      }}
    >
      <input id={fieldId} type={type} className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="choice-box"
        data-shape={type}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" className="choice-tick">
          <path
            d="M2 7.5l3 3 7-7.5"
            fill="none"
            stroke="var(--toggle-check-mark)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
}
