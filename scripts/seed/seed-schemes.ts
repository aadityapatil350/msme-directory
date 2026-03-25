import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { config } from 'dotenv'
import { CENTRAL_SCHEMES, STATE_SCHEMES, LOAN_PROVIDERS } from './schemes-data'

// Load environment variables
config({ path: '.env.local' })

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  database: 'postgres',
})

// Create Prisma driver adapter
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function seedSchemes() {
  console.log('🌱 Seeding MSME Schemes...')

  // Seed Central Schemes
  console.log('  Seeding central schemes...')
  for (const scheme of CENTRAL_SCHEMES) {
    try {
      // Check if scheme already exists
      const existing = await prisma.scheme.findUnique({
        where: { slug: scheme.slug }
      })

      if (!existing) {
        await prisma.scheme.create({
          data: {
            name: scheme.name,
            slug: scheme.slug,
            shortDescription: scheme.shortDescription,
            description: scheme.description,
            type: scheme.type,
            state: scheme.state,
            sector: scheme.sector,
            minAmount: scheme.minAmount,
            maxAmount: scheme.maxAmount,
            eligibility: scheme.eligibility,
            documents: scheme.documents,
            applyUrl: scheme.applyUrl,
            benefits: scheme.benefits,
            isActive: scheme.isActive,
            isFeatured: scheme.isFeatured,
            isSponsored: scheme.isSponsored,
            sponsoredUntil: scheme.sponsoredUntil,
            viewCount: scheme.viewCount,
          },
        })
        console.log(`    ✅ Seeded: ${scheme.name}`)
      } else {
        console.log(`    ⏭️  Skipped (exists): ${scheme.name}`)
      }
    } catch (error) {
      console.error(`    ❌ Error seeding ${scheme.name}:`, error)
    }
  }

  // Seed State Schemes
  console.log('  Seeding state schemes...')
  for (const scheme of STATE_SCHEMES) {
    try {
      const existing = await prisma.scheme.findUnique({
        where: { slug: scheme.slug }
      })

      if (!existing) {
        await prisma.scheme.create({
          data: {
            name: scheme.name,
            slug: scheme.slug,
            shortDescription: scheme.shortDescription,
            description: scheme.description,
            type: scheme.type,
            state: scheme.state,
            sector: scheme.sector,
            minAmount: scheme.minAmount,
            maxAmount: scheme.maxAmount,
            eligibility: scheme.eligibility,
            documents: scheme.documents,
            applyUrl: scheme.applyUrl,
            benefits: scheme.benefits,
            isActive: scheme.isActive,
            isFeatured: scheme.isFeatured,
            isSponsored: scheme.isSponsored,
            sponsoredUntil: scheme.sponsoredUntil,
            viewCount: scheme.viewCount,
          },
        })
        console.log(`    ✅ Seeded: ${scheme.name}`)
      } else {
        console.log(`    ⏭️  Skipped (exists): ${scheme.name}`)
      }
    } catch (error) {
      console.error(`    ❌ Error seeding ${scheme.name}:`, error)
    }
  }

  console.log(`✅ Schemes seeding completed!`)
}

async function seedLoanProviders() {
  console.log('💰 Seeding Loan Providers...')

  for (const loan of LOAN_PROVIDERS) {
    try {
      const existing = await prisma.loan.findUnique({
        where: { slug: loan.slug }
      })

      if (!existing) {
        await prisma.loan.create({
          data: {
            name: loan.name,
            slug: loan.slug,
            provider: loan.provider,
            providerLogo: loan.providerLogo,
            type: loan.type,
            minAmount: loan.minAmount,
            maxAmount: loan.maxAmount,
            interestRateMin: loan.interestRateMin,
            interestRateMax: loan.interestRateMax,
            tenure: loan.tenure,
            eligibility: loan.eligibility,
            documents: loan.documents,
            features: loan.features,
            affiliateUrl: loan.affiliateUrl,
            isSponsored: loan.isSponsored || false,
            viewCount: loan.viewCount || 0,
          },
        })
        console.log(`    ✅ Seeded: ${loan.name}`)
      } else {
        console.log(`    ⏭️  Skipped (exists): ${loan.name}`)
      }
    } catch (error) {
      console.error(`    ❌ Error seeding ${loan.name}:`, error)
    }
  }

  console.log(`✅ Loan providers seeding completed!`)
}

async function main() {
  try {
    console.log('🚀 Starting database seeding...')
    console.log('')

    // Check if database connection is working
    await prisma.$connect()
    console.log('✅ Database connected')

    console.log('')

    // Seed Schemes
    await seedSchemes()

    console.log('')

    // Seed Loan Providers
    await seedLoanProviders()

    console.log('')

    console.log('🎉 All seeding completed successfully!')
    console.log('')
    console.log('📊 Summary:')
    console.log(`  - Central Schemes: ${CENTRAL_SCHEMES.length}`)
    console.log(`  - State Schemes: ${STATE_SCHEMES.length}`)
    console.log(`  - Total Schemes: ${CENTRAL_SCHEMES.length + STATE_SCHEMES.length}`)
    console.log(`  - Loan Providers: ${LOAN_PROVIDERS.length}`)

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
