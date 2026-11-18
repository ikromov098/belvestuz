'use client';

// Browser helper shared by the callback widget and /apply. It must never stop the existing
// Telegram message from going out: everything new here (id generation, attribution, timeout)
// is defensive, and the fetch itself is the last thing that can fail.
import { getAttribution } from '@/lib/attribution';

function newSubmissionId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  // Older browsers (e.g. iOS 15 Safari). The server only needs a stable unique string.
  return `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export type LeadFields = {
  phone: string; // as typed; the server reads 9 digits or 998 + 9 digits as an Uzbek number
  full_name: string;
  interest: string;
  message?: string;
  locale: string;
};

export async function postLead(text: string, lead?: LeadFields, timeoutMs = 10000): Promise<boolean> {
  let body: string;
  try {
    // Without a lead (e.g. the English investor form, which has no phone) only the Telegram message goes out.
    body = JSON.stringify(
      lead
        ? {
            text,
            lead: { ...lead, submission_id: newSubmissionId(), occurred_at: new Date().toISOString(), ...getAttribution() },
          }
        : { text },
    );
  } catch {
    body = JSON.stringify({ text });
  }
  let controller: AbortController | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    controller = new AbortController();
    timer = setTimeout(() => controller?.abort(), timeoutMs);
  } catch {
    controller = undefined;
  }
  try {
    const res = await fetch('/api/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      signal: controller?.signal,
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return data?.ok === true;
  } catch {
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
