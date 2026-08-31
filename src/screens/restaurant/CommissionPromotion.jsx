import React, { useMemo, useState } from 'react'
import { COMMISSION_TIERS, PROMO_RATE_PER_DAY_PER_100, RESTAURANT_PROFILE } from '../../data/mockData'

const OTHER_RESULTS = [
  { name: 'Burger Barracks', cuisine: 'American, Fast Food', img: '🍔' },
  { name: 'Grill & Grind', cuisine: 'American, BBQ', img: '🍖' },
  { name: 'Patty Palace', cuisine: 'Burgers, Fries', img: '🍟' },
]

export default function CommissionPromotion() {
  const [stage, setStage] = useState(1) // index into COMMISSION_TIERS
  const [promoOn, setPromoOn] = useState(false)
  const [budget, setBudget] = useState(200)
  const [days, setDays] = useState(3)

  const tier = COMMISSION_TIERS[stage]

  const estReach = useMemo(() => Math.round(((budget * days) / PROMO_RATE_PER_DAY_PER_100) * 100), [budget, days])
  const estOrders = useMemo(() => Math.max(1, Math.round(estReach * 0.018)), [estReach])
  const totalCost = budget * days

  return (
    <div>
      <div className="card">
        <div className="rp-section-title"><span className="rp-icon">💰</span>Your Commission Tier</div>
        <div style={{ fontSize: 11.5, color: '#878787', marginBottom: 10 }}>
          Demo: toggle stage to preview how commission changes with partner tenure
        </div>
        <div className="tier-row">
          {COMMISSION_TIERS.map((t, i) => (
            <div key={t.tier} className={`tier-card ${i === stage ? 'active' : ''}`} onClick={() => setStage(i)} style={{ cursor: 'pointer' }}>
              <div className="tc-rate">{t.rate}%</div>
              <div className="tc-name">{t.tier}</div>
              <div className="tc-desc">{t.desc}</div>
            </div>
          ))}
        </div>
        <div className="predicted-banner">
          💼 <span>You're on the <b>{tier.tier} tier</b> at <b>{tier.rate}% commission</b> — {tier.desc.toLowerCase()}.</span>
        </div>
      </div>

      <div className="card">
        <div className="promo-toggle-row">
          <div>
            <div className="rp-section-title" style={{ margin: 0 }}><span className="rp-icon">🚀</span>Paid Promotion</div>
            <div style={{ fontSize: 11, color: '#878787', marginTop: 4 }}>Boost your visibility on food search results</div>
          </div>
          <button className={`switch ${promoOn ? 'on' : ''}`} onClick={() => setPromoOn((v) => !v)}>
            <span className="switch-knob" />
          </button>
        </div>

        {promoOn && (
          <>
            <div className="budget-input-row">
              <span style={{ fontSize: 12, fontWeight: 700 }}>₹</span>
              <input type="number" min="50" step="50" value={budget} onChange={(e) => setBudget(Number(e.target.value) || 0)} />
              <span style={{ fontSize: 12, color: '#878787' }}>for</span>
              <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
              </select>
            </div>

            <div className="promo-preview">
              <div>
                <div className="pp-val">~{estReach.toLocaleString()}</div>
                <div className="pp-label">Est. Impressions</div>
              </div>
              <div>
                <div className="pp-val">~{estOrders}</div>
                <div className="pp-label">Est. Extra Orders</div>
              </div>
              <div>
                <div className="pp-val">₹{totalCost.toLocaleString()}</div>
                <div className="pp-label">Total Cost</div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 6 }}>Preview: search results for "burger"</div>
              <div className="search-demo-box">
                <div className="search-result-row promoted">
                  <span className="srr-img">🍔</span>
                  <div>
                    <div className="srr-name">{RESTAURANT_PROFILE.name}</div>
                    <div className="srr-cuisine">{RESTAURANT_PROFILE.cuisine}</div>
                  </div>
                  <span className="srr-promo-tag">AD · Promoted</span>
                </div>
                {OTHER_RESULTS.map((r) => (
                  <div className="search-result-row" key={r.name}>
                    <span className="srr-img">{r.img}</span>
                    <div>
                      <div className="srr-name">{r.name}</div>
                      <div className="srr-cuisine">{r.cuisine}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
