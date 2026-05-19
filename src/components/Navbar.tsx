import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Physical', href: '#physical' },
  { label: 'Digital', href: '#digital' },
  { label: 'GPP', href: '#gpp' },
  { label: 'Contact', href: '#contact' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = useCallback((href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(11, 15, 23, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{
            maxWidth: 'var(--content-max)',
            padding: '0 var(--section-pad-x)',
            height: '72px',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-display text-[22px] tracking-[0.15em] text-gold transition-colors duration-300"
            style={{ fontWeight: 400, lineHeight: 1 }}
          >
            KRH
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center" style={{ gap: '40px' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="text-[12px] font-medium uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLElement).style.color = 'var(--gold)'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLElement).style.color = 'var(--text-secondary)'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            style={{ width: '24px', height: '24px', gap: '5px' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={24} color="#C8A45C" />
            ) : (
              <>
                <span
                  className="block w-6 transition-all duration-300"
                  style={{ height: '1px', backgroundColor: '#C8A45C' }}
                />
                <span
                  className="block w-6 transition-all duration-300"
                  style={{ height: '1px', backgroundColor: '#C8A45C' }}
                />
                <span
                  className="block w-6 transition-all duration-300"
                  style={{ height: '1px', backgroundColor: '#C8A45C' }}
                />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
          style={{ backgroundColor: 'rgba(11, 15, 23, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.href)
              }}
              className="font-display text-[32px] uppercase tracking-[0.15em] transition-colors duration-300"
              style={{
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                animationDelay: `${i * 80}ms`,
                fontWeight: 300,
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = 'var(--text-secondary)'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
