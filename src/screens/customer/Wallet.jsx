import React from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'

export default function Wallet() {
  const { coins, orders, push, resetTo } = useApp()

  const history = [
    ...orders
      .filter((o) => o.status === 'delivered')
      .map((o) => ({ title: `Order #${o.id}`, sub: 'Delivery reward', amt: 15 })),
    { title: 'Welcome Bonus', sub: 'Signed up on Flipkart Foods', amt: 100 },
    { title: 'Referral: Priya S.', sub: 'Friend placed first order', amt: 50 },
    { title: 'Festival Cashback', sub: 'Diwali offer', amt: 75 },
  ]

  return (
    <div>
      <ScreenHeader title="SuperCoins Wallet" onBack={() => resetTo('home')} />

      <div className="wallet-hero">
        <div className="wh-coins coin-pop" key={coins}>🪙 {coins}</div>
        <div className="wh-label">SuperCoins Balance</div>
        <div className="wh-value">≈ ₹{coins} redeemable value</div>
      </div>

      <div style={{ padding: '0 12px' }}>
        <button className="btn-primary" onClick={() => push('refer')}>
          🎁 Refer a Friend — Give ₹50, Get ₹50
        </button>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>How it works</div>
        <div style={{ fontSize: 11.5, color: '#878787', lineHeight: 1.5 }}>
          Earn 15 SuperCoins every time an order is delivered. Redeem coins directly at checkout — 1 coin = ₹1.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Recent Activity</div>
        {history.map((h, i) => (
          <div className="history-row" key={i}>
            <div>
              <div className="hr-title">{h.title}</div>
              <div className="hr-sub">{h.sub}</div>
            </div>
            <div className="hr-amt">+{h.amt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
