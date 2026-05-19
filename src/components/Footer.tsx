export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '48px var(--section-pad-x)',
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 'var(--content-max)' }}>
        {/* Primary line */}
        <p
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)',
          }}
        >
          KRH Partners GP &middot; Zug, Switzerland &middot; CHE-314.445.723 
        </p>

        {/* Divider */}
        <div
          className="mx-auto"
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--gold)',
            margin: '24px auto',
          }}
        />

        {/* Disclaimer */}
        <p
          className="mx-auto"
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '800px',
          }}
        >
          Nothing on this website constitutes an offer to sell, a solicitation of an offer to buy, or a recommendation for any investment product. Access restricted to qualified investors under applicable Swiss, EU, and UAE securities law.
        </p>
      </div>
    </footer>
  )
}
