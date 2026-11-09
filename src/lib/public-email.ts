const publicEmailDomains = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'ymail.com',
  'rocketmail.com',
  'yahoo.co.uk',
  'yahoo.ca',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'hotmail.co.uk',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'gmx.net',
  'mail.com',
]);

export function isPublicEmail(email: string) {
  const domain = email.split('@')[1]?.trim().toLowerCase() ?? '';
  return publicEmailDomains.has(domain);
}
