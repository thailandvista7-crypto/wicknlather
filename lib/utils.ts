import crypto from 'crypto';

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function calculateTax(amount: number, taxRate: number = 0.08): number {
  return Math.round(amount * taxRate * 100) / 100;
}

export function calculateShipping(amount: number): number {
  if (amount >= 50) {
    return 0; // Free shipping over $50
  }
  return 5.99; // Standard shipping
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
