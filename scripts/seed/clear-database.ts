import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

// Use direct connection for clearing
const directUrl = process.env.DATABASE_URL?.replace('?pgbouncer=true', '')
const pool = new Pool({
  connectionString: directUrl,
  database: 'postgres',
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function clearDatabase() {
  console.log('🧹 Clearing fake data from database...')

  try {
    // Delete all sample/fake data
    const deletedSchemes = await prisma.scheme.deleteMany({})
    const deletedLoans = await prisma.loan.deleteMany({})
    const deletedConsultants = await prisma.consultant.deleteMany({})
    const deletedLeads = await prisma.lead.deleteMany({})
    const deletedBlogPosts = await prisma.blogPost.deleteMany({})
    const deletedGuides = await prisma.guide.deleteMany({})
    const deletedEnquiries = await prisma.listingEnquiry.deleteMany({})

    console.log('✅ Cleared all fake data')
    console.log(`  - Schemes deleted: ${deletedSchemes.count}`)
    console.log(`  - Loans deleted: ${deletedLoans.count}`)
    console.log(`  - Consultants deleted: ${deletedConsultants.count}`)
    console.log(`  - Leads deleted: ${deletedLeads.count}`)
    console.log(`  - Blog posts deleted: ${deletedBlogPosts.count}`)
    console.log(`  - Guides deleted: ${deletedGuides.count}`)
    console.log(`  - Listing enquiries deleted: ${deletedEnquiries.count}`)

  } catch (error) {
    console.error('❌ Error clearing database:', error)
    throw error
  }
}

async function main() {
  try {
    await prisma.$connect()
    await clearDatabase()
    console.log('\n🎉 Database cleared successfully!')
  } catch (error) {
    console.error('❌ Clearing failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
