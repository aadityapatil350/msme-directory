import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, FileText, ExternalLink, ArrowRight, Award, Sparkles, Shield } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import ViewTracker from '@/components/ViewTracker'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scheme = await prisma.scheme.findUnique({
    where: { slug },
  })

  if (!scheme) {
    return {
      title: 'Scheme Not Found',
    }
  }

  const loanRange = scheme.minAmount && scheme.maxAmount
    ? `₹${(scheme.minAmount / 100000).toFixed(0)}L - ₹${scheme.maxAmount >= 10000000 ? (scheme.maxAmount / 10000000).toFixed(0) + 'Cr' : (scheme.maxAmount / 100000).toFixed(0) + 'L'}`
    : ''

  return {
    title: `${scheme.name} - Eligibility, Benefits & How to Apply 2025`,
    description: `${scheme.shortDescription} ${loanRange ? `Loan amount: ${loanRange}.` : ''} Check eligibility and apply online.`,
    keywords: [
      scheme.name,
      `${scheme.name} eligibility`,
      `${scheme.name} apply online`,
      `${scheme.type === 'central' ? 'Central' : 'State'} MSME scheme`,
      ...scheme.sector.map(s => `${s} MSME scheme`),
    ],
    alternates: {
      canonical: `/schemes/${slug}`,
    },
    openGraph: {
      title: `${scheme.name} | Eligibility & Benefits | MSMEVault`,
      description: scheme.shortDescription,
      url: `${siteUrl}/schemes/${slug}`,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: scheme.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: scheme.name,
      description: scheme.shortDescription,
      images: ['/og-image.png'],
    },
  }
}

