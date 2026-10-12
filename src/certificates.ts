import { certificateInfo, defaultCertificates, type CertificateItem } from './data'

export interface Certificate {
  key: string
  url: string
  title: string
  issuer?: string
  year?: string
  credentialId?: string
  skills?: string[]
}

export function generateCertificateSvg(cert: {
  title: string
  issuer: string
  year: string
  credentialId?: string
  accentColor?: string
}) {
  const accent = cert.accentColor || '#3b5bff'
  const id = cert.credentialId || 'VERIFIED-CREDENTIAL'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f9f7f1"/>
      </linearGradient>
      <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="#17140f"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" rx="16" fill="url(#bgGrad)"/>
    <rect x="24" y="24" width="752" height="552" rx="12" fill="none" stroke="${accent}" stroke-width="2.5" stroke-opacity="0.4"/>
    <rect x="36" y="36" width="728" height="528" rx="8" fill="none" stroke="#17140f" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="6,4"/>

    <g transform="translate(400, 72)">
      <circle r="36" fill="url(#badgeGrad)"/>
      <circle r="30" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.6"/>
      <polygon points="0,-16 5,-5 16,-5 8,3 11,14 0,7 -11,14 -8,3 -16,-5 -5,-5" fill="#ffffff"/>
      <polygon points="-12,30 -22,60 -8,52 0,60 8,52 22,60 12,30" fill="${accent}" fill-opacity="0.9"/>
    </g>

    <text x="400" y="162" font-family="'Instrument Sans', sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="#5b554a" text-anchor="middle">CERTIFICATE OF ACHIEVEMENT</text>
    <text x="400" y="194" font-family="'Fraunces', Georgia, serif" font-size="16" font-style="italic" fill="#5b554a" text-anchor="middle">This is proudly awarded to</text>

    <text x="400" y="244" font-family="'Fraunces', Georgia, serif" font-size="34" font-weight="700" fill="#17140f" text-anchor="middle" letter-spacing="-0.5">Ludwig Rex Olarte</text>
    <line x1="220" y1="262" x2="580" y2="262" stroke="${accent}" stroke-width="2" stroke-opacity="0.6"/>

    <text x="400" y="296" font-family="'Instrument Sans', sans-serif" font-size="13" fill="#5b554a" text-anchor="middle">for successfully completing the curriculum and examination requirements in</text>

    <text x="400" y="348" font-family="'Fraunces', Georgia, serif" font-size="28" font-weight="700" fill="#17140f" text-anchor="middle">${cert.title}</text>

    <g transform="translate(160, 440)">
      <line x1="0" y1="0" x2="180" y2="0" stroke="#17140f" stroke-width="1" stroke-opacity="0.3"/>
      <text x="90" y="22" font-family="'Instrument Sans', sans-serif" font-size="13" font-weight="700" fill="#17140f" text-anchor="middle">${cert.issuer}</text>
      <text x="90" y="38" font-family="'Instrument Sans', sans-serif" font-size="11" fill="#5b554a" text-anchor="middle">ISSUING BODY</text>
    </g>

    <g transform="translate(460, 440)">
      <line x1="0" y1="0" x2="180" y2="0" stroke="#17140f" stroke-width="1" stroke-opacity="0.3"/>
      <text x="90" y="22" font-family="'Instrument Sans', sans-serif" font-size="13" font-weight="700" fill="#17140f" text-anchor="middle">${cert.year}</text>
      <text x="90" y="38" font-family="'Instrument Sans', sans-serif" font-size="11" fill="#5b554a" text-anchor="middle">YEAR ISSUED</text>
    </g>

    <rect x="250" y="515" width="300" height="28" rx="14" fill="#ffffff" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
    <text x="400" y="534" font-family="'Instrument Sans', monospace" font-size="11" font-weight="600" letter-spacing="1" fill="#5b554a" text-anchor="middle">ID: ${id}</text>
  </svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// Images dropped into src/assets/certs/ or public/certs/ are picked up automatically
const assetModules = import.meta.glob<string>('/src/assets/certs/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const publicModules = import.meta.glob<string>('/public/certs/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const modules = { ...assetModules, ...publicModules }

const pretty = (name: string) =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const uploadedCertificates: Certificate[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url]) => {
    const file = path.split('/').pop() ?? path
    const key = file.replace(/\.[^.]+$/, '')
    const info = certificateInfo[key] ?? {}
    const defaultMatch = defaultCertificates.find((d) => d.key === key)
    return {
      key,
      url,
      title: info.title ?? defaultMatch?.title ?? pretty(key),
      issuer: info.issuer ?? defaultMatch?.issuer,
      year: info.year ?? defaultMatch?.year,
      credentialId: info.credentialId ?? defaultMatch?.credentialId,
      skills: info.skills ?? defaultMatch?.skills,
    }
  })

const defaultsToFill = defaultCertificates
  .filter((d) => !uploadedCertificates.some((u) => u.key.toLowerCase() === d.key.toLowerCase()))
  .map((d: CertificateItem) => ({
    key: d.key,
    url: d.url || generateCertificateSvg(d),
    title: d.title,
    issuer: d.issuer,
    year: d.year,
    credentialId: d.credentialId,
    skills: d.skills,
  }))

// Prioritize uploaded real certificates and maintain at least 4 items in the grid
export const certificates: Certificate[] =
  uploadedCertificates.length >= 4
    ? uploadedCertificates
    : [...uploadedCertificates, ...defaultsToFill.slice(0, Math.max(0, 4 - uploadedCertificates.length))]

export const hasCertificates = certificates.length > 0
