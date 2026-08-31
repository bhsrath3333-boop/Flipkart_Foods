import React from 'react'
import { NUTRITION } from '../data/mockData'

export default function NutritionPopover({ item, onClose }) {
  const n = NUTRITION[item.id]
  if (!n) return null

  return (
    <div className="modal-overlay center" onClick={onClose}>
      <div className="nutrition-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ fontSize: 28, textAlign: 'center' }}>{item.img}</div>
        <div style={{ fontWeight: 700, fontSize: 13, textAlign: 'center', marginTop: 4 }}>{item.name}</div>
        <div style={{ fontSize: 10, color: '#878787', textAlign: 'center', marginBottom: 12 }}>
          Nutrition Info (approx., per serving)
        </div>
        <div className="nutrition-grid">
          <div className="nutrition-stat">
            <div className="ns-val">{n.cal}</div>
            <div className="ns-label">Calories</div>
          </div>
          <div className="nutrition-stat">
            <div className="ns-val">{n.protein}g</div>
            <div className="ns-label">Protein</div>
          </div>
          <div className="nutrition-stat">
            <div className="ns-val">{n.carbs}g</div>
            <div className="ns-label">Carbs</div>
          </div>
        </div>
      </div>
    </div>
  )
}
