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
  const enquiry = await prisma.listingEnquiry.create({
    data: {
      firmName: 'Test Consulting Services',
      contactName: 'Rahul Sharma',
      email: 'test@example.com',
      phone: '+91 9876543210',
      city: 'Delhi',
      state: 'Delhi',
      services: ['GST Filing', 'ITR Filing', 'Company Registration'],
      tier: 'free',
      status: 'pending',
      notes: 'Experience: 8 years. Designation: CA. Website: N/A',
    },
  })
  console.log('Created test enquiry:', enquiry.id)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
