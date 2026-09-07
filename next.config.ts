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
  { source: '/guides/digital-marketing-for-small-business', destination: '/blog' },
  { source: '/guides/zed-certification-msme-benefits', destination: '/schemes/msme-zed-certification' },
  { source: '/schemes/mahila-udyam-nidhi-scheme', destination: '/schemes/stand-up-india-scheme' },
  { source: '/schemes/tamil-nadu-msme-loan', destination: '/schemes/tamil-nadu-needs-scheme' },
  { source: '/schemes/tamil-nadu-startup-innovation', destination: '/schemes/tamil-nadu-needs-scheme' },
  { source: '/schemes/rajasthan-msme-loan', destination: '/schemes' },
  { source: '/schemes/assam-msme-development', destination: '/schemes' },
  { source: '/schemes/market-access-initiative-scheme', destination: '/schemes' },

  // --- Crawled / indexed legacy URLs with a clear topical match ---
  { source: '/guides/msme-loan-schemes-india', destination: '/schemes' },
  { source: '/guides/cgtmse-loan-collateral-free-credit', destination: '/guides/cgtmse' },
  { source: '/guides/mudra-loan-eligibility-documents-apply', destination: '/guides/mudra-loan' },
  { source: '/guides/pm-employment-generation-programme', destination: '/guides/pmegp-loan' },
  { source: '/guides/trademark-registration-small-business', destination: '/guides' },
  { source: '/schemes/epcg-scheme', destination: '/schemes' },
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