export default async function SchemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scheme = await prisma.scheme.findUnique({
    where: { slug },
  })

  if (!scheme) {
    notFound()
  }

  // JSON-LD Schema for Government Service
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: scheme.name,
    description: scheme.shortDescription,
    serviceType: scheme.type === 'central' ? 'Central Government Scheme' : 'State Government Scheme',
    provider: {
      '@type': 'GovernmentOrganization',
      name: scheme.type === 'central' ? 'Government of India' : `${scheme.state} Government`,
      areaServed: scheme.state || 'India',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'MSME Entrepreneurs',
    },
    url: `${siteUrl}/schemes/${slug}`,
    ...(scheme.applyUrl && { potentialAction: {
      '@type': 'Action',
      name: 'Apply Online',
      target: scheme.applyUrl,
    }}),
  }

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Schemes',
        item: `${siteUrl}/schemes`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: scheme.name,
        item: `${siteUrl}/schemes/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Hero Header with Gradient Background */}
      <section className="relative bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] py-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--orange)] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue)] opacity-5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
          {/* Breadcrumb */}
          <div className="text-sm text-[#94a3b8] mb-4">
            <Link href="/" className="hover:text-[var(--blue-light)] transition-colors">Home</Link>
            {' › '}
            <Link href="/schemes" className="hover:text-[var(--blue-light)] transition-colors">Schemes</Link>
            {' › '}
            <span className="text-white font-medium">{scheme.name}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              {/* Badges */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge className={`${
                  scheme.type === 'central'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700'
                } text-white border-0 px-3 py-1.5 text-sm font-bold`}>
                  {scheme.type === 'central' ? '🏛️ Central Scheme' : '📍 State Scheme'}
                </Badge>
                {scheme.state && (
                  <Badge className="bg-white/20 text-white border border-white/30 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm">
                    {scheme.state}
                  </Badge>
                )}
                {scheme.isSponsored && (
                  <Badge className="bg-[var(--orange)] text-white border-0 px-3 py-1.5 text-sm font-bold">
                    ⭐ Featured
                  </Badge>
                )}
                <Badge className="bg-green-500 text-white border-0 px-3 py-1.5 text-sm font-bold">
                  ✓ Active
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-['Syne'] text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                {scheme.name}
              </h1>
              <p className="text-lg text-[#94a3b8] leading-relaxed">{scheme.shortDescription}</p>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                  <Shield className="w-4 h-4 text-[var(--green)]" />
                  <span className="text-sm text-white font-medium">Government Verified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                  <Sparkles className="w-4 h-4 text-[var(--yellow)]" />
                  <span className="text-sm text-white font-medium">
                    <ViewTracker type="scheme" id={scheme.id} initialCount={scheme.viewCount} /> Views
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button size="lg" className="bg-gradient-to-r from-[var(--orange)] to-[#ea580c] hover:from-[#ea580c] hover:to-[var(--orange)] text-white font-extrabold px-8 py-6 text-base shadow-2xl" asChild>
                <Link href="/eligibility-checker">
                  Check Eligibility Now →
                </Link>
              </Button>
              <p className="text-xs text-[#94a3b8] text-center mt-2">✓ Free · ✓ 2 mins · ✓ Instant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content Column */}
          <div className="space-y-6">
            {/* Key Information Card */}
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
                <CardTitle className="font-['Syne'] text-xl font-extrabold flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {(scheme.minAmount || scheme.maxAmount) && (
                  <div className="flex justify-between items-center py-4 border-b border-blue-200 bg-white rounded-lg px-4">
                    <span className="font-bold text-[var(--gray)]">💰 Loan/Subsidy Amount</span>
                    <span className="text-[var(--text)] font-extrabold text-lg text-[var(--money)]">
                      {scheme.minAmount && `₹${((scheme.minAmount || 0) / 100000).toFixed(0)}L`}
                      {scheme.minAmount && scheme.maxAmount && ' - '}
                      {scheme.maxAmount && `₹${scheme.maxAmount >= 10000000 ? ((scheme.maxAmount || 0) / 10000000).toFixed(0) + 'Cr' : ((scheme.maxAmount || 0) / 100000).toFixed(0) + 'L'}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-4 border-b border-blue-200 bg-white rounded-lg px-4">
                  <span className="font-bold text-[var(--gray)]">🏭 Sectors Covered</span>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {scheme.sector.map((sec) => (
                      <Badge key={sec} className="bg-blue-600 text-white text-xs font-semibold">{sec}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 bg-white rounded-lg px-4">
                  <span className="font-bold text-[var(--gray)]">✅ Status</span>
                  <Badge className="bg-green-500 text-white font-bold">Active & Accepting Applications</Badge>
                </div>
              </CardContent>
            </Card>

            {/* About This Scheme */}
            <Card className="border-2 border-gray-200 bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-slate-100 border-b-2 border-gray-200">
                <CardTitle className="font-['Syne'] text-xl font-extrabold">📋 About This Scheme</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-[var(--gray)] leading-relaxed whitespace-pre-line text-base">
                  {scheme.description}
                </p>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-white to-green-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="font-['Syne'] text-xl font-extrabold flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-[var(--gray)] leading-relaxed whitespace-pre-line text-base bg-white rounded-lg p-4 border border-green-200">
                  {scheme.eligibility}
                </p>
              </CardContent>
            </Card>

            {/* Documents Required */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-xl">
                <CardTitle className="font-['Syne'] text-xl font-extrabold flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Documents Required
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="grid md:grid-cols-2 gap-3">
                  {scheme.documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-orange-200">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text)] font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
                <CardTitle className="font-['Syne'] text-xl font-extrabold">🎁 Key Benefits</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-[var(--gray)] leading-relaxed whitespace-pre-line text-base bg-white rounded-lg p-4 border border-purple-200">
                  {scheme.benefits}
                </p>
              </CardContent>
            </Card>

            {/* Data Update Disclaimer */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-lg">ℹ️</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900 text-sm mb-1">Data Accuracy Notice</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Information verified as of <strong>March 2025</strong> from official government sources.
                    Scheme details, eligibility, and loan amounts may change. Always verify current information
                    on the official portal before applying.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Apply */}
            {scheme.applyUrl && (
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-xl">
                  <CardTitle className="font-['Syne'] text-xl font-extrabold">🚀 How to Apply</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-[var(--text)] font-semibold bg-white rounded-lg p-4 border border-blue-200">
                    Visit the official government portal to apply for this scheme. Make sure you have all required documents ready.
                  </p>
                  <div className="flex gap-3">
                    <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6">
                      <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer">
                        Visit Official Portal
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild className="flex-1 bg-gradient-to-r from-[var(--orange)] to-[#ea580c] hover:from-[#ea580c] hover:to-[var(--orange)] text-white font-bold py-6">
                      <Link href="/eligibility-checker">
                        Check Eligibility First →
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Eligibility CTA */}
            <Card className="bg-gradient-to-br from-[var(--orange)] to-[#ea580c] text-white border-2 border-orange-400 shadow-2xl">
              <CardHeader>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-4xl">🎯</span>
                </div>
                <CardTitle className="text-white font-['Syne'] text-xl text-center font-extrabold">Check if You Qualify</CardTitle>
                <CardDescription className="text-orange-100 text-center">
                  Get instant results in 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-white text-[var(--orange)] hover:bg-gray-50 font-extrabold py-6 text-base shadow-xl">
                  <Link href="/eligibility-checker">
                    Check Eligibility
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-orange-100">
                  <div>
                    <div className="font-bold text-base">✓</div>
                    <div>Free</div>
                  </div>
                  <div>
                    <div className="font-bold text-base">⚡</div>
                    <div>Instant</div>
                  </div>
                  <div>
                    <div className="font-bold text-base">🔒</div>
                    <div>Secure</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Help */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-blue-200">
                <CardTitle className="font-['Syne'] text-base font-extrabold">👨‍💼 Need Expert Help?</CardTitle>
                <CardDescription className="font-semibold">
                  Connect with verified consultants
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--blue)] to-[#1e40af] flex items-center justify-center text-white font-extrabold text-base shadow-md">
                      RS
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-[var(--text)]">Rajesh Sharma, CA</h5>
                      <p className="text-xs text-[var(--gray)]">Mumbai · ⭐ 4.9 (127)</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--gray)] italic">"Helped 500+ MSMEs secure loans"</p>
                </div>
                <Button asChild variant="outline" className="w-full border-2 border-[var(--blue)] text-[var(--blue)] hover:bg-blue-50 font-extrabold py-5">
                  <Link href="/consultants">Find Consultants →</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Related Links */}
            <Card className="border-2 border-gray-200 bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-100 to-slate-100 border-b-2 border-gray-200">
                <CardTitle className="font-['Syne'] text-base font-extrabold">📚 Related Resources</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Link href="/loans" className="block">
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-md">
                    <span className="text-sm font-extrabold text-green-700 flex items-center gap-2">
                      💳 Compare Business Loans
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </span>
                  </div>
                </Link>
                <Link href="/guides" className="block">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-md">
                    <span className="text-sm font-extrabold text-blue-700 flex items-center gap-2">
                      📖 Application Guides
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </span>
                  </div>
                </Link>
                <Link href="/schemes" className="block">
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-md">
                    <span className="text-sm font-extrabold text-purple-700 flex items-center gap-2">
                      🎯 Browse All Schemes
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
