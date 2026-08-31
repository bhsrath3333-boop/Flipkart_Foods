import React from 'react'
import { useApp } from '../state/store'

export default function ItemCard({ item }) {
  const { cart, addToCart, push } = useApp()
  const qty = cart[item.id] || 0
  const isTx = !!item.certified

  return (
    <button className="item-card" onClick={() => push('itemDetail', { id: item.id })}>
      <div className="ic-img">
        {item.certified && (
          <span className="certified-badge">⚡ &lt;20-MIN CERTIFIED</span>
        )}
        {item.img}
      </div>
      <div className="ic-body">
        <div className="ic-name">{item.name}</div>
        <div className="ic-restaurant">{item.restaurant}</div>
        <div className="ic-meta">
          <span className="ic-rating">{item.rating} ★</span>
          <span className={`ic-eta ${isTx ? 'tiffinx' : ''}`}>{isTx ? `⚡ ${item.eta}` : item.eta}</span>
        </div>
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
    </button>
  )
}
