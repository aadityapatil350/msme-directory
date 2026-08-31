import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { BLOG_POSTS } from '@/data/verified-blog'
import { Clock, ExternalLink, User } from 'lucide-react'
import LeadForm from '@/components/LeadForm'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.targetKeyword, ...post.tags],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${siteUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  }
}

// Minimal markdown renderer for our controlled content set.
function renderContent(content: string) {
  const blocks = content.split(/\n\n+/)
  return blocks.map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl font-bold text-zinc-950 mt-10 mb-3 tracking-tight">
          {trimmed.slice(3)}
        </h2>
      )
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="text-base font-semibold text-zinc-950 mt-6 mb-2">
          {trimmed.slice(4)}
        </h3>
      )
    }
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote
          key={i}
          className="border-l-4 border-emerald-500 bg-emerald-50/50 pl-4 pr-4 py-3 my-4 text-sm text-emerald-950 rounded-r-lg"
        >
          {inline(trimmed.slice(2))}
        </blockquote>
      )
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter((l) => l.startsWith('- '))
      return (
        <ul key={i} className="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 my-4 leading-relaxed">
          {items.map((it, j) => (
            <li key={j}>{inline(it.slice(2))}</li>
          ))}
        </ul>
      )
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l))
      return (
        <ol key={i} className="list-decimal pl-5 space-y-1.5 text-sm text-zinc-700 my-4 leading-relaxed">
          {items.map((it, j) => (
            <li key={j}>{inline(it.replace(/^\d+\.\s/, ''))}</li>
          ))}
        </ol>
      )
    }
    if (trimmed.startsWith('|')) {
      const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'))
      // strip separator line
      const dataRows = rows.filter((r) => !/^\|\s*-+/.test(r.trim()))
      return (
        <div key={i} className="my-5 overflow-x-auto">
          <table className="w-full text-xs border border-zinc-200 rounded-lg overflow-hidden">
            <tbody>
              {dataRows.map((r, rIdx) => {
                const cells = r.split('|').slice(1, -1).map((c) => c.trim())
                if (rIdx === 0) {
                  return (
                    <tr key={rIdx} className="bg-zinc-50 border-b border-zinc-200">
                      {cells.map((c, cIdx) => (
                        <th key={cIdx} className="p-2.5 text-left text-[11px] font-semibold text-zinc-950">
                          {inline(c)}
                        </th>
                      ))}
                    </tr>
                  )
                }
                return (
                  <tr key={rIdx} className="border-b border-zinc-100 last:border-b-0">
                    {cells.map((c, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-zinc-700">
                        {inline(c)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <p key={i} className="text-sm text-zinc-700 leading-relaxed my-4">
        {inline(trimmed)}
      </p>
    )
  })
}

// Very lightweight inline formatter — bold + links only.
function inline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  const boldRe = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let idx = 0
  const combined = new RegExp(`${linkRe.source}|${boldRe.source}`, 'g')
  let m: RegExpExecArray | null
  while ((m = combined.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index))
    if (m[1] && m[2]) {
      const isInternal = m[2].startsWith('/')
      parts.push(
        isInternal ? (
          <Link key={idx++} href={m[2]} className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900">
            {m[1]}
          </Link>
        ) : (
          <a
            key={idx++}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
          >
            {m[1]}
          </a>
        )
      )
    } else if (m[3]) {
      parts.push(
        <strong key={idx++} className="font-semibold text-zinc-950">
          {m[3]}
        </strong>
      )
    }
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = post.relatedSlugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is (typeof BLOG_POSTS)[number] => Boolean(p))

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    keywords: [post.targetKeyword, ...post.tags].join(', '),
    author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
    publisher: {
      '@type': 'Organization',
      name: 'MSMEVault.in',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto">
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-zinc-950">Blog</Link>
          <span>/</span>
          <span className="text-zinc-950 truncate max-w-xs">{post.category}</span>
        </nav>

        <header className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
              {post.category}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTimeMinutes} min read
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              Published {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3 leading-tight">
            {post.title}
          </h1>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 pt-4 border-t border-zinc-100">
            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-[11px]">
              <div className="font-semibold text-zinc-950">{post.author.name}</div>
              <div className="text-zinc-500">{post.author.role} &bull; {post.author.credentials}</div>
            </div>
          </div>
        </header>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          {renderContent(post.content)}
        </div>

        {/* FAQ */}
        {post.faq.length > 0 && (
          <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
            <h2 className="text-xl font-bold text-zinc-950 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faq.map((f, idx) => (
                <details key={idx} className="border border-zinc-200 rounded-lg p-4 group open:bg-zinc-50/50">
                  <summary className="cursor-pointer text-sm font-semibold text-zinc-950 flex items-start gap-2">
                    <span className="text-emerald-600 font-mono text-xs mt-0.5">Q.</span>
                    <span>{f.question}</span>
                  </summary>
                  <p className="mt-3 pl-6 text-sm text-zinc-700 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6 shadow-2xs">
          <h2 className="text-sm font-bold text-zinc-950 mb-3">Primary Sources</h2>
          <ul className="space-y-2">
            {post.sources.map((s, i) => (
              <li key={i} className="text-xs">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-900 underline underline-offset-2 inline-flex items-center gap-1"
                >
                  <span>{s.label}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Lead capture */}
        <div className="mb-6">
          <LeadForm
            leadType="scheme_enquiry"
            title="Want personalised help with this?"
            description="Our research desk will guide you through eligibility, documents, and the official application. Free — no fees, no obligation."
          />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8 shadow-2xs">
            <h2 className="text-sm font-bold text-zinc-950 mb-3">Related Reads</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug} className="text-sm">
                  <Link href={`/blog/${r.slug}`} className="text-zinc-700 hover:text-zinc-950 hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-500">
          <strong className="text-zinc-950 block mb-1">Non-affiliation disclaimer:</strong>
          MSMEVault is an independent private information portal. We are not affiliated with, endorsed by, or connected to the Government of India or the Ministry of MSME. Official registration is free at the respective government portals. Always verify details on the official source linked on this page.
        </div>
      </article>
    </div>
  )
}
