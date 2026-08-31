import React, { useState } from 'react'
import { useApp } from '../../state/store'

export default function Onboarding() {
  const { setOnboarded, userName } = useApp()
  const [idType, setIdType] = useState('College ID')
  const [idNumber, setIdNumber] = useState('')
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const canVerify = idNumber.trim().length >= 4

  const handleVerify = () => {
    if (!canVerify) return
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
    }, 1100)
  }

  return (
    <div className="onboard-wrap">
      <div className="onboard-logo">🍽️</div>
      <h1>Flipkart Foods</h1>
      <div className="ob-sub">Campus verification unlocks TiffinX &lt;20-min delivery</div>

      <div className="onboard-card">
        <label>ID Type</label>
        <select value={idType} onChange={(e) => setIdType(e.target.value)}>
          <option>College ID</option>
          <option>Employee ID</option>
        </select>

        <label>{idType} Number</label>
        <input
          placeholder="e.g. 21CS1042"
          value={idNumber}
          onChange={(e) => {
            setIdNumber(e.target.value)
            setVerified(false)
          }}
        />

        {verified && (
          <div className="ob-id-preview">
            <div className="obp-photo">🎓</div>
            <div>
              <div className="obp-name">{userName} Kumar</div>
              <div className="obp-meta">{idType}: {idNumber} · IIT Chennai Campus Zone</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          {!verified ? (
            <button className="btn-primary" disabled={!canVerify || verifying} onClick={handleVerify}>
              {verifying ? 'Verifying…' : 'Verify & Continue'}
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setOnboarded(true)}>
              Continue to Flipkart Foods →
            </button>
          )}
        </div>
      </div>

      <button className="ob-skip" onClick={() => setOnboarded(true)}>Skip for now</button>
    </div>
  )
}
