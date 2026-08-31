// Shared bill-calculation helpers used by both Cart and Checkout so the two
// screens never drift out of sync on pricing rules.

export function isAllTiffinX(cartItems) {
  return cartItems.length > 0 && cartItems.every(({ item }) => item.certified)
}

export function computeDeliveryFee(fulfillment, allTiffinX, cartTotal) {
  if (fulfillment !== 'delivery') return 0
  return allTiffinX ? 0 : cartTotal > 199 ? 0 : 25
}

export const PLATFORM_FEE = 4

// BBD ₹1 tasting offer: only on a customer's first-ever order, only if the
// cart contains at least one TiffinX item, and only discounts one unit of
// the cheapest certified item down to ₹1.
export function computeBBDDiscount(cartItems, bbdApplied, isFirstOrder) {
  if (!bbdApplied || !isFirstOrder) return 0
  const tiffinItems = cartItems.filter(({ item }) => item.certified)
  if (tiffinItems.length === 0) return 0
  const cheapest = tiffinItems.reduce((min, ci) => (ci.item.price < min.item.price ? ci : min), tiffinItems[0])
  return Math.max(0, cheapest.item.price - 1)
}
