// Shared by the investor form (client) and /api/investor-enquiry (server), so the allowed values
// and length limits are defined once.
export const INSTITUTION_TYPES = [
  'DFI',
  'Islamic bank or window',
  'Credit fund',
  'Family office',
  'Other',
] as const;

export const TICKET_RANGES = ['Under $250k', '$250k–1M', '$1–5M', 'Over $5M'] as const;

export type InvestorEnquiry = {
  name: string;
  institution: string;
  institutionType: (typeof INSTITUTION_TYPES)[number];
  ticket: (typeof TICKET_RANGES)[number];
  email: string;
  message: string;
};

const clip = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';

// Returns the cleaned enquiry, or null when a required field is missing or not an allowed value.
export function parseEnquiry(input: unknown): InvestorEnquiry | null {
  if (!input || typeof input !== 'object') return null;
  const raw = input as Record<string, unknown>;
  const enquiry = {
    name: clip(raw.name, 120),
    institution: clip(raw.institution, 160),
    institutionType: clip(raw.institutionType, 40),
    ticket: clip(raw.ticket, 40),
    email: clip(raw.email, 200),
    message: clip(raw.message, 2000),
  };
  if (enquiry.name.length < 2 || enquiry.institution.length < 2) return null;
  if (!(INSTITUTION_TYPES as readonly string[]).includes(enquiry.institutionType)) return null;
  if (!(TICKET_RANGES as readonly string[]).includes(enquiry.ticket)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return null;
  return enquiry as InvestorEnquiry;
}
