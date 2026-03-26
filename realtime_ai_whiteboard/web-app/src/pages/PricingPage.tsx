import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PricingPage.module.css';

const Check = () => (
  <svg className={styles.checkIcon} viewBox="0 0 17 17" fill="none">
    <path
      d="M3 9l4 4 7-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FAQ_DATA = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes are reflected instantly.',
  },
  { q: 'What happens when I hit my AI query limit?', a: '' },
  { q: 'Do you offer educational discounts?', a: '' },
  { q: 'Is my data secure and private?', a: '' },
];

export function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.topNav}>
        <span className={styles.navBrand}>The Infinite Canvas</span>
        <div className={styles.navLinks}>
          <button className={styles.navLink}>Product</button>
          <button className={styles.navLinkActive}>Pricing</button>
          <button className={styles.navLink}>Docs</button>
        </div>
        <div className={styles.navActions}>
          <Link to="/auth" className={styles.loginBtn}>
            Log In
          </Link>
          <Link to="/auth" className={styles.signUpBtn}>
            Sign Up
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Simple, transparent pricing</h1>
          <p className={styles.heroSubtitle}>Start free. Upgrade when you need more.</p>
        </div>

        {/* Billing Toggle */}
        <div className={styles.billingToggle}>
          <span className={styles.billingLabel}>Monthly</span>
          <button
            className={yearly ? styles.toggleTrackActive : styles.toggleTrack}
            onClick={() => setYearly(!yearly)}
          >
            <span className={styles.toggleKnob} />
          </button>
          <span className={styles.billingLabel}>Yearly</span>
          <span className={styles.saveBadge}>SAVE 20%</span>
        </div>

        {/* Cards */}
        <div className={styles.cardsRow}>
          {/* Free */}
          <div className={styles.card}>
            <h3 className={styles.cardName}>Free</h3>
            <div className={styles.cardPrice}>
              <span className={styles.priceAmount}>$0</span>
              <span className={styles.pricePeriod}>/ month</span>
            </div>
            <p className={styles.cardDesc}>For individuals getting started</p>
            <div className={styles.featureList}>
              <div className={styles.feature}>
                <Check />3 boards
              </div>
              <div className={styles.feature}>
                <Check />1 collaborator
              </div>
              <div className={styles.feature}>
                <Check />
                100 AI queries
              </div>
              <div className={styles.feature}>
                <Check />
                Basic tools
              </div>
              <div className={styles.feature}>
                <Check />
                PNG export
              </div>
            </div>
            <button className={styles.cardBtnOutline}>Current Plan</button>
          </div>

          {/* Pro */}
          <div className={styles.cardPro}>
            <span className={styles.popularBadge}>MOST POPULAR</span>
            <h3 className={styles.cardName}>Pro</h3>
            <div className={styles.cardPrice}>
              <span className={styles.priceAmount}>${yearly ? '10' : '12'}</span>
              <span className={styles.pricePeriod}>/ month</span>
            </div>
            <p className={styles.cardDesc}>For teams that collaborate</p>
            <div className={styles.featureList}>
              <div className={styles.featureBold}>
                <Check />
                Everything in Free +
              </div>
              <div className={styles.feature}>
                <Check />
                Unlimited boards
              </div>
              <div className={styles.feature}>
                <Check />
                10 collaborators
              </div>
              <div className={styles.feature}>
                <Check />
                1000 AI queries
              </div>
              <div className={styles.feature}>
                <Check />
                Templates
              </div>
              <div className={styles.feature}>
                <Check />
                SVG+PDF export
              </div>
              <div className={styles.feature}>
                <Check />
                Priority support
              </div>
            </div>
            <button className={styles.cardBtnPrimary}>Upgrade to Pro</button>
          </div>

          {/* Team */}
          <div className={styles.card}>
            <h3 className={styles.cardName}>Team</h3>
            <div className={styles.cardPrice}>
              <span className={styles.priceAmount}>${yearly ? '23' : '29'}</span>
              <span className={styles.pricePeriod}>/ month</span>
            </div>
            <p className={styles.cardDesc}>For organizations at scale</p>
            <div className={styles.featureList}>
              <div className={styles.featureBold}>
                <Check />
                Everything in Pro +
              </div>
              <div className={styles.feature}>
                <Check />
                Unlimited collaborators
              </div>
              <div className={styles.feature}>
                <Check />
                Unlimited AI queries
              </div>
              <div className={styles.feature}>
                <Check />
                Custom templates
              </div>
              <div className={styles.feature}>
                <Check />
                Admin controls
              </div>
              <div className={styles.feature}>
                <Check />
                SSO/SAML
              </div>
              <div className={styles.feature}>
                <Check />
                Dedicated support
              </div>
            </div>
            <button className={styles.cardBtnDark}>Contact Sales</button>
          </div>
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {faq.q}
                  <svg
                    className={openFaq === i ? styles.faqChevronOpen : styles.faqChevron}
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openFaq === i && faq.a && <div className={styles.faqAnswer}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Still not sure? Try free for 14 days.</h2>
          <button className={styles.ctaBtn}>Start Free Trial</button>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBrand}>The Infinite Canvas</div>
            <p className={styles.footerCopy}>
              &copy; 2024 The Infinite Canvas. Designed for Digital Ateliers.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <button className={styles.footerLink}>Privacy Policy</button>
            <button className={styles.footerLink}>Terms of Service</button>
            <button className={styles.footerLink}>Cookie Settings</button>
            <button className={styles.footerLink}>Contact Sales</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
