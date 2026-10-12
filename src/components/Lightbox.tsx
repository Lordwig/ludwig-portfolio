import { useEffect, useRef } from 'react'
import type { Certificate } from '../certificates'

interface LightboxProps {
  items: Certificate[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const latest = useRef({ index, onClose, onChange, count: items.length })
  latest.current = { index, onClose, onChange, count: items.length }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { index: i, onClose: close, onChange: change, count } = latest.current
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') change((i + 1) % count)
      if (e.key === 'ArrowLeft') change((i - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const item = items[index]
  const multiple = items.length > 1

  return (
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        Close ✕
      </button>

      {multiple && (
        <button
          className="lb-nav lb-prev"
          aria-label="Previous certificate"
          onClick={(e) => {
            e.stopPropagation()
            onChange((index - 1 + items.length) % items.length)
          }}
        >
          ←
        </button>
      )}

      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.url} alt={item.title} />
        <figcaption>
          <strong>{item.title}</strong>
          {(item.issuer || item.year) && <span>{[item.issuer, item.year].filter(Boolean).join(' · ')}</span>}
        </figcaption>
      </figure>

      {multiple && (
        <button
          className="lb-nav lb-next"
          aria-label="Next certificate"
          onClick={(e) => {
            e.stopPropagation()
            onChange((index + 1) % items.length)
          }}
        >
          →
        </button>
      )}
    </div>
  )
}

