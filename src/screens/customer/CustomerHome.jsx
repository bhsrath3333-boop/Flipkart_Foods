import React, { useEffect, useRef, useState } from 'react'
import { useApp } from '../../state/store'
import { TopUtilityBar, LocationBar, SearchBar } from '../../components/TopBars'
import ItemCard from '../../components/ItemCard'
import { OCCASIONS, REGULAR_MENU, TIFFINX_MENU, getItemById, NUDGES, BRAND_DISCLAIMER } from '../../data/mockData'
import TiffinXInfoModal from './TiffinXInfoModal'
import BBDBanner from '../../components/BBDBanner'

const LOOKING_FOR = [
  { id: 'm1', label: 'Subway', icon: '🥪' },
  { id: 'm3', label: 'Burger', icon: '🍔' },
  { id: 'm5', label: 'Tacos', icon: '🌮' },
  { id: 'm7', label: 'Momos', icon: '🥟' },
  { id: 'm9', label: 'Burrito', icon: '🌯' },
  { id: 't2', label: 'Coffee', icon: '☕' },
]

export default function CustomerHome() {
  const { foodMode, setFoodMode, occasion, userName, push, pushToast, fireMarketingNudge } = useApp()
  const [showInfo, setShowInfo] = useState(false)
  const occ = OCCASIONS[occasion]
  const menu = foodMode === 'tiffinx' ? TIFFINX_MENU : REGULAR_MENU
  const comboItems = occ.combo.itemIds.map(getItemById).filter(Boolean)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      const t = setTimeout(() => {
        pushToast('Welcome back! 👋', 'Check out combos curated for the current campus context.', 'info')
      }, 3500)
      return () => clearTimeout(t)
    }
    const n = NUDGES[occasion] || NUDGES.default
    const t = setTimeout(() => pushToast(n.title, n.body, 'info'), 500)
    return () => clearTimeout(t)
  }, [occasion])

  useEffect(() => {
    const iv = setInterval(() => fireMarketingNudge(), 40000)
    return () => clearInterval(iv)
  }, [fireMarketingNudge])

  return (
    <div>
      <TopUtilityBar />
      <LocationBar />
      <SearchBar placeholder={foodMode === 'tiffinx' ? 'Search TiffinX <20-min menu' : 'Search for restaurants and food'} />

      <BBDBanner />

      <div className="hero-banner" style={{ background: occ.banner.gradient }}>
        <div className="hb-deco">{foodMode === 'tiffinx' ? '⚡' : '🍽️'}</div>
        <span className="pill" style={{ position: 'absolute', top: 12, right: 14, background: 'rgba(255,255,255,0.25)', color: 'white' }}>
          🎛️ {occ.label}
        </span>
        <div className="hb-title">{occ.banner.title}</div>
        <div className="hb-sub">{occ.banner.subtitle}</div>
        <button className="hb-cta">{occ.banner.cta}</button>
      </div>

      <div className={`foodmode-tabs ${foodMode === 'tiffinx' ? 'tiffinx' : ''}`}>
        <div className="ft-thumb" />
        <button className={foodMode === 'regular' ? 'active' : ''} onClick={() => setFoodMode('regular')}>
          🍽️ Flipkart Foods
        </button>
        <button className={foodMode === 'tiffinx' ? 'active' : ''} onClick={() => setFoodMode('tiffinx')}>
          ⚡ TiffinX
        </button>
      </div>

      {foodMode === 'tiffinx' && (
        <div style={{ padding: '0 12px' }}>
          <button
            className="info-link-btn"
            style={{ background: '#e5f9ee', padding: '8px 12px', borderRadius: 8, width: '100%', textAlign: 'left', textDecoration: 'none' }}
            onClick={() => setShowInfo(true)}
          >
            ⚡ All items certified &lt;20-min. Tap to see why TiffinX is this fast →
          </button>
        </div>
      )}

      <div className="section">
        <div className="section-head">
          <h3>{userName}, is still looking for these</h3>
        </div>
        <div className="hscroll">
          {LOOKING_FOR.map((l) => (
            <div className="chip-card" key={l.id} onClick={() => push('itemDetail', { id: l.id })}>
              <div className="chip-img">{l.icon}</div>
              <div className="chip-name">{l.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h3>
            {occ.combo.title}
            <span className="sub">{occ.combo.subtitle}</span>
          </h3>
        </div>
        <div className="hscroll">
          {comboItems.map((item) => (
            <div key={item.id} style={{ width: 140, flex: '0 0 auto' }}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h3>
            {foodMode === 'tiffinx' ? 'TiffinX Certified Menu' : 'Explore Restaurants Near You'}
            <span className="sub">
              {foodMode === 'tiffinx' ? 'Every item delivered in under 20 minutes' : 'Handpicked for your campus'}
            </span>
          </h3>
        </div>
      </div>
      <div className="menu-grid">
        {menu.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="brand-disclaimer">ℹ️ {BRAND_DISCLAIMER}</div>

      {showInfo && <TiffinXInfoModal onClose={() => setShowInfo(false)} />}
    </div>
  )
}
