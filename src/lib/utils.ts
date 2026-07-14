export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, symbol: string = "₹"): string {
  return `${symbol}${amount.toLocaleString("en-IN")}`;
}
