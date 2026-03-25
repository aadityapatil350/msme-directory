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

async function checkLoans() {
  try {
    await prisma.$connect()

    const count = await prisma.loan.count()
    const loans = await prisma.loan.findMany({
      select: { provider: true, interestRateMin: true, isSponsored: true },
      orderBy: [{ isSponsored: 'desc' }, { interestRateMin: 'asc' }],
    })

    console.log(`\n✅ Total Loans in Database: ${count}\n`)
    console.log('All Lenders (sorted by sponsored, then interest rate):\n')

    loans.forEach((l, i) => {
      const sponsor = l.isSponsored ? '⭐' : '  '
      console.log(`${sponsor} ${(i + 1).toString().padStart(2)}. ${l.provider.padEnd(40)} - From ${l.interestRateMin}%`)
    })

    console.log(`\n✅ Verification: ${count === 22 ? 'PASSED' : 'FAILED'} - Expected 22, Got ${count}`)

    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

checkLoans()
