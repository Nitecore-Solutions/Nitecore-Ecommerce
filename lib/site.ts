/**
 * Shared storefront identity + contact details.
 *
 * These were previously hardcoded in a dozen places (Navbar, Footer, home page CTAs).
 * Anything customer-facing that needs to reach the business — the WhatsApp order
 * handoff, support links — should read from here so the number is changed in one place.
 */

export const SITE = {
  name: "NITECORE SOLUTIONS",
  shortName: "Nitecore",
  tagline: "Smart Classrooms, Digital Boards & Digital Services",
  phoneDisplay: "+91 99059 69905",
  /** Digits only, E.164 without the +, for wa.me links. */
  whatsappNumber: "919905969905",
  email: "nitecoresolutions@gmail.com",
  address:
    "Gali no 5, Radha krishna colony Akbarpur (Behrampur), Near By-Tigri Gol Chakkar, Vijay Nagar Ghaziabad (U.P) 201009",
} as const;

/** Builds a wa.me deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
