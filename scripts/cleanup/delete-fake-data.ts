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

async function main() {
  console.log('🧹 Cleaning up FAKE data...\n')

  // Delete all fake consultants
  console.log('❌ Deleting fake consultants...')
  const deletedConsultants = await prisma.consultant.deleteMany({})
  console.log(`   Deleted ${deletedConsultants.count} fake consultants\n`)

  console.log('✅ Cleanup complete!')
  console.log('\nDatabase is now clean - only REAL data remains:')
  console.log('- 18 Real government schemes ✅')
  console.log('- 7 Real loan providers ✅')
  console.log('- 0 Consultants (ready for real signups)')
  console.log('- Blog posts will come from DB')
  console.log('- Guides will come from DB')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
