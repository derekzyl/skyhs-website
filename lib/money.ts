/** Nigerian Naira formatting for ops surfaces. */
export function formatNgn(amount: number | null | undefined): string {
  const n = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `₦${n.toLocaleString('en-NG', { maximumFractionDigits: 2 })}`;
  }
}
