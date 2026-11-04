import { useEffect, useRef } from 'react'

const N = 64
const TAU = Math.PI * 2
const poly = (n: number, rot: number, radius: number) => (t: number) => {
  const a = TAU / n
  const d = ((((t - rot) % a) + a) % a) - a / 2
  return (radius * Math.cos(Math.PI / n)) / Math.cos(d)
}
const forms = [
  () => 1,
  poly(4, Math.PI / 4, 1.27),
  poly(3, -Math.PI / 2, 1.22),
  (t: number) => 0.72 + 0.28 * Math.cos(6 * t),
  (t: number) => 0.86 + 0.1 * Math.cos(3 * t + 0.5) + 0.05 * Math.cos(5 * t),
].map((fn) => Array.from({ length: N }, (_, i) => fn((i / N) * TAU)))
const colors = ['var(--blue)', 'var(--ink)', 'var(--blue)', 'var(--ink)', 'var(--blue)']
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const clip = (radii: number[]) =>
  'polygon(' +
  radii
    .map((r, i) => {
      const t = (i / N) * TAU
      return `${(50 + 38 * r * Math.cos(t)).toFixed(2)}% ${(50 + 38 * r * Math.sin(t)).toFixed(2)}%`
    })
    .join(',') +
  ')'

/** A small shape in the corner that morphs from form to form as you scroll down the page. */
export default function CornerShape() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const paint = () => {
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      const f = p * (forms.length - 1)
      const i = Math.min(Math.floor(f), forms.length - 2)
      const t = f - i
      el.style.clipPath = clip(forms[i].map((v, j) => lerp(v, forms[i + 1][j], t)))
      el.style.background = `color-mix(in srgb, ${colors[i]}, ${colors[i + 1]} ${Math.round(t * 100)}%)`
    }
    paint()
    window.addEventListener('scroll', paint, { passive: true })
    window.addEventListener('resize', paint)
    return () => {
      window.removeEventListener('scroll', paint)
      window.removeEventListener('resize', paint)
    }
  }, [])

  return <div className="corner-shape" ref={ref} aria-hidden="true" />
}