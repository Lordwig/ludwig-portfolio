import { useEffect, useMemo, useRef, useState } from 'react'
import { contact } from '../data'
import { hasCertificates, hasHonors } from '../certificates'

interface Item {
  label: string
  hint: string
  run: () => void
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
    const ext = (url: string) => () => {
      window.open(url, '_blank', 'noopener')
      setOpen(false)
    }
    return [
      { label: 'Go to About', hint: 'section', run: go('about') },
      { label: 'Go to Skills', hint: 'section', run: go('skills') },
      { label: 'Go to Projects', hint: 'section', run: go('projects') },
      ...(hasHonors ? [{ label: 'Go to Honors', hint: 'section', run: go('honors') }] : []),
      ...(hasCertificates ? [{ label: 'Go to Certificates', hint: 'section', run: go('certificates') }] : []),
      { label: 'Go to Contact', hint: 'section', run: go('contact') },
      { label: 'View resume', hint: 'file', run: ext(contact.resume) },
      { label: 'Open LinkedIn', hint: 'link', run: ext(contact.linkedin) },
      { label: 'Open GitHub', hint: 'link', run: ext(contact.github) },
      { label: 'Email me', hint: 'contact', run: ext(`mailto:${contact.email}`) },
    ]
  }, [])

  const results = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const show = () => {
      setQuery('')
      setIndex(0)
      setOpen(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => {
          if (!o) {
            setQuery('')
            setIndex(0)
          }
          return !o
        })
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('open-command', show)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-command', show)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className="cmd-backdrop" onClick={() => setOpen(false)}>
      <div className="cmd" role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          placeholder="Type to jump anywhere…"
          aria-label="Search commands"
          onChange={(e) => {
            setQuery(e.target.value)
            setIndex(0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setIndex((i) => Math.min(i + 1, results.length - 1))
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setIndex((i) => Math.max(i - 1, 0))
            }
            if (e.key === 'Enter') results[index]?.run()
          }}
        />
        <ul>
          {results.length === 0 && <li className="cmd-empty">No results</li>}
          {results.map((item, i) => (
            <li key={item.label} aria-selected={i === index} onMouseEnter={() => setIndex(i)} onClick={item.run}>
              {item.label}
              <small>{item.hint}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}