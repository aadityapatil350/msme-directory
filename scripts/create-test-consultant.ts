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
  const consultant = await prisma.consultant.upsert({
    where: { email: 'adityabiz350@gmail.com' },
    update: {},
    create: {
      slug: 'test-firm-mumbai-' + Date.now(),
      name: 'Aditya Patil',
      firmName: 'Test CA Firm',
      city: 'Mumbai',
      state: 'Maharashtra',
      services: ['GST Filing', 'ITR Filing', 'Company Registration'],
      phone: '+91 9373238164',
      email: 'adityabiz350@gmail.com',
      tier: 'featured',
      isPremium: true,
      isVerified: true,
      reviewCount: 5,
      rating: 4.8,
      viewCount: 100,
    },
  })
  console.log('Created consultant:', consultant.email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
