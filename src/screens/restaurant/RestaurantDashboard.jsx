import React, { useEffect, useRef, useState } from 'react'
import { useApp } from '../../state/store'
import { FORECAST_HISTORY, PRE_ORDER_SLOTS, PRE_ORDER_PEAK_SLOT, PRE_ORDER_CAPACITY } from '../../data/mockData'

function ForecastChart() {
  const maxOrders = Math.max(...FORECAST_HISTORY.hourly.map((h) => h.orders))
  const peakHour = '1-2 PM'

  return (
    <div className="card">
      <div className="rp-section-title"><span className="rp-icon">📈</span>Order Forecast — {FORECAST_HISTORY.day}</div>
      <div style={{ fontSize: 11.5, color: '#878787', marginBottom: 4 }}>
        Based on the last 4 {FORECAST_HISTORY.day}s of order history
      </div>

      <div className="chart-bars">
        {FORECAST_HISTORY.hourly.map((h) => (
          <div className="chart-bar-col" key={h.hour}>
            <div className="chart-bar-val">{h.orders}</div>
            <div
              className={`chart-bar ${h.hour === peakHour ? 'peak' : ''}`}
              style={{ height: `${(h.orders / maxOrders) * 100}%` }}
            />
            <div className="chart-bar-label">{h.hour}</div>
          </div>
        ))}
      </div>

      <div className="week-compare-row">
        {FORECAST_HISTORY.weeks.map((w, i) => (
          <div className="week-chip" key={i}>
            <div className="wc-val">{w}</div>
            <div className="wc-label">Thu -{FORECAST_HISTORY.weeks.length - i}wk</div>
          </div>
        ))}
      </div>

      <div className="predicted-banner">
        📊 <span>Expect ~<b>{FORECAST_HISTORY.predicted} orders</b> during {FORECAST_HISTORY.slot} — plan batching ahead of this window.</span>
      </div>
    </div>
  )
}

function LiveDemandPanel() {
  const { preOrderCounts } = useApp()
  // A small ambient trickle (other campus users ordering) layered on top of
  // the store's real, customer-driven pre-order counts — kept slow/capped so
  // a presenter's own pre-order still reads as a clear, immediate jump.
  const [ambient, setAmbient] = useState(0)
  const prevPeakRef = useRef(preOrderCounts[PRE_ORDER_PEAK_SLOT])
  const [justBumped, setJustBumped] = useState(false)

  useEffect(() => {
    if (ambient >= 6) return
    const t = setTimeout(() => setAmbient((a) => Math.min(6, a + 1)), 6000)
    return () => clearTimeout(t)
  }, [ambient])

  useEffect(() => {
    const current = preOrderCounts[PRE_ORDER_PEAK_SLOT]
    if (current > prevPeakRef.current) {
      setJustBumped(true)
      const t = setTimeout(() => setJustBumped(false), 1200)
      prevPeakRef.current = current
      return () => clearTimeout(t)
    }
    prevPeakRef.current = current
  }, [preOrderCounts])

  const peakCount = preOrderCounts[PRE_ORDER_PEAK_SLOT] + ambient
  const pct = Math.min(100, (peakCount / PRE_ORDER_CAPACITY) * 100)

  return (
    <div className="live-demand">
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 11.5, fontWeight: 700, color: '#a83c00' }}>
        <span className="live-dot" /> LIVE · {FORECAST_HISTORY.slot}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span className={`live-count ${justBumped ? 'coin-pop' : ''}`}>{peakCount}</span>
        <span style={{ fontSize: 12.5, color: '#a83c00', fontWeight: 600 }}>people pre-ordered for the {PRE_ORDER_PEAK_SLOT} slot</span>
      </div>
      <div className="live-demand-bar">
        <div className="live-demand-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div style={{ fontSize: 10.5, color: '#a86200', marginTop: 6 }}>
        {peakCount}/{PRE_ORDER_CAPACITY} of estimated kitchen capacity for this slot
      </div>

      <div className="slot-breakdown">
        {PRE_ORDER_SLOTS.map((s) => (
          <div key={s} className={`slot-breakdown-item ${s === PRE_ORDER_PEAK_SLOT ? 'peak' : ''}`}>
            <div className="sbi-count">{preOrderCounts[s] || 0}</div>
            <div className="sbi-label">{s}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: '#c07a00', marginTop: 6 }}>
        🔗 Updates live as customers pick pre-order slots in the app
      </div>
    </div>
  )
}

function CapacityIndicator() {
  const [load, setLoad] = useState(62)
  const status = load < 60 ? 'green' : load < 85 ? 'amber' : 'red'
  const config = {
    green: { icon: '✅', title: 'Accepting Orders', desc: 'Kitchen load is healthy. New orders auto-accepted.' },
    amber: { icon: '⏳', title: 'Throttling New Orders', desc: 'Approaching capacity — orders spaced by 3-min slots.' },
    red: { icon: '⛔', title: 'Hidden from Search', desc: 'At capacity — temporarily hidden to protect delivery promise.' },
  }[status]

  return (
    <div className="card">
      <div className="rp-section-title"><span className="rp-icon">🚦</span>Kitchen Capacity</div>
      <div className="capacity-box">
        <div className={`capacity-light ${status}`}>{config.icon}</div>
        <div className="capacity-info">
          <div className={`cap-status ${status}`}>{config.title}</div>
          <div className="cap-desc">{config.desc}</div>
        </div>
      </div>
      <div className="capacity-slider-row">
        <input type="range" min="0" max="100" value={load} onChange={(e) => setLoad(Number(e.target.value))} />
        <div className="csr-labels">
          <span>0% load</span>
          <span>Current: {load}%</span>
          <span>100% load</span>
        </div>
      </div>
      <div style={{ fontSize: 10, color: '#aaa', marginTop: 8 }}>Demo control — drag to simulate live kitchen load</div>
    </div>
  )
}

export default function RestaurantDashboard() {
  return (
    <div>
      <ForecastChart />
      <div style={{ padding: '4px 12px' }}>
        <div className="rp-section-title" style={{ marginTop: 6 }}><span className="rp-icon">🔥</span>Incoming Demand</div>
      </div>
      <LiveDemandPanel />
      <CapacityIndicator />
    </div>
  )
}
