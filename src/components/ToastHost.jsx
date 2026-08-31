import React from 'react'
import { useApp } from '../state/store'

export default function ToastHost() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="toast-host">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.tone}`}>
          <span className="t-icon">{t.tone === 'success' ? '🪙' : '🔔'}</span>
          <div>
            <div className="t-title">{t.title}</div>
            <div className="t-body">{t.body}</div>
          </div>
          <button className="t-close" onClick={() => dismissToast(t.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}
