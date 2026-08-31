import React, { useState } from 'react'
import { useApp } from '../state/store'
import { OCCASIONS } from '../data/mockData'

export default function OccasionDock() {
  const { occasion, setOccasion, customerTab } = useApp()
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
        </div>
      )}
      <button className="occasion-fab" onClick={() => setOpen((v) => !v)} title="Demo: set context">
        🎛️
      </button>
    </div>
  )
}
