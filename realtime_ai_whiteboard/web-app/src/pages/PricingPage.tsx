import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DemoTooltip } from '../components/DemoTooltip';
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

export function PricingPage() {
  const { t } = useTranslation();
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const FAQ_DATA = [
    {
      q: t('pricing.faqQ1'),
      a: t('pricing.faqA1'),
    },
    { q: t('pricing.faqQ2'), a: t('pricing.faqA2') },
    { q: t('pricing.faqQ3'), a: t('pricing.faqA3') },
    { q: t('pricing.faqQ4'), a: t('pricing.faqA4') },
  ];

  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.topNav}>
        <span className={styles.navBrand}>{t('pricing.footerBrand')}</span>
        <div className={styles.navLinks}>
          <button className={styles.navLink}>{t('pricing.navProduct')}</button>
          <button className={styles.navLinkActive}>{t('pricing.navPricing')}</button>
          <button className={styles.navLink}>{t('pricing.navDocs')}</button>
        </div>
        <div className={styles.navActions}>
          <Link to="/auth" className={styles.loginBtn}>
            {t('pricing.logIn')}
          </Link>
          <Link to="/auth" className={styles.signUpBtn}>
            {t('pricing.signUp')}
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>{t('pricing.title')}</h1>
          <p className={styles.heroSubtitle}>{t('pricing.subtitle')}</p>
        </div>

        {/* Billing Toggle */}
        <div className={styles.billingToggle}>
          <span className={styles.billingLabel}>{t('pricing.monthly')}</span>
          <button
            className={yearly ? styles.toggleTrackActive : styles.toggleTrack}
            onClick={() => setYearly(!yearly)}
          >
            <span className={styles.toggleKnob} />
          </button>
          <span className={styles.billingLabel}>{t('pricing.yearly')}</span>
          <span className={styles.saveBadge}>{t('pricing.save20')}</span>
        </div>

        {/* Cards */}
        <div className={styles.cardsRow}>
          {/* Free */}
          <div className={styles.card}>
            <h3 className={styles.cardName}>{t('pricing.free')}</h3>
            <div className={styles.cardPrice}>
              <span className={styles.priceAmount}>$0</span>
              <span className={styles.pricePeriod}>{t('pricing.perMonth')}</span>
            </div>
            <p className={styles.cardDesc}>{t('pricing.freeDesc')}</p>
            <div className={styles.featureList}>
              <div className={styles.feature}>
                <Check />
                {t('pricing.boards3')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.collab1')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.ai100')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.basicTools')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.pngExport')}
              </div>
            </div>
            <DemoTooltip message={t('demo.planRequired')}>
              <button className={styles.cardBtnOutline}>{t('pricing.currentPlan')}</button>
            </DemoTooltip>
          </div>

          {/* Pro */}
          <div className={styles.cardPro}>
            <span className={styles.popularBadge}>{t('pricing.mostPopular')}</span>
            <h3 className={styles.cardName}>{t('pricing.pro')}</h3>
            <div className={styles.cardPrice}>
              <span className={styles.priceAmount}>${yearly ? '10' : '12'}</span>
              <span className={styles.pricePeriod}>{t('pricing.perMonth')}</span>
            </div>
            <p className={styles.cardDesc}>{t('pricing.proDesc')}</p>
            <div className={styles.featureList}>
              <div className={styles.featureBold}>
                <Check />
                {t('pricing.everythingFree')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.unlimitedBoards')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.collab10')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.ai1000')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.templates')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.svgPdfExport')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.prioritySupport')}
              </div>
            </div>
            <DemoTooltip message={t('demo.upgradeRequired')}>
              <button className={styles.cardBtnPrimary}>{t('pricing.upgradePro')}</button>
            </DemoTooltip>
          </div>

          {/* Team */}
          <div className={styles.card}>
            <h3 className={styles.cardName}>{t('pricing.teamPlan')}</h3>
            <div className={styles.cardPrice}>
              <span className={styles.priceAmount}>${yearly ? '23' : '29'}</span>
              <span className={styles.pricePeriod}>{t('pricing.perMonth')}</span>
            </div>
            <p className={styles.cardDesc}>{t('pricing.teamDesc')}</p>
            <div className={styles.featureList}>
              <div className={styles.featureBold}>
                <Check />
                {t('pricing.everythingPro')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.unlimitedCollab')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.unlimitedAi')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.customTemplates')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.adminControls')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.ssoSaml')}
              </div>
              <div className={styles.feature}>
                <Check />
                {t('pricing.dedicatedSupport')}
              </div>
            </div>
            <DemoTooltip message={t('demo.contactRequired')}>
              <button className={styles.cardBtnDark}>{t('pricing.contactSales')}</button>
            </DemoTooltip>
          </div>
        </div>

        {/* FAQ */}
        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>{t('pricing.faqTitle')}</h2>
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
          <h2 className={styles.ctaTitle}>{t('pricing.ctaTitle')}</h2>
          <DemoTooltip message={t('demo.trialRequired')}>
            <button className={styles.ctaBtn}>{t('pricing.ctaBtn')}</button>
          </DemoTooltip>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBrand}>{t('pricing.footerBrand')}</div>
            <p className={styles.footerCopy}>{t('pricing.footerCopy')}</p>
          </div>
          <div className={styles.footerLinks}>
            <button className={styles.footerLink}>{t('pricing.privacyPolicy')}</button>
            <button className={styles.footerLink}>{t('pricing.termsOfService')}</button>
            <button className={styles.footerLink}>{t('pricing.cookieSettings')}</button>
            <button className={styles.footerLink}>{t('pricing.contactSales')}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
