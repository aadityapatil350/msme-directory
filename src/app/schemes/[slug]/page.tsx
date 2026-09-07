import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { VERIFIED_SCHEMES } from '@/data/verified-schemes'
import { formatSchemeBenefit } from '@/lib/scheme-benefit'
import { ExternalLink, CheckCircle2 } from 'lucide-react'
import OutboundLink from '@/components/OutboundLink'
import LeadForm from '@/components/LeadForm'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

// Only known slugs are valid; anything else returns a clean 404 (no thin fallback pages).
export const dynamicParams = false

export async function generateStaticParams() {
  return VERIFIED_SCHEMES.map((scheme) => ({
    slug: scheme.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const scheme = VERIFIED_SCHEMES.find((s) => s.slug === slug)

  if (!scheme) {
    return {
      title: 'Scheme Not Found',
    }
  }

  const benefitFormat = formatSchemeBenefit(scheme.benefit, {
    minAmount: scheme.minAmount,
    maxAmount: scheme.maxAmount,
    name: scheme.name,
    description: scheme.description,
  })

  return {
    title: `${scheme.name} (2026) – Eligibility, Benefits & How to Apply | MSMEVault`,
    description: `${scheme.shortDescription} Benefit: ${benefitFormat.primaryText}. Verified on ${scheme.lastVerified} from official primary sources.`,
    alternates: {
      canonical: `/schemes/${slug}`,
    },
    openGraph: {
      title: `${scheme.name} (2026) – Eligibility & Application Guide`,
      description: scheme.shortDescription,
      url: `${siteUrl}/schemes/${slug}`,
      type: 'article',
    },
  }
}

export default async function SchemeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const scheme = VERIFIED_SCHEMES.find((s) => s.slug === slug)

  if (!scheme) {
    notFound()
  }

  const benefitFormat = formatSchemeBenefit(scheme.benefit, {
    minAmount: scheme.minAmount,
    maxAmount: scheme.maxAmount,
    name: scheme.name,
    description: scheme.description,
  })

  const relatedSchemes = VERIFIED_SCHEMES.filter(
    (s) => s.slug !== scheme.slug && (s.sector.some(sec => scheme.sector.includes(sec)) || s.type === scheme.type)
  ).slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': scheme.benefit.kind === 'credit_linked' ? 'FinancialProduct' : 'GovernmentService',
    name: scheme.name,
    description: scheme.shortDescription,
    provider: { '@type': 'GovernmentOrganization', name: scheme.nodalMinistry },
    url: `${siteUrl}/schemes/${slug}`,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Schemes', item: `${siteUrl}/schemes` },
      { '@type': 'ListItem', position: 3, name: scheme.name, item: `${siteUrl}/schemes/${slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <Link href="/schemes" className="hover:text-zinc-950">Schemes</Link>
          <span>/</span>
          <span className="text-zinc-950 truncate max-w-xs">{scheme.name}</span>
        </nav>

        {/* Header Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                {scheme.type === 'central' ? 'Central Scheme' : `State (${scheme.state || 'State'})`}
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                {benefitFormat.badgeText}
              </span>
            </div>

            <div className="text-[10px] text-zinc-400 font-mono">
              Last Verified: {scheme.lastVerified}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
            {scheme.name}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
            {scheme.shortDescription}
          </p>

          {/* Sourcing Bar */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="text-zinc-500">
              <span className="font-semibold text-zinc-950 mr-1.5">Authority:</span>
              <span>{scheme.nodalMinistry}</span>
            </div>

            <div className="flex items-center gap-3">
              <OutboundLink
                href={scheme.sourceUrl}
                portal={`source:${scheme.slug}`}
                className="text-zinc-500 hover:text-zinc-950 inline-flex items-center gap-1 font-medium"
              >
                <span>Official Circular</span>
                <ExternalLink className="w-3 h-3" />
              </OutboundLink>

              <OutboundLink
                href={scheme.applyUrl}
                portal={`apply:${scheme.slug}`}
                className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors inline-flex items-center gap-1"
              >
                <span>Apply on Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </OutboundLink>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 mb-10">
          {/* 1. Overview */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-zinc-950 mb-2 pb-2 border-b border-zinc-100">
              Overview &amp; Objectives
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* 2. Benefit Structure */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-zinc-950 mb-3 pb-2 border-b border-zinc-100">
              Financial Benefit Structure
            </h2>
            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg text-emerald-900 mb-3">
              <div className="font-bold text-sm mb-0.5">{benefitFormat.primaryText}</div>
              <div className="text-xs text-emerald-700">
                {scheme.benefit.kind === 'credit_linked' && scheme.benefit.interestRateNote}
                {scheme.benefit.kind === 'subsidy_percent' && scheme.benefit.description}
                {scheme.benefit.kind === 'guarantee_cover' && scheme.benefit.coveragePercent}
                {scheme.benefit.kind === 'subsidy_fixed' && scheme.benefit.description}
                {scheme.benefit.kind === 'certification' && scheme.benefit.description}
                {scheme.benefit.kind === 'other' && scheme.benefit.description}
              </div>
            </div>
          </div>

          {/* 3. Eligibility Criteria */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-zinc-950 mb-3 pb-2 border-b border-zinc-100">
              Eligibility Criteria
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
              {scheme.eligibility}
            </p>

            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2">
                Eligible Sectors:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {scheme.sector.map((sec) => (
                  <span key={sec} className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs px-2 py-0.5 rounded">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Required Documents */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-zinc-950 mb-3 pb-2 border-b border-zinc-100">
              Required Documents Checklist
            </h2>
            <ul className="space-y-2">
              {scheme.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4.5 Lead capture */}
          <LeadForm
            leadType="scheme_enquiry"
            schemeSlug={scheme.slug}
            title={`Need help applying for ${scheme.name}?`}
            description="Our research team will guide you through eligibility, documents, and the official application process. Free service — no fees, no obligation."
          />

          {/* 5. Non-Affiliation Statutory Disclaimer */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-500">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-zinc-950 block mb-0.5">Free Official Registration:</strong>
                <span>
                  MSMEVault is an independent educational portal. Official registration for {scheme.name} is processed free of charge directly on the official portal ({scheme.applyUrl}). Never pay private fees for official government registrations.
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 6. Related Schemes */}
        {relatedSchemes.length > 0 && (
          <div className="mt-8 border-t border-zinc-200 pt-8">
            <h2 className="text-lg font-bold text-zinc-950 mb-4">Related Schemes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedSchemes.map((rs) => (
                <Link
                  key={rs.slug}
                  href={`/schemes/${rs.slug}`}
                  className="bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-300 transition-all shadow-2xs group"
                >
                  <h3 className="font-semibold text-sm text-zinc-950 mb-1 group-hover:underline">{rs.name}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">{rs.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
