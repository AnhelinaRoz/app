import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════ HOME PAGE ═══════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroDescRef = useRef<HTMLParagraphElement>(null)
  const heroScrollRef = useRef<HTMLDivElement>(null)

  const physicalRef = useRef<HTMLDivElement>(null)
  const digitalRef = useRef<HTMLDivElement>(null)
  const gppRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  /* ── scroll progress bar ── */
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      progressRef.current.style.width = `${progress * 100}%`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── hero entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // Video fade in
      if (heroVideoRef.current) {
        gsap.set(heroVideoRef.current, { opacity: 0 })
        tl.to(heroVideoRef.current, { opacity: 1, duration: 1.2 }, 0)
      }

      // Title word split animation
      if (heroTitleRef.current) {
        const words = heroTitleRef.current.querySelectorAll('.hero-word')
        gsap.set(words, { y: 60, opacity: 0 })
        tl.to(words, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.3)
      }

      // Subtitle
      if (heroSubRef.current) {
        gsap.set(heroSubRef.current, { y: 20, opacity: 0 })
        tl.to(heroSubRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.6)
      }

      // Descriptor
      if (heroDescRef.current) {
        gsap.set(heroDescRef.current, { y: 20, opacity: 0 })
        tl.to(heroDescRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
      }

      // Scroll indicator
      if (heroScrollRef.current) {
        gsap.set(heroScrollRef.current, { opacity: 0 })
        tl.to(heroScrollRef.current, { opacity: 1, duration: 0.6 }, 1.2)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ── scroll-triggered section animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Physical Assets */
      const physEls = physicalRef.current?.querySelectorAll('.animate-in')
      if (physEls && physEls.length) {
        gsap.set(physEls, { y: 60, opacity: 0 })
        ScrollTrigger.create({
          trigger: physicalRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(physEls, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'expo.out',
            })
          },
        })
      }

      /* Digital Assets */
      const digEls = digitalRef.current?.querySelectorAll('.animate-in')
      if (digEls && digEls.length) {
        gsap.set(digEls, { x: 40, opacity: 0 })
        ScrollTrigger.create({
          trigger: digitalRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(digEls, {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'expo.out',
            })
          },
        })
      }

      /* GPP Section */
      const gppEls = gppRef.current?.querySelectorAll('.animate-in')
      if (gppEls && gppEls.length) {
        gsap.set(gppEls, { y: 60, opacity: 0 })
        ScrollTrigger.create({
          trigger: gppRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(gppEls, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'expo.out',
            })
          },
        })
      }

      /* Product cards stagger */
      const cardEls = productsRef.current?.querySelectorAll('.product-card')
      if (cardEls && cardEls.length) {
        gsap.set(cardEls, { y: 50, opacity: 0 })
        ScrollTrigger.create({
          trigger: productsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cardEls, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'expo.out',
            })
          },
        })
      }

      /* Contact section */
      const contactEls = contactRef.current?.querySelectorAll('.animate-in')
      if (contactEls && contactEls.length) {
        gsap.set(contactEls, { y: 60, opacity: 0 })
        ScrollTrigger.create({
          trigger: contactRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(contactEls, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'expo.out',
            })
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  /* ── form state ── */
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    jurisdiction: '',
    nature: '',
    message: '',
    qualified: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.organisation.trim()) newErrors.organisation = 'Organisation is required'
    if (!formData.jurisdiction.trim()) newErrors.jurisdiction = 'Jurisdiction is required'
    if (!formData.nature) newErrors.nature = 'Please select nature of enquiry'
    if (!formData.qualified) newErrors.qualified = 'Confirmation required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) return
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
        setSubmitted(true)
      }, 1500)
    },
    [validate]
  )

  const handleChange = useCallback(
    (field: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    },
    [errors]
  )

  /* ── gold line draw animation helper ── */
  const GoldLine = ({ width = 60, centered = false }: { width?: number; centered?: boolean }) => (
    <div
      className="gold-line"
      style={{
        width: `${width}px`,
        height: '1px',
        backgroundColor: 'var(--gold)',
        margin: centered ? '32px auto' : '32px 0',
      }}
    />
  )

  /* ═══════════════════════════ RENDER ═══════════════════════════ */
  return (
    <div className="relative">
      {/* Scroll Progress Indicator */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 z-[60] h-[2px]"
        style={{
          backgroundColor: 'var(--gold)',
          width: '0%',
          transition: 'width 0.1s ease-out',
        }}
      />

      {/* ── SECTION 1: HERO ── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: '100dvh' }}
      >
        {/* Video Background */}
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/al.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(11,15,23,0.45) 0%, rgba(11,15,23,0.65) 100%)',
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 text-center px-6"
          style={{ maxWidth: '900px', padding: '0 var(--section-pad-x)' }}
        >
          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="font-display"
            style={{
              fontSize: 'clamp(56px, 8vw, 120px)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              color: 'var(--text-heading)',
            }}
          >
            <span className="hero-word inline-block">KRH</span>{' '}
            <span className="hero-word inline-block">Partnersss</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '0.35em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginTop: '24px',
            }}
          >
            Physical & Digital Commodity Royalties
          </p>

          {/* Descriptor */}
          <p
            ref={heroDescRef}
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.8vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '0.01em',
              color: 'var(--text-primary)',
              maxWidth: '720px',
              margin: '40px auto 0',
            }}
          >
            KRH Partners acquires and manages royalty, streaming, and provenance-IP
            interests across physical precious metals and critical mineral chains — and
            the digital infrastructure that makes them traceable, tradeable, and
            institutionally compliant.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={heroScrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle"
          style={{ opacity: 0 }}
        >
          <ChevronDown size={28} color="#8B8F98" strokeWidth={1} />
        </div>
      </section>

      {/* ── SECTION 2: PHYSICAL ASSETS ── */}
      <section
        id="physical"
        ref={physicalRef}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: 'var(--section-pad-y) var(--section-pad-x)',
        }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-start gap-16 relative"
          style={{ maxWidth: 'var(--content-max)' }}
        >
          {/* Content Left */}
          <div className="flex-1" style={{ maxWidth: '640px' }}>
            <p
              className="animate-in"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              Physical Assets
            </p>

            <h2
              className="animate-in font-display"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                color: 'var(--text-heading)',
              }}
            >
              African Minerals
            </h2>

            <div className="animate-in">
              <GoldLine />
            </div>

            <p
              className="animate-in"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: '0.01em',
                color: 'var(--text-primary)',
                maxWidth: '640px',
              }}
            >
              Physical precious metal and critical mineral royalties, streams, offtakes
              and mine financing across sub-Saharan Africa — structured through Swiss GP
              vehicles, senior to equity, life-of-mine.
            </p>
          </div>

          {/* Decorative Right */}
          <div className="hidden md:flex items-center justify-center flex-1" style={{ minHeight: '300px' }}>
            <span
              className="animate-in font-display select-none"
              style={{
                fontSize: '320px',
                fontWeight: 300,
                color: 'rgba(200, 164, 92, 0.04)',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              M
            </span>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DIGITAL ASSETS ── */}
      <section
        id="digital"
        ref={digitalRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          padding: 'var(--section-pad-y) var(--section-pad-x)',
        }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row-reverse items-start gap-16 relative"
          style={{ maxWidth: 'var(--content-max)' }}
        >
          {/* Content Right */}
          <div className="flex-1" style={{ maxWidth: '640px' }}>
            <p
              className="animate-in"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
             Digital Assets
            </p>

            <h2
              className="animate-in font-display"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                color: 'var(--text-heading)',
              }}
            >
              Swiss Commodity Tech
            </h2>

            <div className="animate-in">
              <GoldLine />
            </div>

            <p
              className="animate-in"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: '0.01em',
                color: 'var(--text-primary)',
                maxWidth: '640px',
              }}
            >
              Digital chain-of-custody traceability and perpetual IP royalties on
              provenance infrastructure — engineered in Crypto Valley Zug, anchored in
              critical minerals, operative across global institutional custody rails.
            </p>
          </div>

          {/* Decorative Left */}
          <div className="hidden md:flex items-center justify-center flex-1" style={{ minHeight: '300px' }}>
            {/* Stylized Swiss circuit cross motif */}
            <svg
              className="animate-in"
              width="240"
              height="240"
              viewBox="0 0 240 240"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M120 20 L120 100 M120 140 L120 220 M20 120 L100 120 M140 120 L220 120"
                stroke="rgba(200, 164, 92, 0.06)"
                strokeWidth="1"
              />
              <circle cx="120" cy="120" r="60" stroke="rgba(200, 164, 92, 0.04)" strokeWidth="1" />
              <circle cx="120" cy="120" r="100" stroke="rgba(200, 164, 92, 0.03)" strokeWidth="1" />
              <circle cx="120" cy="20" r="4" fill="rgba(200, 164, 92, 0.06)" />
              <circle cx="120" cy="220" r="4" fill="rgba(200, 164, 92, 0.06)" />
              <circle cx="20" cy="120" r="4" fill="rgba(200, 164, 92, 0.06)" />
              <circle cx="220" cy="120" r="4" fill="rgba(200, 164, 92, 0.06)" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: GPP© PLATFORM ── */}
      <section
        id="gpp"
        ref={gppRef}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: 'var(--section-pad-y) var(--section-pad-x)',
        }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: '800px' }}>
          <p
            className="animate-in"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '24px',
            }}
          >
            GPP &middot; Gold Passport Platform
          </p>

          <h2
            className="animate-in font-display"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              color: 'var(--text-heading)',
            }}
          >
            GPP&copy;
          </h2>

          <p
            className="animate-in"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: '16px',
            }}
          >
            Gold Passport Platform
          </p>

          <div className="animate-in">
            <GoldLine centered />
          </div>

          <p
            className="animate-in"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '17px',
              fontWeight: 300,
              lineHeight: 1.75,
              letterSpacing: '0.01em',
              color: 'var(--text-primary)',
            }}
          >
            GPP&copy; is the mine-to-market digital provenance layer for African ASGM
            gold. Each gold lot receives a permanent digital identity — a Gold Passport —
            linking origin, mining cooperative, government licence, chain-of-custody
            events, assay certificates, refinery serial number, LBMA bar list
            registration, and vault status.
          </p>
        </div>
      </section>

      {/* ── SECTION 5: THREE PRODUCTS ── */}
      <section
        ref={productsRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '80px var(--section-pad-x) var(--section-pad-y)',
        }}
      >
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: 'var(--content-max)', gap: 'var(--card-gap)' }}
        >
          {/* Card 1: AURUMSTREAM™ */}
          <ProductCard
            title="AURUMSTREAM&trade;"
            description="A digital streaming receipt issued against GPP&copy;-tracked physical gold production. Each receipt represents a contractual entitlement to a defined weight of 4N bullion, convertible to physical bars on demand."
          />

          {/* Card 2: AURUMYIELD™ */}
          <ProductCard
            title="AURUMYIELD&trade;"
            description="An allocated, yield-bearing physical gold product — fully backed by GPP&copy;-traced 4N LBMA bars held in segregated storage at Vault Gate. Each unit represents ownership of a specific serialised bar or fraction."
          />

          {/* Card 3: AURUMCOLLAT™ */}
          <ProductCard
            title="AURUMCOLLAT&trade;"
            description="A collateralised lending facility enabling qualified investors holding GPP&copy;-traced 4N bars to access liquidity without liquidating physical gold. Bars remain in segregated custody at Vault Gate throughout the facility term."
          />
        </div>
      </section>

      {/* ── SECTION 6: CONTACT ── */}
      <section
        id="contact"
        ref={contactRef}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: 'var(--section-pad-y) var(--section-pad-x)',
        }}
      >
        <div
          className="mx-auto flex flex-col lg:flex-row gap-16"
          style={{ maxWidth: 'var(--content-max)' }}
        >
          {/* Left — Form */}
          <div className="flex-1" style={{ maxWidth: '640px' }}>
            <p
              className="animate-in"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              Contact
            </p>

            <h2
              className="animate-in font-display"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                color: 'var(--text-heading)',
              }}
            >
              Institutional Enquiries
            </h2>

            <div className="animate-in">
              <GoldLine />
            </div>

            <p
              className="animate-in"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: '0.01em',
                color: 'var(--text-primary)',
                marginBottom: '48px',
              }}
            >
              KRH Partners is directed exclusively to professional investors and eligible
              counterparties, in accordance with applicable regulatory frameworks. Further
              engagement is subject to standard confidentiality and verification
              procedures.
            </p>

            {submitted ? (
              <div
                className="animate-in text-center py-16"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                }}
              >
                <div
                  className="mx-auto mb-6"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="#5B8C6F" strokeWidth="1.5" />
                  </svg>
                </div>
                Your enquiry has been received. A member of our team will respond in due
                course.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col animate-in" style={{ gap: '24px' }}>
                {/* Name */}
                <div>
                  <label
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full outline-none transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: `1px solid ${errors.name ? 'var(--error)' : 'var(--border-subtle)'}`,
                      borderRadius: '2px',
                      padding: '16px 20px',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => {
                      if (!errors.name)
                        e.target.style.borderColor = 'var(--border-gold)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(200, 164, 92, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.name) e.target.style.borderColor = 'var(--border-subtle)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.name && (
                    <p
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '12px',
                        color: 'var(--error)',
                        marginTop: '6px',
                      }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Organisation */}
                <div>
                  <label
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Organisation
                  </label>
                  <input
                    type="text"
                    placeholder="Organisation name"
                    value={formData.organisation}
                    onChange={(e) => handleChange('organisation', e.target.value)}
                    className="w-full outline-none transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: `1px solid ${errors.organisation ? 'var(--error)' : 'var(--border-subtle)'}`,
                      borderRadius: '2px',
                      padding: '16px 20px',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => {
                      if (!errors.organisation)
                        e.target.style.borderColor = 'var(--border-gold)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(200, 164, 92, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.organisation)
                        e.target.style.borderColor = 'var(--border-subtle)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.organisation && (
                    <p
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '12px',
                        color: 'var(--error)',
                        marginTop: '6px',
                      }}
                    >
                      {errors.organisation}
                    </p>
                  )}
                </div>

                {/* Jurisdiction */}
                <div>
                  <label
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Jurisdiction
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Switzerland, UAE, United Kingdom"
                    value={formData.jurisdiction}
                    onChange={(e) => handleChange('jurisdiction', e.target.value)}
                    className="w-full outline-none transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: `1px solid ${errors.jurisdiction ? 'var(--error)' : 'var(--border-subtle)'}`,
                      borderRadius: '2px',
                      padding: '16px 20px',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => {
                      if (!errors.jurisdiction)
                        e.target.style.borderColor = 'var(--border-gold)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(200, 164, 92, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.jurisdiction)
                        e.target.style.borderColor = 'var(--border-subtle)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  {errors.jurisdiction && (
                    <p
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '12px',
                        color: 'var(--error)',
                        marginTop: '6px',
                      }}
                    >
                      {errors.jurisdiction}
                    </p>
                  )}
                </div>

                {/* Nature of Enquiry */}
                <div className="relative">
                  <label
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Nature of Enquiry
                  </label>
                  <select
                    value={formData.nature}
                    onChange={(e) => handleChange('nature', e.target.value)}
                    className="w-full outline-none transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: `1px solid ${errors.nature ? 'var(--error)' : 'var(--border-subtle)'}`,
                      borderRadius: '2px',
                      padding: '16px 20px',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                      color: formData.nature ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                    onFocus={(e) => {
                      if (!errors.nature)
                        e.target.style.borderColor = 'var(--border-gold)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(200, 164, 92, 0.1)'
                    }}
                    onBlur={(e) => {
                      if (!errors.nature)
                        e.target.style.borderColor = 'var(--border-subtle)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="physical">Physical Royalties</option>
                    <option value="digital">Digital Assets</option>
                    <option value="gpp">GPP Platform</option>
                    <option value="press">Press</option>
                  </select>
                  <ChevronDown
                    size={16}
                    color="#C8A45C"
                    className="absolute right-4 pointer-events-none"
                    style={{ bottom: '18px' }}
                  />
                  {errors.nature && (
                    <p
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '12px',
                        color: 'var(--error)',
                        marginTop: '6px',
                      }}
                    >
                      {errors.nature}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Please describe your enquiry..."
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full outline-none transition-all duration-300 resize-y"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '2px',
                      padding: '16px 20px',
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                      color: 'var(--text-primary)',
                      minHeight: '140px',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--border-gold)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(200, 164, 92, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-subtle)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <span
                      className="flex-shrink-0 flex items-center justify-center transition-all duration-200"
                      style={{
                        width: '18px',
                        height: '18px',
                        border: `1px solid ${errors.qualified ? 'var(--error)' : 'var(--border-subtle)'}`,
                        borderRadius: '2px',
                        backgroundColor: formData.qualified ? 'var(--gold)' : 'transparent',
                        marginTop: '2px',
                      }}
                      onClick={() => handleChange('qualified', !formData.qualified)}
                    >
                      {formData.qualified && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="#0B0F17"
                            strokeWidth="1.5"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      I confirm I am a qualified investor or professional counterparty
                      under applicable law.
                    </span>
                  </label>
                  {errors.qualified && (
                    <p
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '12px',
                        color: 'var(--error)',
                        marginTop: '6px',
                      }}
                    >
                      {errors.qualified}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--gold)',
                    color: '#0B0F17',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '18px 48px',
                    borderRadius: '2px',
                    border: 'none',
                    alignSelf: 'flex-start',
                    opacity: submitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting)
                      (e.target as HTMLElement).style.backgroundColor = 'var(--gold-light)'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--gold)'
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit \u2192'}
                </button>
              </form>
            )}
          </div>

          {/* Right — Info */}
          <div className="hidden lg:flex flex-col items-start flex-1" style={{ paddingTop: '48px' }}>
            {/* Decorative vault motif */}
            <svg
              className="animate-in mb-12"
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="40"
                y="40"
                width="120"
                height="120"
                rx="60"
                stroke="rgba(200, 164, 92, 0.04)"
                strokeWidth="1"
              />
              <circle cx="100" cy="100" r="30" stroke="rgba(200, 164, 92, 0.06)" strokeWidth="1" />
              <rect
                x="95"
                y="70"
                width="10"
                height="60"
                rx="5"
                fill="rgba(200, 164, 92, 0.04)"
              />
              <rect
                x="70"
                y="95"
                width="60"
                height="10"
                rx="5"
                fill="rgba(200, 164, 92, 0.04)"
              />
              <circle cx="100" cy="100" r="8" fill="rgba(200, 164, 92, 0.06)" />
            </svg>

            {/* Contact details */}
            <div className="animate-in">
              <p
                className="font-display"
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  color: 'var(--text-heading)',
                }}
              >
                KRH Partners 
              </p>
               <p
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  marginTop: '12px',
                }}
              >
                Metallstrasse 2
              </p>
              <p
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  marginTop: '12px',
                }}
              >
                6300 Zug
              </p>
               <p
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  marginTop: '12px',
                }}
              >
                Switzerland
              </p>
              {/* <p
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                  marginTop: '8px',
                }}
              >
                CHE-314.445.723
              </p> */}
              

              <div
                style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: 'var(--gold)',
                  margin: '32px 0',
                }}
              />

              <p
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                Qualified Investors Only
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ═══════════════ PRODUCT CARD COMPONENT ═══════════════ */
function ProductCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="product-card group transition-all duration-400"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '2px',
        padding: 'var(--card-pad)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-gold)'
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 8px 32px rgba(200, 164, 92, 0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-subtle)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      <h3
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '24px',
          fontWeight: 500,
          lineHeight: 1.2,
          letterSpacing: '0.08em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <div
        style={{
          width: '40px',
          height: '1px',
          backgroundColor: 'var(--gold)',
          margin: '20px 0',
        }}
      />

      <p
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '15px',
          fontWeight: 300,
          lineHeight: 1.7,
          letterSpacing: '0.01em',
          color: 'var(--text-primary)',
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}
