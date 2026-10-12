import { profile } from '../data'

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-row">
        <span>© 2026 {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
