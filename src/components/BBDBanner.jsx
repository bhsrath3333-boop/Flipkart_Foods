import React, { useEffect, useState } from 'react'
import { useApp } from '../state/store'
import { BBD_OFFER } from '../data/mockData'

const START_SECONDS = 2 * 3600 + 59 * 60 + 59 // cosmetic countdown, loops for the demo

function fmt(total) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function BBDBanner() {
  const { bbdApplied, applyBBD, foodMode, setFoodMode, pushToast } = useApp()
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS)

  useEffect(() => {
    const iv = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? START_SECONDS : s - 1))
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const handleTap = () => {
    if (bbdApplied) {
      if (foodMode !== 'tiffinx') {
        setFoodMode('tiffinx')
        pushToast('Add a TiffinX item 🛍️', 'Your ₹1 tasting discount applies at checkout.', 'info')
      }
      return
    }
    applyBBD()
  }

  return (
    <div className="bbd-banner" onClick={handleTap} role="button" tabIndex={0}>
      <span className="bbd-ribbon">🔥 {BBD_OFFER.ribbon}</span>
      <span className="bbd-timer">⏱ {fmt(secondsLeft)}</span>
      <div className="bbd-title">{BBD_OFFER.headline}</div>
      <div className="bbd-sub">{BBD_OFFER.subline}</div>
      <button className={`bbd-cta ${bbdApplied ? 'applied' : ''}`}>
        {bbdApplied ? '✓ ₹1 Deal Applied — Add TiffinX Item' : 'Grab ₹1 Deal →'}
      </button>
    </div>
  )
}
