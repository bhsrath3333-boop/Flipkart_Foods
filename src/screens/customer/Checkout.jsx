import React, { useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'

const PAYMENT_METHODS = [
  { key: 'upi', label: 'UPI', icon: '📱' },
  { key: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { key: 'coins', label: 'SuperCoins + UPI', icon: '🪙' },
  { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

export default function Checkout() {
  const { cartItems, cartTotal, placeOrder, resetTo, coins } = useApp()
  const [payment, setPayment] = useState('upi')
  const [placing, setPlacing] = useState(false)

  const allTiffinX = cartItems.every(({ item }) => item.certified)
  const deliveryFee = allTiffinX ? 0 : cartTotal > 199 ? 0 : 25
  const platformFee = 4
  const coinsDiscount = payment === 'coins' ? Math.min(coins, 50) : 0
  const total = cartTotal + deliveryFee + platformFee - coinsDiscount

  const handlePlace = () => {
    setPlacing(true)
    setTimeout(() => {
      const order = placeOrder({ isTiffinX: allTiffinX, total })
      resetTo('tracking', { orderId: order.id })
    }, 900)
  }

  return (
    <div>
      <ScreenHeader title="Checkout" tiffinx={allTiffinX} />

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>📍 Deliver to</div>
        <div style={{ fontSize: 12.5, color: '#616161' }}>Home : T3 - 228 Nagercoil, Kanyakumurai, Tamil Nadu</div>
      </div>

      {allTiffinX && (
        <div className="card" style={{ background: '#e5f9ee', border: '1px solid #b8e6c4', boxShadow: 'none' }}>
          <div style={{ fontWeight: 800, color: '#009624', fontSize: 13 }}>⚡ TiffinX Certified Order</div>
          <div style={{ fontSize: 11.5, color: '#1b7a30', marginTop: 4 }}>Guaranteed delivery in under 20 minutes, or it's on us.</div>
        </div>
      )}

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Payment Method</div>
        {PAYMENT_METHODS.map((p) => (
          <div
            key={p.key}
            onClick={() => setPayment(p.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px',
              borderBottom: '1px solid #f2f2f2', cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 18 }}>{p.icon}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{p.label}</span>
            {p.key === 'coins' && <span style={{ fontSize: 10.5, color: '#878787' }}>{coins} available</span>}
            <span style={{
              width: 16, height: 16, borderRadius: '50%',
              border: `2px solid ${payment === p.key ? '#2874F0' : '#ccc'}`,
              background: payment === p.key ? '#2874F0' : 'transparent',
              boxShadow: payment === p.key ? 'inset 0 0 0 3px white' : 'none',
            }} />
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Bill Details</div>
        <div className="parity-note" style={{ marginTop: 0 }}>
          ✅ Restaurant Price = Flipkart Price (no markup)
        </div>
        <div className="bill-row"><span className="muted">Item Total</span><span>₹{cartTotal}</span></div>
        <div className="bill-row">
          <span className="muted">Delivery Fee</span>
          <span className={deliveryFee === 0 ? 'free' : ''}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
        </div>
        <div className="bill-row"><span className="muted">Platform Fee</span><span>₹{platformFee}</span></div>
        {coinsDiscount > 0 && (
          <div className="bill-row"><span className="muted">SuperCoins Applied</span><span className="free">− ₹{coinsDiscount}</span></div>
        )}
        <div className="bill-row total"><span>To Pay</span><span>₹{total}</span></div>
      </div>

      <div style={{ padding: '4px 12px 24px' }}>
        <button className={`btn-primary ${allTiffinX ? 'tiffinx' : ''}`} disabled={placing} onClick={handlePlace}>
          {placing ? 'Placing Order…' : `Place Order — ₹${total}`}
        </button>
      </div>
    </div>
  )
}
