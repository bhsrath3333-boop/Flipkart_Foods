import React, { useState } from 'react'
import { useApp } from '../../state/store'

const PRIZES = [10, 25, 5, 50, 15, 20, 5, 30]

export default function PlayScreen() {
  const { setCoins, pushToast } = useApp()
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [played, setPlayed] = useState(false)

  const handleSpin = () => {
    if (spinning || played) return
    setSpinning(true)
    const prizeIndex = Math.floor(Math.random() * PRIZES.length)
    const segmentDeg = 360 / PRIZES.length
    const targetDeg = 360 * 5 + (360 - prizeIndex * segmentDeg - segmentDeg / 2)
    setRotation(targetDeg)
    setTimeout(() => {
      const won = PRIZES[prizeIndex]
      setCoins((c) => c + won)
      pushToast('You won! 🎡', `+${won} SuperCoins added to your wallet`, 'success')
      setSpinning(false)
      setPlayed(true)
    }, 3200)
  }

  return (
    <div style={{ padding: 16, textAlign: 'center' }}>
      <div className="screen-header" style={{ margin: '-16px -16px 16px', boxShadow: 'none', background: 'transparent' }}>
        <h2 style={{ flex: 1, textAlign: 'left' }}>🎮 Flipkart Play</h2>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Spin & Win SuperCoins</div>
        <div style={{ fontSize: 11.5, color: '#878787', marginBottom: 18 }}>One free spin daily — try your luck!</div>

        <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
          <div
            style={{
              width: 200, height: 200, borderRadius: '50%',
              background: 'conic-gradient(#2874F0 0deg 45deg, #FFC107 45deg 90deg, #00c853 90deg 135deg, #ff6f00 135deg 180deg, #2874F0 180deg 225deg, #FFC107 225deg 270deg, #00c853 270deg 315deg, #ff6f00 315deg 360deg)',
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.2s cubic-bezier(.17,.67,.16,.99)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'white', boxShadow: '0 0 0 4px #eee' }} />
          </div>
          <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', fontSize: 22 }}>🔻</div>
        </div>

        <button className="btn-primary" style={{ marginTop: 20 }} disabled={spinning || played} onClick={handleSpin}>
          {played ? "You've used today's spin" : spinning ? 'Spinning…' : 'Spin Now'}
        </button>
      </div>
    </div>
  )
}
