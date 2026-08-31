import React, { useState } from 'react'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

// Tries basePath.jpg, then .jpeg, .png, .webp in turn; renders `fallback`
// once all candidates 404. Pass a changing `key` prop from the caller
// (e.g. key={item.id}) so state resets when the underlying image changes.
export default function ImageWithFallback({ basePath, alt = '', className, style, fallback = null }) {
  const [i, setI] = useState(0)

  if (i >= EXTENSIONS.length) return fallback

  return (
    <img
      src={`${basePath}.${EXTENSIONS[i]}`}
      alt={alt}
      className={className}
      style={style}
      onError={() => setI((n) => n + 1)}
    />
  )
}
