export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "JEW",
    maximumFractionDigits: 0,
  });
}
