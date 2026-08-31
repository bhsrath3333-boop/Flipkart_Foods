import React, { useState } from 'react'
import { useApp } from '../state/store'
import { OCCASIONS } from '../data/mockData'

export default function OccasionDock() {
  const { occasion, setOccasion, customerTab, fireMarketingNudge } = useApp()
  const [open, setOpen] = useState(false)

  if (customerTab !== 'home') return null

  return (
    <div className="occasion-dock">
      {open && (
        <div className="occasion-panel">
          <div className="op-title">Demo: Set Context</div>
          {Object.values(OCCASIONS).map((o) => (
            <button
              key={o.key}
              className={occasion === o.key ? 'active' : ''}
              onClick={() => {
                setOccasion(o.key)
                setOpen(false)
              }}
            >
              {o.label}
            </button>
          ))}
          <div className="op-title" style={{ marginTop: 6, borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>Demo: Marketing Push</div>
          <button
            onClick={() => {
              fireMarketingNudge()
              setOpen(false)
            }}
          >
            🔔 Simulate Notification
          </button>
        </div>
      )}
      <button className="occasion-fab" onClick={() => setOpen((v) => !v)} title="Demo: set context">
        🎛️
      </button>
    </div>
  )
}
