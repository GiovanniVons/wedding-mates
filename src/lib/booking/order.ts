/**
 * order.ts -- small booking-domain helpers shared by the checkout route, the
 * webhook, and the confirmation page.
 */

/**
 * A short, human-friendly order reference shown on the confirmation screen and
 * in the receipt email. NOT the order UUID (that stays internal). Format:
 * WM-XXXXXX (uppercase, unambiguous alphabet). Deterministic from the order id
 * so the confirmation page and the email always agree without extra storage.
 */
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1

export function orderRefFromId(orderId: string): string {
  let hash = 0;
  for (let i = 0; i < orderId.length; i += 1) {
    hash = (hash * 31 + orderId.charCodeAt(i)) >>> 0;
  }
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += REF_ALPHABET[hash % REF_ALPHABET.length];
    hash =
      Math.floor(hash / REF_ALPHABET.length) +
      orderId.charCodeAt(i % orderId.length);
  }
  return `WM-${out}`;
}
