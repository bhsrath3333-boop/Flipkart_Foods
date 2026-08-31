import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'

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

export default function OrderTracking({ orderId }) {
  const { orders, completeOrder, resetTo, goTab } = useApp()
  const order = orders.find((o) => o.id === orderId)
  const total = order?.etaSeconds || 1200
  const [remaining, setRemaining] = useState(total)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!order || order.status === 'delivered') return
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
  }, [order?.id])

  useEffect(() => {
    if (remaining === 0 && order && order.status !== 'delivered' && !doneRef.current) {
      doneRef.current = true
      completeOrder(order.id)
    }
  }, [remaining, order, completeOrder])

  if (!order) return null

  const elapsedFrac = 1 - remaining / total
  const delivered = order.status === 'delivered'
  const stepIndex = delivered ? 3 : elapsedFrac < 0.15 ? 0 : elapsedFrac < 0.55 ? 1 : 2
  const offset = CIRC * (1 - (delivered ? 1 : elapsedFrac))
  const ringColor = order.isTiffinX ? '#00c853' : '#2874F0'

  return (
    <div>
      <ScreenHeader title="Track Order" sub={`#${order.id}`} tiffinx={order.isTiffinX} onBack={() => resetTo('home')} />

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

        <div className="card order-summary-card">
          <div className="osc-id">Order {order.id}</div>
          {order.items.map((it, idx) => (
            <div className="bill-row" key={idx}>
              <span className="muted">{it.qty} × {it.name}</span>
              <span>₹{it.price * it.qty}</span>
            </div>
          ))}
          <div className="bill-row total"><span>Total Paid</span><span>₹{order.total}</span></div>
        </div>

        {delivered ? (
          <div style={{ padding: '4px 4px 20px' }}>
            <button className={`btn-primary ${order.isTiffinX ? 'tiffinx' : ''}`} onClick={() => goTab('home')}>
              Back to Home
            </button>
          </div>
        ) : (
          <div style={{ fontSize: 11.5, color: '#878787', marginTop: 6 }}>
            {order.isTiffinX ? 'Your kitchen is pre-batched for this order — sit tight!' : 'Sit back, your food is on the way.'}
          </div>
        )}
      </div>
    </div>
  )
}
