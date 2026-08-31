import React from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'

export default function Cart() {
  const { cartItems, cartTotal, addToCart, push, goTab } = useApp()

  if (cartItems.length === 0) {
    return (
      <div>
        <ScreenHeader title="Your Cart" onBack={() => goTab('home')} />
        <div className="empty-state">
          <div className="es-icon">🛒</div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Your cart is empty</div>
          <div style={{ fontSize: 12.5 }}>Add items from Flipkart Foods or TiffinX to get started</div>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => goTab('home')}>Browse Menu</button>
        </div>
      </div>
    )
  }

  const allTiffinX = cartItems.every(({ item }) => item.certified)
  const deliveryFee = allTiffinX ? 0 : cartTotal > 199 ? 0 : 25
  const platformFee = 4
  const total = cartTotal + deliveryFee + platformFee

  return (
    <div>
      <ScreenHeader title="Your Cart" sub={`${cartItems.length} item(s)`} onBack={() => goTab('home')} tiffinx={allTiffinX} />

      <div style={{ paddingTop: 12 }}>
        {cartItems.map(({ item, qty }) => (
          <div className="cart-item-row" key={item.id}>
            <span className="ci-img">{item.img}</span>
            <div style={{ flex: 1 }}>
              <div className="ci-name">{item.name}</div>
              <div style={{ fontSize: 10.5, color: '#878787' }}>{item.restaurant}</div>
            </div>
            <span className={`ic-qty ${item.certified ? 'tiffinx' : ''}`}>
              <button onClick={() => addToCart(item.id, -1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => addToCart(item.id, 1)}>+</button>
            </span>
            <span className="ci-price">₹{item.price * qty}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="parity-note" style={{ marginTop: 0 }}>
          ✅ Restaurant Price = Flipkart Price — you never pay extra
        </div>
        <div className="bill-row"><span className="muted">Item Total</span><span>₹{cartTotal}</span></div>
        <div className="bill-row">
          <span className="muted">Delivery Fee</span>
          <span className={deliveryFee === 0 ? 'free' : ''}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
        </div>
        <div className="bill-row"><span className="muted">Platform Fee</span><span>₹{platformFee}</span></div>
        <div className="bill-row total"><span>To Pay</span><span>₹{total}</span></div>
      </div>

      <div style={{ padding: '4px 12px 20px' }}>
        <button className={`btn-primary ${allTiffinX ? 'tiffinx' : ''}`} onClick={() => push('checkout')}>
          Proceed to Checkout →
        </button>
      </div>
    </div>
  )
}
