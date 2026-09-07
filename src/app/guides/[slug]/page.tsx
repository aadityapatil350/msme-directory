import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { VERIFIED_GUIDES } from '@/data/verified-guides'
import {
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import LeadForm from '@/components/LeadForm'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

// Only known slugs are valid; anything else returns a clean 404 (no thin fallback pages).
export const dynamicParams = false

export async function generateStaticParams() {
  return VERIFIED_GUIDES.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = VERIFIED_GUIDES.find((g) => g.slug === slug)

  if (!guide) {
    return {
      title: 'Guide Not Found | MSMEVault',
    }
  }

  return {
    title: `${guide.metaTitle} | MSMEVault`,
    description: guide.metaDescription,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${siteUrl}/guides/${slug}`,
      type: 'article',
    },
  }
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = VERIFIED_GUIDES.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title.replace(/&amp;/g, '&'),
    description: guide.metaDescription,
    author: { '@type': 'Person', name: guide.author.name, jobTitle: guide.author.role },
    publisher: { '@type': 'Organization', name: 'MSMEVault.in', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` } },
    datePublished: guide.lastVerified,
    dateModified: guide.lastVerified,
    mainEntityOfPage: `${siteUrl}/guides/${slug}`,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.category, item: `${siteUrl}/guides/${slug}` },
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
          <Link href="/guides" className="hover:text-zinc-950">Guides</Link>
          <span>/</span>
          <span className="text-zinc-950 truncate max-w-xs">{guide.category}</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
              {guide.category}
            </span>

            <div className="text-[10px] text-zinc-400 font-mono">
              Last Verified: {guide.lastVerified}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3 leading-tight">
            {guide.title}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
            {guide.excerpt}
          </p>

          {/* Author bar */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="text-zinc-600">
              <span className="font-semibold text-zinc-950">{guide.author.name}</span>
              <span className="text-zinc-400 ml-1.5">&bull; {guide.author.credentials}</span>
            </div>

            <a
              href={guide.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-950 font-medium inline-flex items-center gap-1"
            >
              <span>Official Government Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Regulatory &amp; Practical Highlights</span>
          </div>
          <ul className="space-y-1.5 text-xs text-emerald-800 leading-relaxed">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="font-bold">&bull;</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guide Body */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
          {guide.content.split('---').map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.split('\n\n').map((para, pIdx) => {
                const trimmed = para.trim()
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={pIdx} className="text-base font-bold text-zinc-950 pt-3 pb-1 border-b border-zinc-100">
                      {trimmed.replace('## ', '')}
                    </h2>
                  )
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-sm font-bold text-zinc-950 pt-1">
                      {trimmed.replace('### ', '')}
                    </h3>
                  )
                }
                if (trimmed.startsWith('|')) {
                  const rows = trimmed.split('\n').filter((r) => !r.includes(':---'))
                  return (
                    <div key={pIdx} className="overflow-x-auto my-3 border border-zinc-200 rounded-lg">
                      <table className="w-full text-xs text-left font-mono">
                        <tbody>
                          {rows.map((row, rIdx) => {
                            const cells = row.split('|').filter((c) => c.trim().length > 0)
                            if (rIdx === 0) {
                              return (
                                <tr key={rIdx} className="bg-zinc-50 border-b border-zinc-200 font-bold text-zinc-950">
                                  {cells.map((cell, cIdx) => (
                                    <th key={cIdx} className="p-2.5">{cell.trim().replace(/\*\*/g, '')}</th>
                                  ))}
                                </tr>
                              )
                            }
                            return (
                              <tr key={rIdx} className="border-b border-zinc-100 hover:bg-zinc-50/50">
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2.5 text-zinc-600">{cell.trim().replace(/\*\*/g, '')}</td>
                                ))}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )
                }
                if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ') || trimmed.startsWith('5. ')) {
                  const items = trimmed.split('\n')
                  return (
                    <ol key={pIdx} className="list-decimal pl-5 space-y-1 text-xs text-zinc-600">
                      {items.map((it, iIdx) => (
                        <li key={iIdx}>{it.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  )
                }
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n')
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-1 text-xs text-zinc-600">
                      {items.map((it, iIdx) => (
                        <li key={iIdx}>{it.replace(/^-\s*/, '')}</li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={pIdx} className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {trimmed}
                  </p>
                )
              })}
            </div>
          ))}
        </div>

        {/* Lead capture */}
        <div className="mb-6">
          <LeadForm
            leadType="scheme_enquiry"
            title="Need personalised help with this?"
            description="Our research desk will guide you through eligibility, documents, and the official application. Free — no fees, no obligation."
          />
        </div>

        {/* Non-Affiliation Statutory Disclaimer Box */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-500 mb-8">
          <div className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-zinc-950 block mb-0.5">Free Registration Notice:</strong>
              <span>
                MSMEVault is an independent educational portal. Official registration for government schemes is 100% free at official portals ({guide.officialSourceUrl}). Never pay private fees for official government registrations.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
