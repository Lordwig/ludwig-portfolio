import type { RadarPoint } from '../data'

interface RadarChartProps {
  data: RadarPoint[]
}

const SIZE = 400
const CENTER = SIZE / 2
const RADIUS = 110
const RINGS = [25, 50, 75, 100]

export default function RadarChart({ data }: RadarChartProps) {
  const count = data.length
  const angle = (i: number) => (Math.PI * 2 * i) / count - Math.PI / 2

  const point = (i: number, value: number): [number, number] => {
    const radius = (value / 100) * RADIUS
    return [CENTER + Math.cos(angle(i)) * radius, CENTER + Math.sin(angle(i)) * radius]
  }

  const ringPoints = (value: number) => data.map((_, i) => point(i, value).join(',')).join(' ')
  const shapePoints = data.map((d, i) => point(i, d.value).join(',')).join(' ')

  return (
    <svg
      className="radar"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Skill radar: ${data.map((d) => `${d.label} ${d.value}%`).join(', ')}`}
    >
      {RINGS.map((ring) => (
        <polygon key={ring} points={ringPoints(ring)} className="radar-ring" />
      ))}

      {data.map((_, i) => {
        const [x, y] = point(i, 100)
        return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} className="radar-axis" />
      })}

      <g className="radar-shape">
        <polygon points={shapePoints} className="radar-fill" />
        {data.map((d, i) => {
          const [x, y] = point(i, d.value)
          return <circle key={d.label} cx={x} cy={y} r={4} className="radar-dot" />
        })}
      </g>

      {data.map((d, i) => {
        const [x, y] = point(i, 100)
        const cos = Math.cos(angle(i))
        const sin = Math.sin(angle(i))
        const lx = x + cos * 16
        const ly = y + sin * 16 + 4
        const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle'
        return (
          <text key={d.label} x={lx} y={ly} textAnchor={anchor} className="radar-label">
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}