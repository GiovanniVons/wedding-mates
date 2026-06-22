import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn -- merge Tailwind classes with conflict resolution.
 * Tailwind is used for layout structure only; all visual properties
 * come from token var() per the Token System.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
