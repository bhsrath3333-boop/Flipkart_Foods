import React, { useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'
import { getItemById, NUTRITION } from '../../data/mockData'
import TiffinXInfoModal from './TiffinXInfoModal'
import BrandBadge from '../../components/BrandBadge'
import ImageWithFallback from '../../components/ImageWithFallback'

export default function ItemDetail({ id }) {
  const { cart, addToCart, push } = useApp()
  const [showInfo, setShowInfo] = useState(false)
  const [showNutrition, setShowNutrition] = useState(false)
  const item = getItemById(id)
  if (!item) return null
  const qty = cart[id] || 0
  const isTx = !!item.certified
  const n = NUTRITION[item.id]

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <ScreenHeader title={item.name} tiffinx={isTx} />
      <div className="detail-hero">
        {isTx && <span className="certified-badge" style={{ top: 12, left: 12 }}>⚡ &lt;20-MIN CERTIFIED</span>}
        <ImageWithFallback
          key={item.id}
          basePath={`/images/menu/${item.id}`}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          fallback={item.img}
        />
      </div>
      <div className="detail-body">
        <h2>{item.name}</h2>
        <div className="detail-restaurant" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <BrandBadge name={item.restaurant} size={18} />
          by {item.restaurant} · {item.rating} ★
        </div>

        <div className="detail-price-row">
          <span className="detail-price">₹{item.price}</span>
          {item.mrp > item.price && (
            <>
              <span className="detail-mrp">₹{item.mrp}</span>
              <span className="detail-save">{Math.round(100 - (item.price / item.mrp) * 100)}% OFF</span>
            </>
          )}
        </div>

        <div className="parity-note">
          ✅ Restaurant Price = Flipkart Price — no hidden markup
        </div>

        {isTx ? (
          <div className="badge-tag" style={{ background: '#e5f9ee', color: '#009624' }}>
            ⚡ Delivered in {item.eta} · Certified TiffinX kitchen
          </div>
        ) : (
          <div className="badge-tag">🕒 Estimated delivery: {item.eta}</div>
        )}

        {isTx && (
          <button className="info-link-btn" onClick={() => setShowInfo(true)}>
            Why is TiffinX this fast? →
          </button>
        )}

        {n && (
          <div className="nutrition-accordion">
            <button className="nutrition-accordion-head" onClick={() => setShowNutrition((v) => !v)}>
              <span>🍎 Nutrition Info</span>
              <span>{showNutrition ? '▲' : '▼'}</span>
            </button>
            {showNutrition && (
              <div className="nutrition-grid" style={{ marginTop: 10 }}>
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
            )}
          </div>
        )}

        <p style={{ fontSize: 12.5, color: '#616161', lineHeight: 1.6, marginTop: 16 }}>
          Freshly prepared using quality ingredients. Packed hygienically for delivery.
          {isTx ? ' Part of the certified TiffinX menu — pre-batched for guaranteed speed.' : ''}
        </p>
      </div>

      <div className="sticky-footer">
        {qty === 0 ? (
          <button className={`btn-primary ${isTx ? 'tiffinx' : ''}`} onClick={() => addToCart(id, 1)}>
            Add to Cart — ₹{item.price}
          </button>
        ) : (
          <>
            <span className={`ic-qty ${isTx ? 'tiffinx' : ''}`} style={{ padding: '4px 2px' }}>
              <button onClick={() => addToCart(id, -1)}>−</button>
              <span style={{ padding: '0 10px' }}>{qty}</span>
              <button onClick={() => addToCart(id, 1)}>+</button>
            </span>
            <button className={`btn-primary ${isTx ? 'tiffinx' : ''}`} onClick={() => push('cart')}>
              View Cart →
            </button>
          </>
        )}
      </div>

      {showInfo && <TiffinXInfoModal onClose={() => setShowInfo(false)} />}
    </div>
  )
}
