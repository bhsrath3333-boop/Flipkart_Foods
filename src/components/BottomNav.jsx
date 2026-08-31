import React from 'react'
import { useApp } from '../state/store'

const TABS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'play', label: 'Play', icon: '🎮' },
  { key: 'orders', label: 'Orders', icon: '🧾' },
  { key: 'account', label: 'Account', icon: '👤' },
  { key: 'cart', label: 'Cart', icon: '🛒' },
]

export default function BottomNav() {
  const { customerTab, goTab, cartCount } = useApp()
  return (
    <div className="bottom-nav">
      {TABS.map((t) => (
        <button key={t.key} className={customerTab === t.key ? 'active' : ''} onClick={() => goTab(t.key)}>
          <span className="bn-icon">{t.icon}</span>
          {t.label}
          {t.key === 'cart' && cartCount > 0 && <span className="bn-badge">{cartCount}</span>}
        </button>
      ))}
    </div>
  )
}
