import React, { useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'
import { getItemById } from '../../data/mockData'
import TiffinXInfoModal from './TiffinXInfoModal'

export default function ItemDetail({ id }) {
  const { cart, addToCart, push } = useApp()
  const [showInfo, setShowInfo] = useState(false)
  const item = getItemById(id)
  if (!item) return null
  const qty = cart[id] || 0
  const isTx = !!item.certified

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <ScreenHeader title={item.name} tiffinx={isTx} />
      <div className="detail-hero">
        {isTx && <span className="certified-badge" style={{ top: 12, left: 12 }}>⚡ &lt;20-MIN CERTIFIED</span>}
        {item.img}
      </div>
      <div className="detail-body">
        <h2>{item.name}</h2>
        <div className="detail-restaurant">by {item.restaurant} · {item.rating} ★</div>

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
