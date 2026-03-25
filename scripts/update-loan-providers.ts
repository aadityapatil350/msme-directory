// Script to update loan providers with accurate 2024-2025 data
// Verified from official sources and aggregator websites

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { config } from 'dotenv'

config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  database: 'postgres',
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function updateLoanProviders() {
  try {
    await prisma.$connect()
    console.log('🔄 Updating loan providers with 2024-2025 data...\n')

    let updateCount = 0

    // 1. Lendingkart - Update with current rates
    await prisma.loan.update({
      where: { slug: 'lendingkart' },
      data: {
        minAmount: 50000,
        maxAmount: 20000000, // Up to ₹2 crore
        interestRateMin: 13.5,
        interestRateMax: 35,
        tenure: '12-36 months',
        eligibility: 'Business operational for 6+ months (3 months for working capital). Minimum turnover ₹90,000 in last 3 months. Age 18-65 years. Credit score 650+. Not blacklisted.',
        features: ['Collateral-free loans', 'Quick approval within 48 hours', 'Processing fee 1-2% only', 'Flexible repayment options', 'Online application process'],
      },
    })
    console.log('✅ Updated: Lendingkart (₹50K-₹2Cr, 13.5-35%)')
    updateCount++

    // 2. NeoGrowth - Update with current information
    await prisma.loan.update({
      where: { slug: 'neogrowth' },
      data: {
        minAmount: 100000,
        maxAmount: 15000000, // ₹1.5 crore
        interestRateMin: 13,
        interestRateMax: 24,
        tenure: '6-36 months',
        eligibility: 'Business 18+ months old. Turnover ₹50 lakh+. Positive cash flow required. Age 21-65 years. Manufacturing, trading, or service sector.',
        features: ['Collateral-free financing', 'Funding in 3 working days via AdvanceSuite', 'Daily/Weekly/Monthly repayment options', 'No prepayment charges', 'Flexible EMI structures'],
      },
    })
    console.log('✅ Updated: NeoGrowth (₹1L-₹1.5Cr, 13-24%)')
    updateCount++

    // 3. HDFC Bank - Update with current MSME rates
    await prisma.loan.update({
      where: { slug: 'hdfc-business-loan' },
      data: {
        minAmount: 500000,
        maxAmount: 5000000,
        interestRateMin: 10.75,
        interestRateMax: 22.5,
        tenure: '12-60 months',
        eligibility: 'Business turnover minimum ₹40 lakh. 3 years in current business, 5 years total business experience. Profit-making for 2 years. ITR ₹1.5 lakh+. Age 21-65 years. Udyam registration for NIL processing fee benefit.',
        features: ['NIL processing fee with Udyam certificate (loans up to ₹5L)', 'Competitive interest rates from 10.75%', 'Quick approval process', 'Reputed banking partner', 'Flexible tenure up to 5 years'],
      },
    })
    console.log('✅ Updated: HDFC Bank (₹5L-₹50L, 10.75-22.5%)')
    updateCount++

    console.log(`\n✅ Successfully updated ${updateCount} loan providers!`)
    console.log('\n📊 Summary of Updates:')
    console.log('  • Lendingkart: ₹50K-₹2Cr, rates 13.5-35%, 6+ months operation')
    console.log('  • NeoGrowth: ₹1L-₹1.5Cr, rates 13-24%, 3-day funding')
    console.log('  • HDFC Bank: ₹5L-₹50L, rates 10.75-22.5%, NIL fee with Udyam')

    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

updateLoanProviders()
