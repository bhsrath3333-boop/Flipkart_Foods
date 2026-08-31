import React, { useEffect, useRef, useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'
import FakeQR from '../../components/FakeQR'

const RADIUS = 92
const CIRC = 2 * Math.PI * RADIUS

const STEPS = [
  { key: 'placed', label: 'Placed', icon: '✓' },
  { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { key: 'out', label: 'Out for Delivery', icon: '🛵' },
  { key: 'delivered', label: 'Delivered', icon: '🎉' },
]

function fmt(s) {
  const rounded = Math.ceil(s)
  const m = Math.floor(rounded / 60)
  const sec = rounded % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// Demo mode: the on-screen clock counts down the real 20-min / 40-min promise,
// but ticks on an accelerated clock so the ring finishes within a live demo.
const DEMO_WALLCLOCK_SECONDS = { tiffinx: 45, regular: 90 }
const PICKUP_WALLCLOCK_SECONDS = 25
const PICKUP_ETA_MINUTES = 12

function OrderSummary({ order }) {
  return (
    <div className="card order-summary-card">
      <div className="osc-id">Order {order.id}</div>
      {order.items.map((it, idx) => (
        <div className="bill-row" key={idx}>
          <span className="muted">{it.qty} × {it.name}</span>
          <span>₹{it.price * it.qty}</span>
        </div>
      ))}
      {order.bbdDiscount > 0 && (
        <div className="bill-row"><span className="muted">🛍️ BBD ₹1 Tasting Offer</span><span className="free">− ₹{order.bbdDiscount}</span></div>
      )}
      <div className="bill-row total"><span>Total Paid</span><span>₹{order.total}</span></div>
    </div>
  )
}

function ScheduledConfirmation({ order, onDone }) {
  const fulfillmentCopy = {
    delivery: 'We\'ll start live delivery tracking automatically close to your slot.',
    takeaway: 'Just walk up at your slot — skip the line, your order will be ready.',
    dineIn: 'Your table will be held and ready for you at this slot.',
  }
  return (
    <div className="tracking-wrap">
      <div className="confirm-icon-circle" style={{ background: '#e8f0fe' }}>🗓️</div>
      <div style={{ fontWeight: 800, fontSize: 18, textAlign: 'center' }}>Order Scheduled!</div>
      <div style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', color: 'var(--fk-blue)', marginTop: 6 }}>{order.slot}</div>
      <div style={{ fontSize: 12, color: '#878787', textAlign: 'center', marginTop: 4 }}>
        {fulfillmentCopy[order.fulfillment]}
      </div>
      <div className="predicted-banner" style={{ background: '#1f2430' }}>
        🔗 <span>This pre-order was just added to the restaurant's live demand forecast for {order.slot} — they're already planning for it.</span>
      </div>
      <OrderSummary order={order} />
      <div style={{ padding: '4px 4px 20px' }}>
        <button className="btn-primary tiffinx" onClick={onDone}>Back to Home</button>
      </div>
    </div>
  )
}

function DineInConfirmation({ order, onDone }) {
  return (
    <div className="tracking-wrap">
      <div className="confirm-icon-circle" style={{ background: '#fff3e0' }}>🍽️</div>
      <div style={{ fontWeight: 800, fontSize: 18, textAlign: 'center' }}>Table Confirmed!</div>
      <div style={{ fontSize: 28, fontWeight: 900, textAlign: 'center', color: 'var(--rp-accent-dark)', marginTop: 4 }}>
        Table {order.tableNumber}
      </div>
      <div style={{ fontSize: 12, color: '#878787', textAlign: 'center', marginTop: 4, marginBottom: 16 }}>
        Show this QR at the counter to check in — your order is already on its way to the kitchen.
      </div>
      <FakeQR seed={order.id} />
      <OrderSummary order={order} />
      <div style={{ padding: '4px 4px 20px' }}>
        <button className="btn-primary" onClick={onDone}>Back to Home</button>
      </div>
    </div>
  )
}

function TakeawayConfirmation({ order, onDone }) {
  const [remaining, setRemaining] = useState(PICKUP_ETA_MINUTES * 60)
  const doneRef = useRef(false)
  const total = PICKUP_ETA_MINUTES * 60

  useEffect(() => {
    const stepMs = 200
    const decrementPerTick = total / ((PICKUP_WALLCLOCK_SECONDS * 1000) / stepMs)
    const iv = setInterval(() => {
      setRemaining((r) => {
        const next = r - decrementPerTick
        if (next <= 0) {
          clearInterval(iv)
          return 0
        }
        return next
      })
    }, stepMs)
    return () => clearInterval(iv)
  }, [])

  const ready = remaining === 0
  const pct = Math.round((1 - remaining / total) * 100)

  return (
    <div className="tracking-wrap">
      <div className="confirm-icon-circle" style={{ background: '#e5f9ee' }}>{ready ? '✅' : '🥡'}</div>
      <div style={{ fontWeight: 800, fontSize: 18, textAlign: 'center' }}>
        {ready ? 'Ready for Pickup!' : 'Skip the line, just walk up'}
      </div>
      <div style={{ fontSize: 12, color: '#878787', textAlign: 'center', marginTop: 4 }}>
        Pickup code <b>{order.pickupCode}</b> · Campus Food Court, Block C
      </div>
      <div style={{ margin: '18px 4px 6px' }}>
        <div className="live-demand-bar">
          <div className="live-demand-bar-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#00c853,#009624)' }} />
        </div>
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, marginTop: 8 }}>
          {ready ? 'Walk up whenever you\'re ready' : `Ready in ~${fmt(remaining)}`}
        </div>
      </div>
      <OrderSummary order={order} />
      <div style={{ padding: '4px 4px 20px' }}>
        <button className="btn-primary tiffinx" onClick={onDone}>Back to Home</button>
      </div>
    </div>
  )
}

function DeliveryTracking({ order, onDone }) {
  const { completeOrder } = useApp()
  const total = order.etaSeconds || 1200
  const [remaining, setRemaining] = useState(total)
  const doneRef = useRef(false)

  useEffect(() => {
    if (order.status === 'delivered') return
    const wallClock = order.isTiffinX ? DEMO_WALLCLOCK_SECONDS.tiffinx : DEMO_WALLCLOCK_SECONDS.regular
    const stepMs = 200
    const decrementPerTick = total / ((wallClock * 1000) / stepMs)
    const iv = setInterval(() => {
      setRemaining((r) => {
        const next = r - decrementPerTick
        if (next <= 0) {
          clearInterval(iv)
          return 0
        }
        return next
      })
    }, stepMs)
    return () => clearInterval(iv)
  }, [order.id])

  useEffect(() => {
    if (remaining === 0 && order.status !== 'delivered' && !doneRef.current) {
      doneRef.current = true
      completeOrder(order.id)
    }
  }, [remaining, order, completeOrder])

  const elapsedFrac = 1 - remaining / total
  const delivered = order.status === 'delivered'
  const stepIndex = delivered ? 3 : elapsedFrac < 0.15 ? 0 : elapsedFrac < 0.55 ? 1 : 2
  const offset = CIRC * (1 - (delivered ? 1 : elapsedFrac))
  const ringColor = order.isTiffinX ? '#00c853' : '#2874F0'

  return (
    <div className="tracking-wrap">
      <div className="ring-wrap">
        <svg width="220" height="220">
          <circle cx="110" cy="110" r={RADIUS} stroke="#eee" strokeWidth="14" fill="none" />
          <circle
            cx="110" cy="110" r={RADIUS}
            stroke={ringColor}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="ring-center">
          {delivered ? (
            <>
              <div style={{ fontSize: 46 }}>🎉</div>
              <div className="rc-label">Delivered!</div>
            </>
          ) : (
            <>
              <div className="rc-time">{fmt(remaining)}</div>
              <div className="rc-label">estimated time left</div>
              {order.isTiffinX && <div className="rc-promise">⚡ &lt;20-MIN PROMISE</div>}
            </>
          )}
        </div>
      </div>

      <div className="status-steps">
        {STEPS.map((s, i) => (
          <div key={s.key} className={`status-step ${i <= stepIndex ? 'done' : ''}`}>
            <div className="ss-dot">{i <= stepIndex ? s.icon : i + 1}</div>
            <div className="ss-label">{s.label}</div>
          </div>
        ))}
      </div>

      <OrderSummary order={order} />

      {delivered ? (
        <div style={{ padding: '4px 4px 20px' }}>
          <button className={`btn-primary ${order.isTiffinX ? 'tiffinx' : ''}`} onClick={onDone}>
            Back to Home
          </button>
        </div>
      ) : (
        <div style={{ fontSize: 11.5, color: '#878787', marginTop: 6 }}>
          {order.isTiffinX ? 'Your kitchen is pre-batched for this order — sit tight!' : 'Sit back, your food is on the way.'}
        </div>
      )}
    </div>
  )
}

export default function OrderTracking({ orderId }) {
  const { orders, resetTo, goTab } = useApp()
  const order = orders.find((o) => o.id === orderId)
  if (!order) return null

  const onDone = () => goTab('home')
  const headerTitle = order.scheduled ? 'Order Scheduled' : order.fulfillment === 'dineIn' ? 'Table Confirmation' : order.fulfillment === 'takeaway' ? 'Pickup Order' : 'Track Order'

  return (
    <div>
      <ScreenHeader title={headerTitle} sub={`#${order.id}`} tiffinx={order.isTiffinX} onBack={() => resetTo('home')} />

      {order.scheduled ? (
        <ScheduledConfirmation order={order} onDone={onDone} />
      ) : order.fulfillment === 'dineIn' ? (
        <DineInConfirmation order={order} onDone={onDone} />
      ) : order.fulfillment === 'takeaway' ? (
        <TakeawayConfirmation order={order} onDone={onDone} />
      ) : (
        <DeliveryTracking order={order} onDone={onDone} />
      )}
    </div>
  )
}
