import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🔍 Verifying Consultants Database...\n')

  // Total count
  const totalCount = await prisma.consultant.count()
  console.log(`📊 Total Consultants: ${totalCount}`)

  // Count by verification status
  const verifiedCount = await prisma.consultant.count({ where: { isVerified: true } })
  console.log(`✅ Verified: ${verifiedCount}`)
  console.log(`❌ Unverified: ${totalCount - verifiedCount}\n`)

  // Count by tier
  const tierCounts = await prisma.consultant.groupBy({
    by: ['tier'],
    _count: true,
  })
  console.log('🎯 By Tier:')
  tierCounts.forEach(t => console.log(`  • ${t.tier}: ${t._count}`))

  // Count by city
  const cityCounts = await prisma.consultant.groupBy({
    by: ['city'],
    _count: true,
    orderBy: { _count: { city: 'desc' } },
  })
  console.log('\n🌍 By City:')
  cityCounts.forEach(c => console.log(`  • ${c.city}: ${c._count}`))

  // Count by state
  const stateCounts = await prisma.consultant.groupBy({
    by: ['state'],
    _count: true,
    orderBy: { _count: { state: 'desc' } },
  })
  console.log('\n🗺️  By State:')
  stateCounts.forEach(s => console.log(`  • ${s.state}: ${s._count}`))

  // Sample consultants
  const samples = await prisma.consultant.findMany({
    take: 5,
    orderBy: { rating: 'desc' },
    select: {
      name: true,
      firmName: true,
      city: true,
      state: true,
      tier: true,
      rating: true,
      reviewCount: true,
      experience: true,
      services: true,
    },
  })

  console.log('\n⭐ Top 5 Rated Consultants:')
  samples.forEach((s, idx) => {
    console.log(`\n${idx + 1}. ${s.firmName}`)
    console.log(`   Name: ${s.name}`)
    console.log(`   Location: ${s.city}, ${s.state}`)
    console.log(`   Tier: ${s.tier}`)
    console.log(`   Rating: ${s.rating} (${s.reviewCount} reviews)`)
    console.log(`   Experience: ${s.experience} years`)
    console.log(`   Services: ${s.services.slice(0, 3).join(', ')}${s.services.length > 3 ? '...' : ''}`)
  })

  console.log('\n✅ Verification Complete!\n')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
