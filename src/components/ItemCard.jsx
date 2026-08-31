import React, { useState } from 'react'
import { useApp } from '../state/store'
import { BRANDS } from '../data/mockData'
import BrandBadge from './BrandBadge'
import NutritionPopover from './NutritionPopover'
import ImageWithFallback from './ImageWithFallback'

export default function ItemCard({ item }) {
  const { cart, addToCart, push } = useApp()
  const [showNutrition, setShowNutrition] = useState(false)
  const qty = cart[item.id] || 0
  const isTx = !!item.certified
  const brand = BRANDS[item.restaurant]

  return (
    <div
      className="item-card"
      role="button"
      tabIndex={0}
      onClick={() => push('itemDetail', { id: item.id })}
      onKeyDown={(e) => e.key === 'Enter' && push('itemDetail', { id: item.id })}
    >
      <div className="ic-img" style={brand ? { background: `linear-gradient(135deg, ${brand.primary}22, ${brand.secondary}33)` } : undefined}>
        {item.certified && (
          <span className="certified-badge">⚡ &lt;20-MIN CERTIFIED</span>
        )}
        <ImageWithFallback
          key={item.id}
          basePath={`/images/menu/${item.id}`}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          fallback={item.img}
        />
      </div>
      <div className="ic-body">
        <div className="ic-name">{item.name}</div>
        <div className="ic-restaurant" style={brand ? { display: 'flex', alignItems: 'center', gap: 5, color: brand.primary, fontWeight: 700 } : undefined}>
          <BrandBadge name={item.restaurant} size={16} />
          {item.restaurant}
        </div>
        <div className="ic-meta">
          <span className="ic-rating">{item.rating} ★</span>
          <span className={`ic-eta ${isTx ? 'tiffinx' : ''}`}>{isTx ? `⚡ ${item.eta}` : item.eta}</span>
        </div>
        <span
          className="nutrition-tag"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            setShowNutrition(true)
          }}
        >
          🍎 Nutrition Info
        </span>
        <div className="ic-price-row">
          <div>
            <span className="ic-price">₹{item.price}</span>
            {item.mrp > item.price && <span className="ic-mrp">₹{item.mrp}</span>}
          </div>
          {qty === 0 ? (
            <span
              className={`ic-add-btn ${isTx ? 'tiffinx' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                addToCart(item.id, 1)
              }}
            >
              ADD
            </span>
          ) : (
            <span
              className={`ic-qty ${isTx ? 'tiffinx' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => addToCart(item.id, -1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => addToCart(item.id, 1)}>+</button>
            </span>
          )}
        </div>
      </div>

      {showNutrition && (
        <span onClick={(e) => e.stopPropagation()}>
          <NutritionPopover item={item} onClose={() => setShowNutrition(false)} />
        </span>
      )}
    </div>
  )
}
