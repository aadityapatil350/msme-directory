import Link from 'next/link'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Search, CheckCircle, Shield, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSMEVault.in - Find Government Schemes & Loans for Your MSME Business',
  description:
    'India\'s #1 MSME directory. Discover 150+ government schemes, loans & subsidies. Check eligibility in 2 minutes. Connect with 50+ verified CA firms & consultants across 30+ cities.',
  keywords: [
    'MSME schemes India',
    'government loans for small business',
    'MSME registration online',
    'Mudra loan apply',
    'CGTMSE scheme',
    'Stand Up India loan',
    'Udyam registration',
    'business subsidies',
    'CA firms for MSME',
    'MSME consultants near me',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MSMEVault.in - India\'s #1 MSME Schemes & Loans Directory',
    description:
      'Discover 150+ government schemes, loans & subsidies for MSMEs. Check eligibility instantly. Connect with verified consultants.',
    url: siteUrl,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSMEVault.in - Find Government Schemes & Loans for Your MSME',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSMEVault.in - India\'s #1 MSME Schemes & Loans Directory',
    description: 'Discover 150+ government schemes, loans & subsidies for MSMEs.',
    images: ['/og-image.png'],
  },
}

export default async function HomePage() {
  // Get total active schemes count
  const totalSchemes = await prisma.scheme.count({
    where: { isActive: true },
  })

  // Get featured schemes sorted by popularity
  const featuredSchemes = await prisma.scheme.findMany({
    where: { isActive: true },
    orderBy: [
      { isSponsored: 'desc' },
      { viewCount: 'desc' },
      { isFeatured: 'desc' },
    ],
    take: 6,
  })

  // Fetch top consultants
  const topConsultants = await prisma.consultant.findMany({
    where: { isPremium: true, isVerified: true },
    orderBy: { rating: 'desc' },
    take: 3,
  })

  // Get state-wise scheme counts
  const states = ['Maharashtra', 'Gujarat', 'Rajasthan', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh', 'West Bengal', 'Punjab', 'Haryana', 'Telangana', 'Andhra Pradesh', 'Delhi']

  const stateSchemeCounts = await Promise.all(
    states.map(async (state) => {
      const count = await prisma.scheme.count({
        where: {
          isActive: true,
          OR: [
            { state: state.toLowerCase() },
            { type: 'central' } // Central schemes are available to all states
          ]
        }
      })
      return { state, count }
    })
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-6 py-12 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full opacity-15 bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,transparent_70%)]" />

        <div className="relative max-w-[1400px] mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#fbbf24] text-xs font-semibold px-3 py-[5px] rounded-full mb-4">
            🇮🇳 India&apos;s #1 MSME Scheme Directory
          </div>

          {/* Heading */}
          <h1 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3 max-w-[600px]">
            Find the Right <span className="text-[var(--orange)]">Govt Scheme</span><br />for Your Business
          </h1>

          {/* Subtext */}
          <p className="text-[#94a3b8] text-base mb-6 max-w-[500px]">
            {totalSchemes}+ central & state schemes. Check eligibility in 2 minutes. Connect with verified lenders & consultants.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-[6px] flex items-center max-w-[560px] gap-2 mb-5">
            <input
              type="text"
              placeholder="Search schemes, loans, subsidies..."
              className="flex-1 px-3 py-2 border-none outline-none text-sm text-[var(--text)]"
            />
            <select className="border-l border-[var(--gray-light)] px-2 py-1 text-sm text-[var(--gray)] bg-transparent outline-none">
              <option>All States</option>
              <option>Maharashtra</option>
              <option>Gujarat</option>
              <option>Karnataka</option>
            </select>
            <button className="bg-[var(--blue)] text-white px-5 py-[10px] rounded-lg text-sm font-semibold hover:bg-[#1e40af] hover:shadow-md transition-all">
              Search
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-[10px] mb-6">
            <Link href="/eligibility-checker">
              <button className="bg-[var(--orange)] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#ea580c] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Check My Eligibility →
              </button>
            </Link>
            <Link href="/schemes">
              <button className="bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 hover:shadow-md transition-all">
                Browse All Schemes
              </button>
            </Link>
            <Link href="/consultants">
              <button className="bg-white/10 text-white border border-white/30 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 hover:shadow-md transition-all">
                Talk to Expert
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 flex-wrap">
            <div>
              <div className="font-['Syne'] text-2xl font-extrabold text-[var(--orange)]">{totalSchemes}+</div>
              <div className="text-xs text-[#94a3b8]">Active Schemes</div>
            </div>
            <div>
              <div className="font-['Syne'] text-2xl font-extrabold text-[var(--orange)]">28</div>
              <div className="text-xs text-[#94a3b8]">States Covered</div>
            </div>
            <div>
              <div className="font-['Syne'] text-2xl font-extrabold text-[var(--orange)]">12K+</div>
              <div className="text-xs text-[#94a3b8]">MSMEs Helped</div>
            </div>
            <div>
              <div className="font-['Syne'] text-2xl font-extrabold text-[var(--orange)]">₹5Cr+</div>
              <div className="text-xs text-[#94a3b8]">Loans Facilitated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white px-6 py-[14px] border-b border-[var(--gray-light)] flex items-center gap-6 flex-wrap">
        <span className="text-xs font-bold text-[var(--gray)]">AS SEEN IN:</span>
        <span className="flex items-center gap-2 text-xs text-[var(--gray)] font-medium">📰 Economic Times</span>
        <span className="flex items-center gap-2 text-xs text-[var(--gray)] font-medium">📰 Inc42</span>
        <span className="flex items-center gap-2 text-xs text-[var(--gray)] font-medium">📰 YourStory</span>
        <div className="ml-auto flex gap-4 flex-wrap">
          <span className="flex items-center gap-2 text-xs text-[var(--gray)] font-medium">
            <CheckCircle className="w-[18px] h-[18px] text-green-600" /> Govt Verified Info
          </span>
          <span className="flex items-center gap-2 text-xs text-[var(--gray)] font-medium">
            <Shield className="w-[18px] h-[18px] text-blue-600" /> 100% Free to Use
          </span>
          <span className="flex items-center gap-2 text-xs text-[var(--gray)] font-medium">
            <Zap className="w-[18px] h-[18px] text-orange-600" /> Updated Weekly
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-7 bg-[#f0f4ff]">
        <div className="max-w-[1400px] mx-auto">
          {/* Featured Schemes */}
          <div className="mb-7">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="font-['Syne'] text-2xl font-extrabold mb-1">🔥 Popular Schemes</h2>
                <p className="text-[13px] text-[var(--gray)]">Most searched by MSME owners this week</p>
              </div>
              <Link href="/schemes">
                <button className="bg-transparent text-[var(--blue)] border-2 border-[var(--blue)] px-5 py-[10px] rounded-lg text-[13px] font-semibold hover:bg-blue-50 hover:shadow-md transition-all">
                  View All {totalSchemes}+ →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredSchemes.map((scheme) => (
                <Link key={scheme.id} href={`/schemes/${scheme.slug}`}>
                  <div className="bg-white border border-[var(--gray-light)] rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="inline-block bg-[#eff6ff] text-[var(--blue)] text-xs font-semibold px-2 py-[3px] rounded mb-2">
                      {scheme.type === 'central' ? '🏛️ Central Scheme' : `🎨 ${scheme.state || 'State'}`}
                    </div>
                    <h3 className="font-['Syne'] text-sm font-bold mb-[6px]">{scheme.name}</h3>
                    <p className="text-xs text-[var(--gray)] leading-relaxed mb-[10px]">
                      {scheme.shortDescription}
                    </p>
                    <div className="text-[13px] font-semibold text-[var(--money)] mb-[10px]">
                      ₹{((scheme.minAmount || 0) / 100000).toFixed(1)}L – ₹{((scheme.maxAmount || 0) / 100000).toFixed(1)}L
                    </div>
                    <div className="flex justify-between items-center pt-[10px] border-t border-[var(--gray-light)]">
                      <span className="text-xs text-[var(--gray)]">👁 {scheme.viewCount} views</span>
                      <button className="bg-[var(--blue)] text-white text-xs font-semibold px-[14px] py-[6px] rounded-md hover:bg-[#1e40af] hover:shadow-md transition-all">
                        Details →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* State Browse Section */}
          <div className="mb-7">
            <h2 className="font-['Syne'] text-2xl font-extrabold mb-1">🗺️ Browse by State</h2>
            <p className="text-[13px] text-[var(--gray)] mb-5">Find schemes specific to your state</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {stateSchemeCounts.map(({ state, count }) => (
                <Link key={state} href={`/schemes?state=${state.toLowerCase()}`}>
                  <div className="bg-white border border-[var(--gray-light)] rounded-lg px-2 py-[10px] text-center cursor-pointer transition-all duration-200 hover:shadow-md group">
                    <div className="text-xs font-semibold text-[var(--navy)] group-hover:text-[var(--orange)] transition-colors">{state}</div>
                    <div className="text-[10px] text-[var(--blue)] mt-[2px]">{count} schemes</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-7">
            <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-2xl px-7 py-7 text-white text-center shadow-lg">
              <h3 className="text-xl font-bold mb-2">📬 Get Weekly Scheme Alerts</h3>
              <p className="text-sm opacity-95 mb-4">New schemes, deadlines, policy changes — direct to your inbox. 8,000+ MSME owners subscribed.</p>
              <div className="flex gap-3 max-w-[450px] mx-auto">
                <input
                  type="email"
                  placeholder="Enter your mobile or email"
                  className="flex-1 px-4 py-3 rounded-lg text-sm font-medium outline-none text-[#0f1f3d] placeholder:text-[#94a3b8] bg-white border-0 focus:ring-4 focus:ring-white/30"
                />
                <button className="bg-[#0f1f3d] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#1a3a6e] hover:shadow-lg transition-all whitespace-nowrap">
                  Subscribe Free
                </button>
              </div>
            </div>
          </div>

          {/* Featured Consultants */}
          <div className="mb-7">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="font-['Syne'] text-2xl font-extrabold mb-1">👨‍💼 Top Consultants Near You</h2>
                <p className="text-[13px] text-[var(--gray)]">Verified CAs & MSME experts</p>
              </div>
              <Link href="/consultants">
                <button className="bg-transparent text-[var(--blue)] border-2 border-[var(--blue)] px-5 py-[10px] rounded-lg text-[13px] font-semibold hover:bg-blue-50 hover:shadow-md transition-all">
                  View All Cities →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topConsultants.map((consultant) => (
                <div key={consultant.id} className="bg-white border border-[var(--gray-light)] rounded-xl p-4 flex gap-3 relative">
                  {consultant.tier === 'premium' && (
                    <div className="absolute top-3 right-3 bg-[var(--yellow)] text-[#92400e] text-[10px] font-bold px-2 py-[2px] rounded-full">
                      ⭐ Featured
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-full bg-[var(--blue)] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                    {consultant.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-[3px]">{consultant.firmName || consultant.name}</h3>
                    <p className="text-xs text-[var(--gray)] mb-[6px]">
                      {consultant.city}, {consultant.state} · {consultant.experience} yrs exp
                    </p>
                    <div className="flex gap-1 flex-wrap mb-2">
                      {consultant.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="bg-[#f1f5f9] text-[var(--gray)] text-[10px] px-2 py-[2px] rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[var(--yellow)]">★★★★★</span>
                      <span className="font-semibold">{consultant.rating}</span>
                      <span className="text-[var(--gray)]">({consultant.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA Card */}
              <div className="bg-[#f8fafc] border border-[var(--gray-light)] rounded-xl p-4 flex gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--gray-light)] flex items-center justify-center text-[var(--gray)] font-bold text-base flex-shrink-0">
                  +
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[var(--gray)] mb-[3px]">Your Firm Here</h3>
                  <p className="text-xs text-[var(--gray)] mb-3">Get leads from 10,000+ MSMEs in your city</p>
                  <Link href="/list-your-firm">
                    <button className="bg-[var(--orange)] text-white text-xs font-semibold px-[14px] py-[6px] rounded-md hover:bg-[#ea580c] hover:shadow-md transition-all">
                      List Your Firm →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
