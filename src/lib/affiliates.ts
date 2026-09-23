/**
 * Centralized affiliate partner links and configurations.
 * 
 * When your affiliate networks (e.g., Lendingkart Partner Program, Cuelinks,
 * Paisabazaar, BankBazaar) approve your account, simply set the corresponding
 * environment variable in your .env or Vercel dashboard:
 * 
 * NEXT_PUBLIC_AFFILIATE_LENDINGKART_URL="https://cuelinks.com/..."
 * NEXT_PUBLIC_AFFILIATE_PAISABAZAAR_URL="https://cuelinks.com/..."
 * NEXT_PUBLIC_AFFILIATE_TATACAPITAL_URL="https://cuelinks.com/..."
 */

export interface AffiliatePartner {
  id: string
  name: string
  provider: string
  badge: string
  loanAmount: string
  interestRate: string
  disbursalTime: string
  minTurnover: string
  features: string[]
  affiliateUrl: string
  isAffiliateActive: boolean
}

export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'lendingkart',
    name: 'Lendingkart Digital MSME Loan',
    provider: 'Lendingkart Finance',
    badge: '100% Digital • No Collateral',
    loanAmount: '₹1 Lakh to ₹40 Lakh',
    interestRate: 'From 1.25%/month (15% p.a.)',
    disbursalTime: '24–72 Hours',
    minTurnover: '₹12 Lakh / year',
    features: [
      'Zero physical branch visits required',
      'Min. 6 months business vintage',
      'Assessment via GST & bank statement upload',
    ],
    affiliateUrl:
      process.env.NEXT_PUBLIC_AFFILIATE_LENDINGKART_URL ||
      'https://www.lendingkart.com',
    isAffiliateActive: Boolean(process.env.NEXT_PUBLIC_AFFILIATE_LENDINGKART_URL),
  },
  {
    id: 'tata_capital',
    name: 'Tata Capital MSME Business Loan',
    provider: 'Tata Capital Financial Services',
    badge: 'High Limit • Trusted NBFC',
    loanAmount: 'Up to ₹90 Lakh',
    interestRate: 'From 13.5% p.a.',
    disbursalTime: '3–5 Business Days',
    minTurnover: '₹15 Lakh / year',
    features: [
      'Structured EMI for seasonal manufacturers',
      'No property collateral needed up to ₹90L',
      'Flexible tenure up to 5 years',
    ],
    affiliateUrl:
      process.env.NEXT_PUBLIC_AFFILIATE_TATACAPITAL_URL ||
      'https://www.tatacapital.com/business-loan.html',
    isAffiliateActive: Boolean(process.env.NEXT_PUBLIC_AFFILIATE_TATACAPITAL_URL),
  },
  {
    id: 'paisabazaar',
    name: 'Compare 30+ MSME Lenders Online',
    provider: 'Paisabazaar MSME Marketplace',
    badge: 'Compare Rates • Instant Offers',
    loanAmount: '₹50,000 to ₹1 Crore',
    interestRate: 'From 10.5% p.a.',
    disbursalTime: 'Same Day Pre-Approval',
    minTurnover: '₹6 Lakh / year',
    features: [
      'Check offers across 30+ banks & NBFCs',
      'No impact on CIBIL score for rate check',
      'Compare unsecured & machinery loans',
    ],
    affiliateUrl:
      process.env.NEXT_PUBLIC_AFFILIATE_PAISABAZAAR_URL ||
      'https://www.paisabazaar.com/business-loan/',
    isAffiliateActive: Boolean(process.env.NEXT_PUBLIC_AFFILIATE_PAISABAZAAR_URL),
  },
]
