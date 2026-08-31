import React from 'react'
import { useApp } from '../../state/store'

const ROWS = [
  { icon: '🧾', label: 'My Orders', screen: 'orders' },
  { icon: '🪙', label: 'SuperCoins Wallet', screen: 'wallet' },
  { icon: '🎁', label: 'Refer & Earn', screen: 'refer' },
  { icon: '🎓', label: 'Campus ID Verification', screen: 'onboarding' },
]

export default function Account() {
  const { userName, coins, push, setOnboarded } = useApp()

  return (
    <div>
      <div className="profile-head">
        <div className="profile-avatar">{userName[0]}</div>
        <div>
          <div className="pn">{userName} Kumar</div>
          <div className="pm">rahul.kumar@campus.edu · 🪙 {coins} SuperCoins</div>
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        {ROWS.map((r) => (
          <div
            className="account-row"
            key={r.label}
            onClick={() => (r.screen === 'onboarding' ? setOnboarded(false) : push(r.screen))}
          >
            <span className="ar-icon">{r.icon}</span>
            <span className="ar-label">{r.label}</span>
            <span className="ar-caret">›</span>
          </div>
        ))}
        <div className="account-row"><span className="ar-icon">⚙️</span><span className="ar-label">Settings</span><span className="ar-caret">›</span></div>
        <div className="account-row"><span className="ar-icon">💬</span><span className="ar-label">Help & Support</span><span className="ar-caret">›</span></div>
      </div>
    </div>
  )
}
