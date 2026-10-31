import type { NextConfig } from 'next'

/**
 * 301 redirects for legacy URLs that were removed in the Aug 2026 rebuild.
 * Sourced from Google Search Console "Not found (404)" + "Crawled – currently
 * not indexed" reports (msmevault.in, Sep 2026). Each old URL points at the
 * closest surviving page so link equity and rankings are preserved.
 */
const legacyRedirects = [
  // --- Not found (404) in GSC ---
  { source: '/guides/working-capital-loan-msme', destination: '/guides/cgtmse' },
  { source: '/guides/small-business-registration-india', destination: '/guides/udyam-registration' },
  { source: '/guides/udyam-registration-complete-guide', destination: '/guides/udyam-registration' },
  { source: '/guides/business-credit-score-cibil-for-msme', destination: '/blog/business-loan-without-collateral-guide' },
  { source: '/guides/msme-women-women-entrepreneur-schemes', destination: '/schemes/stand-up-india-scheme' },
  { source: '/guides/msme-export-benefits-schemes', destination: '/schemes' },
  { source: '/guides/digital-marketing-for-small-business', destination: '/blog/how-to-start-a-digital-marketing-agency-india' },
  { source: '/guides/zed-certification-msme-benefits', destination: '/schemes/msme-zed-certification' },
  { source: '/schemes/mahila-udyam-nidhi-scheme', destination: '/schemes/stand-up-india-scheme' },
  { source: '/schemes/tamil-nadu-msme-loan', destination: '/schemes/tamil-nadu-needs-scheme' },
  { source: '/schemes/tamil-nadu-startup-innovation', destination: '/schemes/tamil-nadu-needs-scheme' },
  { source: '/schemes/rajasthan-msme-loan', destination: '/schemes' },
  { source: '/schemes/assam-msme-development', destination: '/schemes' },
  { source: '/schemes/market-access-initiative-scheme', destination: '/schemes' },

  // --- High-Traffic 404s identified in GSC Top Pages (Sep 2026) ---
  { source: '/guides/how-to-get-business-loan-india', destination: '/loans' },
  { source: '/schemes/zed-certification-scheme', destination: '/schemes/msme-zed-certification' },
  { source: '/schemes/pmfme-scheme', destination: '/schemes/pmfme-food-processing' },
  { source: '/guides/stand-up-india-scheme-complete-guide', destination: '/schemes/stand-up-india-scheme' },
  { source: '/guides/business-loan-vs-mudra-loan-comparison', destination: '/guides/mudra-loan' },
  { source: '/guides/clcss-scheme-interest-subsidy', destination: '/schemes' },
  { source: '/schemes/pmegp', destination: '/schemes/pmegp-scheme' },
  { source: '/schemes/cgtmse-credit-guarantee-fund', destination: '/schemes/cgtmse-credit-guarantee' },
  // NOTE: this used to redirect to /schemes/maharashtra-solar-pump, which was
  // never actually built — that destination 404s. The real content lives on
  // the blog post below. This single fix recovers ~110 clicks/yr (GSC Oct 2026).
  { source: '/maharashtra-solar-pump', destination: '/blog/maharashtra-saur-krushi-pump-yojana-complete-guide' },
  { source: '/schemes/maharashtra-solar-pump', destination: '/blog/maharashtra-saur-krushi-pump-yojana-complete-guide' },
  { source: '/msme-classification-2026', destination: '/guides/msme-classification-2026' },
  { source: '/blog/udyam-vs-udyog-aadhar-comparison', destination: '/blog/udyam-vs-udyog-aadhaar-comparison' },

  // --- High-Traffic 404s identified in GSC Top Pages (Oct 2026 pull) ---
  { source: '/guides/msme-payment-delayed-interest-act', destination: '/blog/msme-45-days-payment-rule-section-43b-h' },

  // --- Real central/state schemes that used to have pages; no current
  //     equivalent exists yet, so point at the schemes index rather than a
  //     dead end. Strong candidates to turn into real pages later: ECLGS and
  //     SIDBI SMILE both have meaningful standalone search demand. ---
  { source: '/schemes/atal-innovation-mission', destination: '/schemes' },
  { source: '/schemes/mse-cluster-development', destination: '/schemes' },
  { source: '/schemes/maharashtra-msfc-loan', destination: '/schemes' },
  { source: '/schemes/karnataka-msme-loan', destination: '/schemes' },
  { source: '/schemes/west-bengal-msme-loan', destination: '/schemes' },
  { source: '/schemes/pli-textiles', destination: '/schemes' },
  { source: '/schemes/andhra-pradesh-msme-support', destination: '/schemes' },
  { source: '/schemes/jharkhand-msme-financial', destination: '/schemes' },
  { source: '/schemes/eclgs-scheme', destination: '/schemes' },
  { source: '/schemes/sidbi-smile-loan', destination: '/schemes' },
  { source: '/schemes/madhya-pradesh-msme-loan', destination: '/schemes' },
  { source: '/schemes/sfurti-khadi-clusters', destination: '/schemes' },
  { source: '/schemes/telangana-thub-startup', destination: '/schemes' },
  { source: '/schemes/aspire-scheme', destination: '/schemes' },
  { source: '/schemes/punjab-msme-loan-subsidy', destination: '/schemes' },
  { source: '/schemes/cgssd-scheme', destination: '/schemes' },
  { source: '/schemes/nidhi-scheme', destination: '/schemes' },
  { source: '/schemes/gujarat-biotechnology-startup', destination: '/schemes' },

  // --- Retired generic small-business-advice posts (pre-Aug 2026 rebuild);
  //     re-pointed directly to our fresh authoritative articles for maximum link equity. ---
  { source: '/blog/msme-ecommerce-selling-online', destination: '/blog/how-to-start-an-online-business-in-india' },
  { source: '/blog/profitable-service-business-ideas-india', destination: '/blog/service-business-ideas-low-investment-india' },
  { source: '/blog/working-from-home-business-ideas', destination: '/blog/small-business-ideas-under-50000-india' },
  { source: '/blog/rural-business-ideas-india', destination: '/blog/rural-business-ideas-government-subsidy' },
  { source: '/blog/business-plan-template-india', destination: '/blog/pmegp-project-report-dpr-format' },
  { source: '/blog/msme-social-media-marketing-guide', destination: '/blog/how-to-start-a-digital-marketing-agency-india' },
  { source: '/blog/msme-franchise-opportunities-india', destination: '/blog/ev-charging-station-business-cost-india' },
  { source: '/blog/msme-sector-india-statistics-trends', destination: '/blog' },
  { source: '/blog/msme-pricing-strategy-guide', destination: '/blog' },
  { source: '/blog/msme-sustainability-green-manufacturing', destination: '/blog/zed-certification-msme-benefits-free' },
  { source: '/blog/how-to-scale-small-business-india', destination: '/blog' },
  { source: '/blog/online-business-ideas-zero-investment', destination: '/blog/digital-products-to-sell-online-india' },
  { source: '/blog/msme-partnership-collaboration-tips', destination: '/blog' },
  { source: '/blog/financial-planning-small-business-india', destination: '/blog' },
  { source: '/blog/business-automation-tools-msme', destination: '/blog/best-ai-tools-for-indian-small-businesses' },
  { source: '/blog/msme-marketing-strategies-low-budget', destination: '/blog' },
  { source: '/blog/msme-digital-transformation-guide', destination: '/blog' },
  { source: '/blog/msme-branding-strategies', destination: '/blog' },
  { source: '/blog/msme-succession-planning-guide', destination: '/blog' },
  { source: '/blog/cashflow-management-small-business', destination: '/blog' },
  { source: '/blog/best-business-ideas-india-2025', destination: '/blog' },
  { source: '/blog/inventory-management-small-business', destination: '/blog' },
  { source: '/blog/msme-crisis-management-guide', destination: '/blog' },
  { source: '/blog/customer-service-excellence-small-business', destination: '/blog' },
  { source: '/blog/msme-hiring-recruitment-tips', destination: '/blog' },
  { source: '/blog/msme-export-guide-beginners', destination: '/blog' },

  // --- Crawled Unlisted Consultant Cities ---
  { source: '/consultants/nagpur', destination: '/consultants' },
  { source: '/consultants/mysore', destination: '/consultants' },
  { source: '/consultants/indore', destination: '/consultants' },
  { source: '/consultants/chandigarh', destination: '/consultants' },
  { source: '/consultants/ludhiana', destination: '/consultants' },

  // --- Crawled / indexed legacy URLs with a clear topical match ---
  { source: '/guides/msme-loan-schemes-india', destination: '/schemes' },
  { source: '/guides/cgtmse-loan-collateral-free-credit', destination: '/guides/cgtmse' },
  { source: '/guides/mudra-loan-eligibility-documents-apply', destination: '/guides/mudra-loan' },
  { source: '/guides/pm-employment-generation-programme', destination: '/guides/pmegp-loan' },
  { source: '/guides/trademark-registration-small-business', destination: '/guides' },
  { source: '/schemes/epcg-scheme', destination: '/schemes' },

  // --- High-Intent Tool Aliases (capturing GSC queries & llms.txt endpoints) ---
  { source: '/tools/mudra-loan-calculator', destination: '/tools/emi-calculator' },
  { source: '/tools/cgtmse-loan-calculator', destination: '/tools/emi-calculator' },
  { source: '/tools/cgtmse-loan-emi-calculator', destination: '/tools/emi-calculator' },
  { source: '/tools/msme-subsidy-calculator', destination: '/tools/subsidy-calculator' },
  { source: '/tools/pmegp-subsidy-calculator', destination: '/tools/subsidy-calculator' },
]

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
      // Browsers and Googlebot request /favicon.ico literally.
      { source: '/favicon.ico', destination: '/icon.svg', permanent: true },
    ]
  },
}

export default nextConfig
