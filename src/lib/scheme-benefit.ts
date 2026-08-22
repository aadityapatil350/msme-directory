export type SchemeBenefit =
  | {
      kind: 'credit_linked'
      min?: number | null
      max?: number | null
      unit: 'lakh' | 'crore'
      interestRateNote?: string
    }
  | {
      kind: 'subsidy_percent'
      percent_min?: number | null
      percent_max?: number | null
      cap?: number | null
      unit?: 'lakh' | 'crore'
      description?: string
    }
  | {
      kind: 'subsidy_fixed'
      amount: number
      unit: 'lakh' | 'crore'
      description?: string
    }
  | {
      kind: 'certification'
      description: string
      subsidyPercent?: number
    }
  | {
      kind: 'guarantee_cover'
      cover_max?: number | null
      unit: 'crore'
      coveragePercent?: string
    }
  | {
      kind: 'other'
      description: string
    }

export interface FormattedBenefit {
  primaryText: string
  secondaryText?: string
  badgeText: string
}

export function formatSchemeBenefit(
  benefit: SchemeBenefit,
  fallback?: {
    minAmount?: number
    maxAmount?: number
    name?: string
    description?: string
  }
): FormattedBenefit {
  if (!benefit) {
    if (fallback?.maxAmount && fallback.maxAmount > 0) {
      const maxLakh = fallback.maxAmount / 100000
      return {
        primaryText: `Up to ₹${maxLakh >= 100 ? `${(maxLakh / 100).toFixed(1)} Cr` : `${maxLakh} Lakh`}`,
        badgeText: 'Credit / Loan',
      }
    }
    return {
      primaryText: 'Benefit Details on Official Portal',
      badgeText: 'Scheme',
    }
  }

  switch (benefit.kind) {
    case 'credit_linked': {
      const unitStr = benefit.unit === 'crore' ? 'Cr' : 'Lakh'
      const min = benefit.min
      const max = benefit.max

      if (min != null && max != null && max >= min) {
        if (min === max) {
          return {
            primaryText: `₹${min} ${unitStr}`,
            secondaryText: benefit.interestRateNote,
            badgeText: `Loan: ₹${min} ${unitStr}`,
          }
        }
        return {
          primaryText: `₹${min} ${unitStr} – ₹${max} ${unitStr}`,
          secondaryText: benefit.interestRateNote,
          badgeText: `Loan: Up to ₹${max} ${unitStr}`,
        }
      } else if (max != null) {
        return {
          primaryText: `Up to ₹${max} ${unitStr}`,
          secondaryText: benefit.interestRateNote,
          badgeText: `Loan: Up to ₹${max} ${unitStr}`,
        }
      } else if (min != null) {
        return {
          primaryText: `From ₹${min} ${unitStr}`,
          secondaryText: benefit.interestRateNote,
          badgeText: `Loan: From ₹${min} ${unitStr}`,
        }
      }
      return {
        primaryText: 'Credit Facility (Amount per Project DPR)',
        secondaryText: benefit.interestRateNote,
        badgeText: 'Credit Linked',
      }
    }

    case 'subsidy_percent': {
      const pMin = benefit.percent_min
      const pMax = benefit.percent_max
      const cap = benefit.cap
      const unit = benefit.unit || 'lakh'
      const unitStr = unit === 'crore' ? 'Cr' : 'Lakh'

      let pctStr = ''
      if (pMin != null && pMax != null && pMax >= pMin) {
        pctStr = pMin === pMax ? `${pMin}% Subsidy` : `${pMin}% – ${pMax}% Subsidy`
      } else if (pMax != null) {
        pctStr = `Up to ${pMax}% Subsidy`
      } else {
        pctStr = 'Capital Subsidy'
      }

      const capStr = cap != null ? ` (Cap: ₹${cap} ${unitStr})` : ''

      return {
        primaryText: `${pctStr}${capStr}`,
        secondaryText: benefit.description,
        badgeText: pctStr,
      }
    }

    case 'subsidy_fixed': {
      const unitStr = benefit.unit === 'crore' ? 'Cr' : 'Lakh'
      return {
        primaryText: `₹${benefit.amount} ${unitStr} Grant / Subsidy`,
        secondaryText: benefit.description,
        badgeText: `Grant: ₹${benefit.amount} ${unitStr}`,
      }
    }

    case 'certification': {
      return {
        primaryText: benefit.description,
        secondaryText: benefit.subsidyPercent ? `${benefit.subsidyPercent}% fee reimbursement` : undefined,
        badgeText: 'Certification / Subsidy',
      }
    }

    case 'guarantee_cover': {
      const maxStr = benefit.cover_max ? `Up to ₹${benefit.cover_max} Crore` : 'Credit Guarantee Cover'
      const pctStr = benefit.coveragePercent || '75%–85% cover'
      return {
        primaryText: `${maxStr} guarantee cover (${pctStr} for loans up to ₹10 Crore)`,
        secondaryText: 'Collateral-free credit facility through MLIs',
        badgeText: 'Credit Guarantee (₹10 Cr)',
      }
    }

    case 'other':
    default: {
      return {
        primaryText: benefit.description || 'Specialized Scheme Incentive',
        badgeText: 'Government Scheme',
      }
    }
  }
}
