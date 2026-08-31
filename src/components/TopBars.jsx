import React from 'react'
import { useApp } from '../state/store'
import { NUDGES } from '../data/mockData'

const UTILS = [
  { key: 'flipkart', label: 'Flipkart', icon: '🛒' },
  { key: 'pay', label: 'Pay', icon: '💳' },
  { key: 'travel', label: 'Travel', icon: '✈️' },
  { key: 'foods', label: 'Foods', icon: '🍽️' },
]

export function TopUtilityBar() {
  return (
    <div className="top-utility">
      {UTILS.map((u) => (
        <div key={u.key} className={`tu-item ${u.key === 'foods' ? 'active' : ''}`}>
          <span className="tu-icon">{u.icon}</span>
          {u.label}
        </div>
      ))}
    </div>
  )
}

export function LocationBar() {
  const { occasion, pushToast } = useApp()

  const fireNudge = () => {
    const n = NUDGES[occasion] || NUDGES.default
    pushToast(n.title, n.body, 'info')
  }

  return (
    <div className="location-bar">
      <span className="loc-pin">📍</span>
      <span className="loc-text">Home : T3 - 228 Nagercoil, Kanyakumari, TN</span>
      <span className="loc-caret">▼</span>
      <span className="loc-bell" onClick={fireNudge} style={{ cursor: 'pointer' }} title="Send me a nudge (demo)">
        🔔<span className="dot" />
      </span>
    </div>
  )
}

export function SearchBar({ placeholder = 'Search for restaurants and food' }) {
  return (
    <div className="search-wrap">
      <div className="search-bar">
        <span className="icon-btn">🔍</span>
        <input placeholder={placeholder} readOnly />
        <span className="icon-btn">📷</span>
        <span className="icon-btn">🎙️</span>
      </div>
    </div>
  )
}

export function ScreenHeader({ title, sub, onBack, tiffinx }) {
  const { pop } = useApp()
  return (
    <div className={`screen-header ${tiffinx ? 'tiffinx' : ''}`}>
      <button className="back-btn" onClick={onBack || pop}>←</button>
      <h2>
        {title}
        {sub && <span className="sh-sub">{sub}</span>}
      </h2>
    </div>
  )
}
