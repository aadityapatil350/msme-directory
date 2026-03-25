import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL!
console.log('Using connection string:', connectionString ? 'Found' : 'Not found')

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    console.log('Creating Guide and BlogPost tables...')

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Guide" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL,
        "excerpt" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "schemeId" TEXT,
        "loanId" TEXT,
        "category" TEXT NOT NULL,
        "isPublished" BOOLEAN NOT NULL DEFAULT false,
        "publishedAt" TIMESTAMP,
        "viewCount" INTEGER NOT NULL DEFAULT 0,
        "metaTitle" TEXT,
        "metaDescription" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "BlogPost" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL,
        "excerpt" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "tags" TEXT[] NOT NULL DEFAULT '{}',
        "coverImage" TEXT,
        "authorName" TEXT NOT NULL,
        "authorAvatar" TEXT,
        "isPublished" BOOLEAN NOT NULL DEFAULT false,
        "publishedAt" TIMESTAMP,
        "viewCount" INTEGER NOT NULL DEFAULT 0,
        "metaTitle" TEXT,
        "metaDescription" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('✅ Tables created successfully!')

    // Check if tables have data
    const guideCount = await prisma.guide.count()
    const blogCount = await prisma.blogPost.count()

    console.log(`\nCurrent counts:`)
    console.log(`- Guides: ${guideCount}`)
    console.log(`- Blogs: ${blogCount}`)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
