export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
] as const;

export type UsStateCode = (typeof US_STATES)[number]['code'];

export type UsAddress = {
  street: string;
  city: string;
  state: UsStateCode;
  zip: string;
};

const US_STATE_CODES = new Set<string>(US_STATES.map((state) => state.code));
const US_ZIP_PATTERN = /^\d{5}(?:-\d{4})?$/;

export function isUsStateCode(value: string): value is UsStateCode {
  return US_STATE_CODES.has(value);
}

export function isUsZip(value: string) {
  return US_ZIP_PATTERN.test(value);
}

export function addressHasAnyField(address: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}) {
  return Boolean(address.street?.trim() || address.city?.trim() || address.state?.trim() || address.zip?.trim());
}

function hasCountry(record: Record<string, unknown>) {
  return 'country' in record && record.country != null && String(record.country).trim() !== '';
}

export function parseOptionalUsAddress(
  value: unknown,
): { ok: true; address: UsAddress | null } | { ok: false; message: string } {
  if (value == null) return { ok: true, address: null };
  if (typeof value !== 'object') {
    return { ok: false, message: 'Enter a complete US address, or leave the address blank.' };
  }

  const record = value as Record<string, unknown>;
  if (hasCountry(record)) {
    return { ok: false, message: 'Quotes are limited to United States addresses.' };
  }

  const street = typeof record.street === 'string' ? record.street.trim().slice(0, 200) : '';
  const city = typeof record.city === 'string' ? record.city.trim().slice(0, 100) : '';
  const state = typeof record.state === 'string' ? record.state.trim().toUpperCase() : '';
  const zip = typeof record.zip === 'string' ? record.zip.trim() : '';

  if (!street && !city && !state && !zip) return { ok: true, address: null };
  if (!street || !city || !isUsStateCode(state) || !isUsZip(zip)) {
    return { ok: false, message: 'Enter a complete US address, or leave the address blank.' };
  }

  return { ok: true, address: { street, city, state, zip } };
}
