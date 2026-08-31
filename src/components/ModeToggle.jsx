import React from 'react'
import { useApp } from '../state/store'

export default function ModeToggle() {
  const { mode, setMode } = useApp()
  return (
    <div className="mode-toggle-bar">
      <span className="mtb-label">Demo:</span>
      <div className={`mode-switch ${mode === 'restaurant' ? 'restaurant' : ''}`}>
        <div className="mode-thumb" />
        <button className={mode === 'customer' ? 'active' : ''} onClick={() => setMode('customer')}>
          🛍️ Customer View
        </button>
        <button className={mode === 'restaurant' ? 'active' : ''} onClick={() => setMode('restaurant')}>
          🏪 Restaurant Partner
        </button>
      </div>
    </div>
  )
}
