// Script to update all verified schemes with correct information
// Run this after auditing schemes for accuracy

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

async function updateVerifiedSchemes() {
  try {
    await prisma.$connect()
    console.log('🔄 Updating verified schemes with accurate information...\n')

    let updateCount = 0

    // 1. CGTMSE - Update with 2024-25 information
    await prisma.scheme.update({
      where: { slug: 'cgtmse-credit-guarantee-fund' },
      data: {
        shortDescription: 'Collateral-free loans up to ₹2 crore with 75-85% guarantee',
        description: 'CGTMSE provides credit guarantee to loans extended by banks to MSMEs. The scheme offers 75-85% guarantee coverage on loans up to ₹2 crore, enabling easier access to credit without collateral. Enhanced coverage for women-led enterprises introduced in Dec 2024.',
        maxAmount: 20000000,
        applyUrl: 'https://www.cgtmse.in/',
        benefits: '75-85% credit guarantee coverage, collateral-free loans up to ₹2 crore, enhanced guarantee for women-led enterprises, special provisions effective from April 2025, reduced risk for lenders.',
      },
    })
    console.log('✅ Updated: CGTMSE')
    updateCount++

    // 2. Startup India Seed Fund - Verified active
    await prisma.scheme.update({
      where: { slug: 'startup-india-seed-fund' },
      data: {
        applyUrl: 'https://seedfund.startupindia.gov.in/',
        description: 'Startup India Seed Fund Scheme (SISFS) provides financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization. With an outlay of ₹945 crore, the scheme accepts applications throughout the year.',
        benefits: 'Grant up to ₹10 lakh for proof of concept and prototype, up to ₹50 lakh for market entry through convertible instruments, support through 300+ eligible incubators, applications accepted year-round, 3,600 entrepreneurs to be supported.',
      },
    })
    console.log('✅ Updated: Startup India Seed Fund')
    updateCount++

    // 3. PMEGP - Verified active till 2026
    await prisma.scheme.update({
      where: { slug: 'pmegp' },
      data: {
        description: 'PMEGP provides subsidy of 15-35% of project cost for setting up new micro enterprises. The scheme has been approved for continuation from 2021-22 to 2025-26 (15th Finance Commission cycle). Implemented by KVIC as single nodal agency.',
        eligibility: 'Any individual above 18 years. No income ceiling. For projects above ₹10 lakh (manufacturing) or ₹5 lakh (service/business), minimum 8th standard education required. Only for new viable projects. Units that have availed other government subsidies are not eligible.',
        applyUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
        benefits: '15-35% subsidy on project cost (up to ₹17.5 lakh for special category), loans up to ₹50 lakh for manufacturing and ₹20 lakh for services, no collateral for loans below ₹10 lakh, technical and marketing support.',
      },
    })
    console.log('✅ Updated: PMEGP')
    updateCount++

    // 4. PM SVANidhi - Extended till 2030
    await prisma.scheme.update({
      where: { slug: 'pm-svanidhi' },
      data: {
        shortDescription: '₹10,000 working capital for street vendors - Extended till 2030',
        description: 'PM SVANidhi scheme provides collateral-free working capital loans to street vendors. Restructured and extended till March 31, 2030 by Union Cabinet. The scheme aims to benefit 1.15 crore beneficiaries including 50 lakh new beneficiaries with total outlay of ₹7,332 crore.',
        maxAmount: 50000,
        eligibility: 'Street vendors with Certificate of Vending or Letter of Recommendation. Vendors doing business as of March 24, 2020. No upper age limit. No requirement of income tax return or GST registration. Extended till 2030.',
        benefits: '₹10,000 working capital loan (1st tranche) with 7% interest subsidy on timely repayment, ₹20,000 second tranche, ₹50,000 third tranche available after full repayment, cashback up to ₹100/month for digital transactions, scheme extended till March 2030, toll-free helpline 1800 11 1979.',
      },
    })
    console.log('✅ Updated: PM SVANidhi (Extended till 2030)')
    updateCount++

    // 5. Udyam Registration - Verified active
    await prisma.scheme.update({
      where: { slug: 'udyam-registration' },
      data: {
        description: 'Udyam Registration is the official zero-cost registration system for MSMEs maintained by Ministry of MSME. Over 2.46 crore units have registered as of 2025. The registration is free, completely online, paperless with no documentation required - only self-declaration with PAN and GSTIN.',
        eligibility: 'Any business entity engaged in manufacturing or service sector. Can be proprietorship, partnership, company, LLP, or cooperative society. Aadhar number and PAN mandatory. GSTIN required for registration.',
        benefits: 'Free lifetime registration with no renewal, dynamic QR code certificate, priority access to all government schemes, easier bank loans, government tender preference, official MSME recognition, single-page online form with self-declaration.',
      },
    })
    console.log('✅ Updated: Udyam Registration')
    updateCount++

    // 6. CLCSS - Verified active
    await prisma.scheme.update({
      where: { slug: 'clcss-credit-linked-subsidy' },
      data: {
        shortDescription: '15% capital subsidy on technology equipment (max ₹15 lakh)',
        description: 'Credit Linked Capital Subsidy and Technology Upgradation Scheme (CLCS-TUS) provides 15% subsidy on eligible plants and machinery for MSMEs. The scheme is confirmed to be active and helps technology upgradation. Covers 51 sub-sectors including Khadi and Village Industries.',
        applyUrl: 'https://clcss.dcmsme.gov.in/',
        benefits: '15% subsidy on technology equipment (maximum ₹15 lakh), subsidy on institutional finance up to ₹1 crore, covers 51 sub-sectors/products, online application through lending institutions, helps in technology modernization and upgradation.',
      },
    })
    console.log('✅ Updated: CLCSS')
    updateCount++

    // 7. ZED Certification - Verified active with 2024-25 stats
    await prisma.scheme.update({
      where: { slug: 'zed-certification-scheme' },
      data: {
        shortDescription: 'Free Zero Defect Zero Effect certification for MSMEs',
        description: 'MSME Sustainable (ZED) Certification is an extensive program to create awareness about Zero Defect Zero Effect practices. Over 2.83 lakh certifications issued till March 2025. The scheme has grown from 3,160 certifications in 2022-23 to 1.76 lakh in 2023-24.',
        eligibility: 'All MSMEs registered with Udyam Registration portal are eligible. Must take ZED Pledge. Available for manufacturing and service sectors. Free and paperless registration process.',
        applyUrl: 'https://zed.msme.gov.in/',
        benefits: 'Free paperless registration and certification, three certification levels (Bronze, Silver, Gold), 80% subsidy on certification costs for micro enterprises, 60% for small, quality improvement training, enhanced competitiveness, government procurement preference, over 2.83 lakh units certified.',
      },
    })
    console.log('✅ Updated: ZED Certification')
    updateCount++

    console.log(`\n✅ Successfully updated ${updateCount} schemes with verified information!`)
    console.log('\n📊 Summary of Updates:')
    console.log('  • CGTMSE: Updated to ₹2 crore limit, added Dec 2024 enhancements')
    console.log('  • Startup India: Verified portal URL and funding details')
    console.log('  • PMEGP: Added 2025-26 extension info')
    console.log('  • PM SVANidhi: Extended till March 2030')
    console.log('  • Udyam: Added 2.46 crore registrations stat')
    console.log('  • CLCSS: Confirmed active status')
    console.log('  • ZED: Added 2.83 lakh certifications stat')

    await prisma.$disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating schemes:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

updateVerifiedSchemes()
