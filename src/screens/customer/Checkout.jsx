import React, { useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'
import { PRE_ORDER_SLOTS } from '../../data/mockData'
import { isAllTiffinX, computeDeliveryFee, computeBBDDiscount, PLATFORM_FEE } from '../../utils/billing'

const PAYMENT_METHODS = [
  { key: 'upi', label: 'UPI', icon: '📱' },
  { key: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { key: 'coins', label: 'SuperCoins + UPI', icon: '🪙' },
  { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

const FULFILLMENT_OPTIONS = [
  { key: 'delivery', label: 'Delivery', icon: '🛵' },
  { key: 'takeaway', label: 'Takeaway', icon: '🥡' },
  { key: 'dineIn', label: 'Dine-In', icon: '🍽️' },
]

export default function Checkout() {
  const { cartItems, cartTotal, placeOrder, resetTo, coins, bbdApplied, orders } = useApp()
  const [payment, setPayment] = useState('upi')
  const [placing, setPlacing] = useState(false)
  const [fulfillment, setFulfillment] = useState('delivery')
  const [timing, setTiming] = useState('now') // 'now' | 'preorder'
  const [slot, setSlot] = useState(PRE_ORDER_SLOTS[1])

  const allTiffinX = isAllTiffinX(cartItems)
  const isFirstOrder = orders.length === 0
  const scheduled = timing === 'preorder'

  const deliveryFee = computeDeliveryFee(fulfillment, allTiffinX, cartTotal)
  const platformFee = PLATFORM_FEE
  const bbdDiscount = computeBBDDiscount(cartItems, bbdApplied, isFirstOrder)
  const coinsDiscount = payment === 'coins' ? Math.min(coins, 50) : 0
  const total = cartTotal + deliveryFee + platformFee - bbdDiscount - coinsDiscount

  const handlePlace = () => {
    setPlacing(true)
    setTimeout(() => {
      const order = placeOrder({
        isTiffinX: allTiffinX,
        total,
        fulfillment,
        scheduled,
        slot: scheduled ? slot : null,
        bbdDiscount,
      })
      resetTo('tracking', { orderId: order.id })
    }, 900)
  }

  return (
    <div>
      <ScreenHeader title="Checkout" tiffinx={allTiffinX} />

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
          {fulfillment === 'delivery' ? '📍 Deliver to' : fulfillment === 'takeaway' ? '🥡 Pickup from' : '🍽️ Table at'}
        </div>
        <div style={{ fontSize: 12.5, color: '#616161' }}>
          {fulfillment === 'delivery'
            ? 'Home : T3 - 228 Nagercoil, Kanyakumurai, Tamil Nadu'
            : 'Campus Food Court, Block C — near the library'}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>How do you want it?</div>
        <div className="foodmode-tabs" style={{ margin: 0, position: 'relative' }}>
          {FULFILLMENT_OPTIONS.map((f) => (
            <button
              key={f.key}
              className={fulfillment === f.key ? 'active' : ''}
              style={fulfillment === f.key ? { background: allTiffinX ? 'var(--tx-green)' : 'var(--fk-blue)', borderRadius: 24 } : undefined}
              onClick={() => setFulfillment(f.key)}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
        {fulfillment !== 'delivery' && (
          <div style={{ fontSize: 10.5, color: '#878787', marginTop: 8 }}>
            ⚡ TiffinX supports Dine-In, Takeaway and Delivery — pick what's fastest for you.
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>When?</div>
        <div className="promo-toggle-row" style={{ padding: 0, marginBottom: timing === 'preorder' ? 12 : 0 }}>
          <button
            className={`btn-secondary ${timing === 'now' ? 'timing-active' : ''}`}
            style={{ width: 'auto', flex: 1, marginRight: 8, padding: '9px 6px', fontSize: 12.5 }}
            onClick={() => setTiming('now')}
          >
            {timing === 'now' ? '● ' : ''}Order Now
          </button>
          <button
            className={`btn-secondary ${timing === 'preorder' ? 'timing-active' : ''}`}
            style={{ width: 'auto', flex: 1, padding: '9px 6px', fontSize: 12.5 }}
            onClick={() => setTiming('preorder')}
          >
            {timing === 'preorder' ? '● ' : ''}Pre-Order
          </button>
        </div>
        {scheduled && (
          <>
            <div style={{ fontSize: 11, color: '#878787', marginBottom: 8 }}>
              Pick a slot — this feeds straight into the restaurant's live demand forecast.
            </div>
            <div className="hscroll" style={{ paddingBottom: 2 }}>
              {PRE_ORDER_SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`slot-chip ${slot === s ? 'active' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {allTiffinX && (
        <div className="card" style={{ background: '#e5f9ee', border: '1px solid #b8e6c4', boxShadow: 'none' }}>
          <div style={{ fontWeight: 800, color: '#009624', fontSize: 13 }}>⚡ TiffinX Certified Order</div>
          <div style={{ fontSize: 11.5, color: '#1b7a30', marginTop: 4 }}>
            {scheduled ? `Scheduled for ${slot} — pre-batched and ready right on time.` : "Guaranteed delivery in under 20 minutes, or it's on us."}
          </div>
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
        {bbdDiscount > 0 && (
          <div className="bill-row"><span className="muted">🛍️ BBD ₹1 Tasting Offer</span><span className="free">− ₹{bbdDiscount}</span></div>
        )}
        {coinsDiscount > 0 && (
          <div className="bill-row"><span className="muted">SuperCoins Applied</span><span className="free">− ₹{coinsDiscount}</span></div>
        )}
        <div className="bill-row total"><span>To Pay</span><span>₹{total}</span></div>
      </div>

      <div style={{ padding: '4px 12px 24px' }}>
        <button className={`btn-primary ${allTiffinX ? 'tiffinx' : ''}`} disabled={placing} onClick={handlePlace}>
          {placing ? 'Placing Order…' : scheduled ? `Schedule for ${slot} — ₹${total}` : `Place Order — ₹${total}`}
        </button>
      </div>
    </div>
  )
}
