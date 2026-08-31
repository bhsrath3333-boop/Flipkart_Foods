import React from 'react'
import { useApp } from '../../state/store'

export default function OrdersList() {
  const { orders, push } = useApp()

  return (
    <div>
      <div className="screen-header">
        <h2 style={{ flex: 1 }}>My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="es-icon">🧾</div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>No orders yet</div>
          <div style={{ fontSize: 12.5 }}>Your order history will show up here</div>
        </div>
      ) : (
        <div style={{ padding: 12 }}>
          {orders.map((o) => (
            <div
              className="card"
              key={o.id}
              style={{ margin: '0 0 10px', cursor: 'pointer' }}
              onClick={() => o.status !== 'delivered' && push('tracking', { orderId: o.id })}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>
                    {o.isTiffinX && '⚡ '}Order #{o.id}
                  </div>
                  <div style={{ fontSize: 11, color: '#878787', marginTop: 2 }}>
                    {o.items.map((it) => `${it.qty}× ${it.name}`).join(', ')}
                  </div>
                </div>
                <span className={`pill ${o.status === 'delivered' ? 'green' : 'blue'}`}>
                  {o.status === 'delivered' ? 'Delivered' : 'In Progress'}
                </span>
              </div>
              <div className="bill-row total" style={{ marginTop: 8 }}>
                <span>Total</span><span>₹{o.total}</span>
              </div>
              {o.status !== 'delivered' && (
                <button className={`btn-primary ${o.isTiffinX ? 'tiffinx' : ''}`} style={{ marginTop: 8 }}>
                  Track Order →
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
