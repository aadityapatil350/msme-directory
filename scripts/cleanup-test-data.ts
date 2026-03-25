import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  database: 'postgres',
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Delete all test consultants
  const deleted = await prisma.consultant.deleteMany({})
  console.log(`Deleted ${deleted.count} consultants`)

  // Reset listing enquiries to pending (optional - keep them for testing)
  // await prisma.listingEnquiry.updateMany({
  //   data: { status: 'pending' }
  // })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
