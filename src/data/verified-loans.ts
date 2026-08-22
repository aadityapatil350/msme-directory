export interface VerifiedLoan {
  id: string
  slug: string
  name: string
  provider: string
  providerType: 'psu-bank' | 'private-bank' | 'nbfc' | 'fintech'
  category: 'mudra' | 'business' | 'working-capital' | 'collateral-free'
  minAmount: number
  maxAmount: number
  interestRateMin: number
  interestRateMax: number
  interestRateNote: string
  tenure: string
  collateralRequired: boolean
  processingFee: string
  features: string[]
  applyUrl: string
  lastVerified: string
}

export const VERIFIED_LOANS: VerifiedLoan[] = [
  {
    id: 'loan_sbi_sme',
    slug: 'sbi-sme-simplified-business-loan',
    name: 'SBI Simplified SME Business Loan',
    provider: 'State Bank of India (SBI)',
    providerType: 'psu-bank',
    category: 'business',
    minAmount: 1000000,
    maxAmount: 50000000,
    interestRateMin: 9.25,
    interestRateMax: 11.75,
    interestRateNote: 'EBLR linked (EBLR + spread based on internal MSME risk score)',
    tenure: 'Up to 60 Months (5 Years)',
    collateralRequired: true,
    processingFee: '0.50% to 1.00% + GST',
    features: [
      'Competitive PSU interest rates linked to RBI repo/EBLR',
      'Term loan and cash credit (CC) facility for working capital',
      'Eligible for CGTMSE guarantee cover (if eligible)',
    ],
    applyUrl: 'https://sbi.co.in/web/business/sme',
    lastVerified: '22 Aug 2026',
  },
  {
    id: 'loan_sbi_mudra',
    slug: 'sbi-e-mudra-loan',
    name: 'SBI e-Mudra Shishu &amp; Kishor Loan',
    provider: 'State Bank of India (SBI)',
    providerType: 'psu-bank',
    category: 'mudra',
    minAmount: 50000,
    maxAmount: 1000000,
    interestRateMin: 9.75,
    interestRateMax: 10.5,
    interestRateNote: 'Concessional rates for micro entrepreneurs under PMMY guidelines',
    tenure: '36 to 60 Months',
    collateralRequired: false,
    processingFee: 'Nil for Shishu; nominal for Kishor/Tarun',
    features: [
      'Instant digital in-principle approval via JanSamarth/SBI portal',
      'No collateral or third-party guarantee required',
      'Mudra Debit Card issued for working capital withdrawals',
    ],
    applyUrl: 'https://emudra.sbi.co.in',
    lastVerified: '22 Aug 2026',
  },
  {
    id: 'loan_hdfc_msme',
    slug: 'hdfc-business-growth-loan',
    name: 'HDFC Bank Business Growth Loan',
    provider: 'HDFC Bank',
    providerType: 'private-bank',
    category: 'collateral-free',
    minAmount: 500000,
    maxAmount: 7500000,
    interestRateMin: 11.9,
    interestRateMax: 16.5,
    interestRateNote: 'Fixed/Floating based on business vintage and credit assessment',
    tenure: '12 to 48 Months',
    collateralRequired: false,
    processingFee: 'Up to 2.00% + GST',
    features: [
      'Unsecured business loan with fast approval in 48 hours',
      'Doorstep and digital document verification',
      'Overdraft (OD) against business turnover available',
    ],
    applyUrl: 'https://www.hdfcbank.com/sme',
    lastVerified: '22 Aug 2026',
  },
  {
    id: 'loan_icici_unsecured',
    slug: 'icici-business-instalment-loan',
    name: 'ICICI Bank Business Instalment Loan',
    provider: 'ICICI Bank',
    providerType: 'private-bank',
    category: 'collateral-free',
    minAmount: 300000,
    maxAmount: 5000000,
    interestRateMin: 12.0,
    interestRateMax: 17.0,
    interestRateNote: 'Risk-based pricing determined by GST banking analytics',
    tenure: '12 to 60 Months',
    collateralRequired: false,
    processingFee: 'Up to 2.25% + GST',
    features: [
      'End-to-end digital journey via InstaBIZ platform',
      'Pre-approved overdraft limits for existing current account holders',
      'Flexible repayment options with zero hidden charges',
    ],
    applyUrl: 'https://www.icicibank.com/business-banking',
    lastVerified: '22 Aug 2026',
  },
  {
    id: 'loan_tata_capital',
    slug: 'tata-capital-msme-business-loan',
    name: 'Tata Capital MSME Term Loan',
    provider: 'Tata Capital Financial Services',
    providerType: 'nbfc',
    category: 'business',
    minAmount: 500000,
    maxAmount: 9000000,
    interestRateMin: 13.5,
    interestRateMax: 19.0,
    interestRateNote: 'Fixed interest rates assessed on cash flows &amp; CIBIL score',
    tenure: '12 to 60 Months',
    collateralRequired: false,
    processingFee: 'Up to 2.50% + GST',
    features: [
      'Quick loan sanction based on banking statements & GST returns',
      'Customized structured EMI plans for seasonal businesses',
      'No property collateral needed up to ₹90 Lakh',
    ],
    applyUrl: 'https://www.tatacapital.com/business-loan.html',
    lastVerified: '22 Aug 2026',
  },
  {
    id: 'loan_lendingkart',
    slug: 'lendingkart-digital-msme-loan',
    name: 'Lendingkart Digital MSME Loan',
    provider: 'Lendingkart Finance',
    providerType: 'fintech',
    category: 'collateral-free',
    minAmount: 100000,
    maxAmount: 4000000,
    interestRateMin: 15.0,
    interestRateMax: 24.0,
    interestRateNote: 'Monthly reducing balance; rates determined by proprietary AI score',
    tenure: '6 to 36 Months',
    collateralRequired: false,
    processingFee: '2.00% to 3.00% + GST',
    features: [
      '100% paperless application with disbursal in 24 to 72 hours',
      'Minimum business vintage: 6 months; minimum turnover: ₹12 Lakh/year',
      'Zero branch visits required',
    ],
    applyUrl: 'https://www.lendingkart.com',
    lastVerified: '22 Aug 2026',
  },
  {
    id: 'loan_flexiloans',
    slug: 'flexiloans-unsecured-business-loan',
    name: 'FlexiLoans MSME Line of Credit',
    provider: 'FlexiLoans Technologies',
    providerType: 'fintech',
    category: 'working-capital',
    minAmount: 100000,
    maxAmount: 5000000,
    interestRateMin: 14.5,
    interestRateMax: 22.0,
    interestRateNote: 'Pay interest only on funds utilized from the approved credit line',
    tenure: '12 to 36 Months',
    collateralRequired: false,
    processingFee: '2.00% + GST',
    features: [
      'Revolving line of credit for vendor payouts and raw material procurement',
      'Integration with major e-commerce seller accounts & POS terminals',
      'Minimal documentation: GSTIN, PAN, and 6 months bank statement',
    ],
    applyUrl: 'https://www.flexiloans.com',
    lastVerified: '22 Aug 2026',
  },
]
