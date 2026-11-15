// Masks phone numbers and emails in visitor text before it is sent to the model provider.
// Shaped for Uzbek numbers and international "+" numbers; it must not touch prices such as
// "150 000 000" or "250000000".
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const SEP = '[\\s().-]?';
const PHONES = [
  // +998 90 123 45 67, 998901234567, 8 (90) 123-45-67 variants
  new RegExp(`(?:\\+?998|\\b8)${SEP}\\(?\\d{2}\\)?${SEP}\\d{3}${SEP}\\d{2}${SEP}\\d{2}\\b`, 'g'),
  // any other number with a plus sign: +7 912 345 67 89
  /\+\d[\d\s().-]{8,}\d/g,
  // local format 90 123 45 67 (2-3-2-2 groups)
  /\b\d{2}[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2}\b/g,
  // nine digits typed together, starting with an Uzbek mobile prefix
  /\b(?:33|50|55|77|88|9\d)\d{7}\b/g,
];

export function maskPersonalData(text: string): string {
  let out = text.replace(EMAIL, '[EMAIL]');
  for (const re of PHONES) out = out.replace(re, '[PHONE]');
  return out;
}
