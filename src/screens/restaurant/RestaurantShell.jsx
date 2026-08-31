import React from 'react'
import { useApp } from '../../state/store'
import { RESTAURANT_PROFILE } from '../../data/mockData'

const TABS = [
  { key: 'dashboard', label: '📊 Dashboard' },
  { key: 'campus', label: '🎓 Campus Context' },
  { key: 'commission', label: '💰 Commission & Promo' },
]

export default function RestaurantShell({ children }) {
  const { restaurantTab, setRestaurantTab } = useApp()

  return (
    <div>
      <div className="rp-header">
        <div className="rp-greet">Welcome back,</div>
        <div className="rp-name">{RESTAURANT_PROFILE.name}</div>
        <div className="rp-sub">{RESTAURANT_PROFILE.cuisine} · {RESTAURANT_PROFILE.campus}</div>
      </div>

      <div className="rp-stat-row">
        <div className="rp-stat">
          <div className="rp-stat-val">{RESTAURANT_PROFILE.todayOrders}</div>
          <div className="rp-stat-label">Today's Orders</div>
        </div>
        <div className="rp-stat">
          <div className="rp-stat-val">{RESTAURANT_PROFILE.avgPrepTime}</div>
          <div className="rp-stat-label">Avg Prep Time</div>
        </div>
        <div className="rp-stat">
          <div className="rp-stat-val">4.4★</div>
          <div className="rp-stat-label">Rating</div>
        </div>
      </div>

      <div className="rp-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={restaurantTab === t.key ? 'active' : ''} onClick={() => setRestaurantTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {children}
    </div>
  )
}
