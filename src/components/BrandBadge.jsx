import React from 'react'
import { BRANDS } from '../data/mockData'

export default function BrandBadge({ name, size = 20 }) {
  const brand = BRANDS[name]
  if (!brand) return null
  return (
    <span
      className="brand-badge"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: brand.primary,
        color: brand.text,
        boxShadow: `0 0 0 2px ${brand.secondary}`,
      }}
    >
      {brand.initials}
    </span>
  )
}
