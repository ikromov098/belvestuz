// Facts for the English investor page that are not known from the repo. Each optional line stays
// out of the page while it is `null`, so the page never shows a placeholder or an unconfirmed claim.
// Fill these in only when the named person has confirmed the exact wording.

// Where investor enquiries are sent and which address the page shows. Set NEXT_PUBLIC_IR_EMAIL in
// Vercel to the dedicated investor-relations mailbox; until then the existing public address is used.
export const IR_EMAIL = process.env.NEXT_PUBLIC_IR_EMAIL || 'info@belvest.uz';

// Add once the accountant has confirmed it. Proposed wording from the brief:
// 'Customer contracts are priced in USD and paid in UZS at the Central Bank rate on the payment date.'
export const FX_LINE: string | null = null;

// Audit firm name, or 'FY2026 audit in progress' if that is true when published.
export const AUDITOR: string | null = null;

// Counsel's wording on ZRU-1126 and the microfinance rules. Never write "licensed" unless a licence
// number exists.
export const LICENCE_STATUS: string | null = null;

// Show an "Assets under management" tile only after the accountant has reconciled the full figure.
export const AUM: string | null = null;

export const FIGURES_AS_OF = '15 Nov 2026';
export const FIGURES_SOURCE = 'Management data from 1C, unaudited, 20 June 2025 to 15 November 2026.';
