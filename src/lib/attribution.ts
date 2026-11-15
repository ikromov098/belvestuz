'use client';

// First-touch attribution for the session: UTM tags, referrer and the page the visit began on.
// Captured once on load (AttributionCapture) and read when a form is submitted, so a visitor
// who lands on /?utm_source=... and fills the form on /apply is still attributed.

const KEY = 'bv_attr';
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export type Attribution = Partial<Record<(typeof UTM)[number] | 'referrer' | 'landing_path', string>>;

function fromLocation(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const out: Attribution = { landing_path: window.location.pathname };
  for (const key of UTM) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 200);
  }
  if (document.referrer) {
    try {
      // Same-site navigation is not a source.
      if (new URL(document.referrer).origin !== window.location.origin) out.referrer = document.referrer.slice(0, 1000);
    } catch {
      /* ignore a malformed referrer */
    }
  }
  return out;
}

function stored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

const hasUtm = (a: Attribution) => UTM.some((key) => a[key]);

export function captureAttribution(): void {
  const current = fromLocation();
  const previous = stored();
  // Keep the first touch, unless it carried no campaign and this page does.
  if (previous && (hasUtm(previous) || !hasUtm(current))) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* storage can be blocked; attribution is best-effort */
  }
}

export function getAttribution(): Attribution {
  return stored() ?? fromLocation();
}
