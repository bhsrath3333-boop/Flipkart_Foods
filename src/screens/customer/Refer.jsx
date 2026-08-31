import React, { useState } from 'react'
import { useApp } from '../../state/store'
import { ScreenHeader } from '../../components/TopBars'

export default function Refer() {
  const { referralCode, applyReferral, pop, pushToast } = useApp()
  const [copied, setCopied] = useState(false)
  const [used, setUsed] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    pushToast('Code Copied 📋', `${referralCode} copied to clipboard`, 'info')
    setTimeout(() => setCopied(false), 1500)
  }

  const handleSimulateReferral = () => {
    setUsed(true)
    applyReferral()
  }

  return (
    <div>
      <ScreenHeader title="Refer & Earn" onBack={pop} />

      <div className="refer-hero">
        <div className="rh-title">Give ₹50, Get ₹50</div>
        <div className="rh-sub">Invite friends to Flipkart Foods. They get ₹50 off their first order, you get ₹50 SuperCoins.</div>
        <div className="rh-amounts">
          <div className="rh-amt-box"><b>₹50</b><span>You Get</span></div>
          <div className="rh-amt-box"><b>₹50</b><span>They Get</span></div>
        </div>
      </div>

      <div style={{ padding: '0 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Your referral code</div>
        <div className="refer-code-box">
          <span className="rc-code">{referralCode}</span>
          <button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
        </div>

        <div className="share-grid">
          <button onClick={handleCopy}><span className="sg-icon">💬</span>WhatsApp</button>
          <button onClick={handleCopy}><span className="sg-icon">✉️</span>Message</button>
          <button onClick={handleCopy}><span className="sg-icon">🔗</span>Copy Link</button>
        </div>

        <div className="card" style={{ margin: '18px 0 10px' }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Demo: Simulate a successful referral</div>
          <div style={{ fontSize: 11.5, color: '#878787', marginBottom: 10 }}>
            Tap below to simulate a friend signing up with your code and placing their first order.
          </div>
          <button className="btn-primary" disabled={used} onClick={handleSimulateReferral}>
            {used ? '✓ Referral Bonus Credited' : 'Simulate Friend Joining →'}
          </button>
        </div>
      </div>
    </div>
  )
}
