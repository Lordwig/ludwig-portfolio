import { useState, type ReactNode } from 'react'

interface BrowserFrameProps {
  url: string
  title: string
  src?: string
  /** auto-scroll tall screenshots when the parent card is hovered */
  scrollOnHover?: boolean
  children?: ReactNode
}

export default function BrowserFrame({ url, title, src, scrollOnHover = false, children }: BrowserFrameProps) {
  const [failed, setFailed] = useState(false)
  const [tall, setTall] = useState(false)

  let content: ReactNode = children
  if (!content) {
    content =
      src && !failed ? (
        <img
          src={src}
          alt={`${title} screenshot`}
          onError={() => setFailed(true)}
          onLoad={(e) => {
            const img = e.currentTarget
            setTall(img.naturalHeight / img.naturalWidth > 10 / 16 + 0.05)
          }}
        />
      ) : (
        <div className="bf-empty">
          <span>{title}</span>
        </div>
      )
  }

  return (
    <div className={`bf ${scrollOnHover && tall ? 'bf-scroll' : ''}`}>
      <div className="bf-bar">
        <span className="bf-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="bf-url">{url}</span>
      </div>
      <div className="bf-view">{content}</div>
    </div>
  )
}
