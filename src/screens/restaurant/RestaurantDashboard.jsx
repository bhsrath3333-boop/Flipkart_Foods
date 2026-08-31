import React, { useEffect, useState } from 'react'
import { FORECAST_HISTORY } from '../../data/mockData'

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
  const [count, setCount] = useState(24)
  const target = 38
  const capacity = 45

  useEffect(() => {
    if (count >= target) return
    const t = setTimeout(() => setCount((c) => Math.min(target, c + 1)), 900)
    return () => clearTimeout(t)
  }, [count])

  const pct = Math.min(100, (count / capacity) * 100)

  return (
    <div className="live-demand">
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 11.5, fontWeight: 700, color: '#a83c00' }}>
        <span className="live-dot" /> LIVE · 1:00–2:00 PM slot
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span className="live-count">{count}</span>
        <span style={{ fontSize: 12.5, color: '#a83c00', fontWeight: 600 }}>people pre-ordered for this slot</span>
      </div>
      <div className="live-demand-bar">
        <div className="live-demand-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div style={{ fontSize: 10.5, color: '#a86200', marginTop: 6 }}>
        {count}/{capacity} of estimated kitchen capacity for this slot
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
