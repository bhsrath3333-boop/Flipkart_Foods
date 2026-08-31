import React from 'react'

const STEPS = [
  { icon: '📋', title: 'Certified, restricted menu', desc: 'TiffinX only lists dishes that can be pre-prepped & assembled fast — no made-to-order complex dishes.' },
  { icon: '📍', title: 'Hyperlocal kitchens', desc: 'Every TiffinX kitchen sits within a tight radius of campus, cutting travel time to near zero.' },
  { icon: '🔥', title: 'Pre-batched cooking', desc: 'Kitchens batch-cook using our demand forecast, so your order is often ready before you finish paying.' },
  { icon: '🛵', title: 'Dedicated delivery fleet', desc: 'A ring-fenced rider pool serves only TiffinX orders — never shared with long-haul regular orders.' },
  { icon: '⏱️', title: 'The 20-min guarantee', desc: 'If any link breaks, the order auto-escalates. Consistently late kitchens are dropped from certification.' },
]

export default function TiffinXInfoModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>⚡ Why TiffinX is this fast</h2>
        <div className="sh-sub" style={{ color: '#878787', fontSize: 12 }}>The certified-menu concept, explained in one screen</div>
        <div style={{ marginTop: 12 }}>
          {STEPS.map((s) => (
            <div className="step-explain" key={s.title}>
              <div className="se-icon">{s.icon}</div>
              <div>
                <div className="se-title">{s.title}</div>
                <div className="se-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-primary tiffinx" style={{ marginTop: 14 }} onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}
