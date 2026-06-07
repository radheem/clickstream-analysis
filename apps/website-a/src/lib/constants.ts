export const STORE_LINKS = {
  appStore: { href: '#', label: 'Download on the App Store' },
  googlePlay: { href: '#', label: 'Get it on Google Play' },
} as const;

export const CONTACT_EMAIL = 'hello@kinto.app';

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
] as const;
