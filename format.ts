export function formatPrice(amount: number): string {
  return "Rs " + new Intl.NumberFormat("en-PK").format(amount);
}

export function ratingToStars(ratingX10: number): number {
  return Math.round((ratingX10 / 10) * 10) / 10;
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
