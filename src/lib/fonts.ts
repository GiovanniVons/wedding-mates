import localFont from "next/font/local";

/**
 * Anton -- the heavy condensed grotesque that carries every Hype Line,
 * the hero, and the pricing numeral. Single weight by design (400 = ultra-heavy).
 * Maps to --font-anton, consumed by --font-display in tokens.css Zone 1a.
 */
export const anton = localFont({
  src: "../fonts/anton.woff2",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
  fallback: ["Oswald", "Arial Narrow", "system-ui", "sans-serif"],
});

/**
 * Archivo Black -- the heavier-body alternate (fixed 900) for calm H1/H2
 * where Anton's condensation is too tight. Maps to --font-archivo-black,
 * consumed by --font-heavy.
 */
export const archivoBlack = localFont({
  src: "../fonts/archivo-black.woff2",
  variable: "--font-archivo-black",
  weight: "400",
  display: "swap",
  fallback: ["Archivo", "system-ui", "sans-serif"],
});

/**
 * Archivo (variable 400..800) -- the workhorse for body, UI, the booking
 * wizard, the course reading, nav, the cue chip, meta labels.
 * Maps to --font-archivo, consumed by --font-body.
 */
export const archivo = localFont({
  src: "../fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "400 800",
  display: "swap",
  fallback: ["Inter", "Helvetica Neue", "system-ui", "sans-serif"],
});

export const fontVariables = `${anton.variable} ${archivoBlack.variable} ${archivo.variable}`;
