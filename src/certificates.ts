import { certificateInfo, honorInfo, type CertificateInfo } from './data'

export interface Certificate {
  key: string
  url: string
  title: string
  issuer?: string
  date?: string
  kind?: string
}

// Every image dropped into these folders is picked up automatically.
const certModules = import.meta.glob<string>(
  '/src/assets/certs/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,SVG}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
)

const honorModules = import.meta.glob<string>(
  ['/src/assets/honors/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,SVG}', '/src/assets/certs/honors/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,SVG}'],
  { eager: true, query: '?url', import: 'default' }
)

const pretty = (name: string) =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

function build(modules: Record<string, string>, info: Record<string, CertificateInfo>): Certificate[] {
  // Sort entries: if the same key has both svg and png/jpg, prefer png/jpg
  const entries = Object.entries(modules).sort(([pathA], [pathB]) => {
    const extA = pathA.split('.').pop()?.toLowerCase() ?? ''
    const extB = pathB.split('.').pop()?.toLowerCase() ?? ''
    if (extA === 'svg' && extB !== 'svg') return 1
    if (extB === 'svg' && extA !== 'svg') return -1
    return pathA.localeCompare(pathB, undefined, { numeric: true })
  })

  const map = new Map<string, Certificate>()

  for (const [path, url] of entries) {
    const file = path.split('/').pop() ?? path
    const key = file.replace(/\.[^.]+$/, '')
    if (map.has(key)) continue

    const meta = info[key] ?? info[key.toLowerCase()] ?? {}
    map.set(key, {
      key,
      url,
      title: meta.title ?? pretty(key),
      issuer: meta.issuer,
      date: meta.date,
      kind: meta.kind,
    })
  }

  return Array.from(map.values())
}

export const certificates: Certificate[] = build(certModules, certificateInfo)
export const honors: Certificate[] = build(honorModules, honorInfo)
export const hasCertificates = certificates.length > 0
export const hasHonors = honors.length > 0