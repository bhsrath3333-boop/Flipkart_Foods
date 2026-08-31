import React from 'react'

// Deterministic pseudo-QR pattern generated from a seed string — purely
// decorative for the demo, not a real scannable code.
function seededCells(seed, count) {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0
  }
  const cells = []
  for (let i = 0; i < count; i++) {
    h = (h * 1103515245 + 12345) >>> 0
    cells.push((h >> 16) % 3 !== 0)
  }
  return cells
}

export default function FakeQR({ seed }) {
  const cells = seededCells(seed, 81)
  return (
    <div className="fake-qr">
      {cells.map((on, i) => (
        <div key={i} className={`cell ${on ? '' : 'off'}`} />
      ))}
    </div>
  )
}
