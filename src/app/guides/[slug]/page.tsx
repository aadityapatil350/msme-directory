import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { parseMarkdown, getReadingTime } from '@/lib/markdown'
import ViewTracker from '@/components/ViewTracker'
import '../../content-styles.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await prisma.guide.findUnique({
    where: { slug },
  })

  if (!guide) {
    return {
      title: 'Guide Not Found | MSMEVault',
    }
  }

  return {
    title: guide.metaTitle || `${guide.title} | MSMEVault`,
    description: guide.metaDescription || guide.excerpt,
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await prisma.guide.findUnique({
    where: { slug },
  })

  if (!guide || !guide.isPublished) {
    notFound()
  }

  // Get related guides
  const relatedGuides = await prisma.guide.findMany({
    where: {
      isPublished: true,
      category: guide.category,
      id: { not: guide.id },
    },
    take: 3,
    orderBy: { viewCount: 'desc' },
  })

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[var(--blue)]">Home</Link>
            <span>→</span>
            <Link href="/resources" className="hover:text-[var(--blue)]">Resources</Link>
            <span>→</span>
            <span className="text-[var(--navy)] font-medium">{guide.title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white px-4 md:px-6 py-6 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              📖 Guide
            </span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              {guide.category}
            </span>
          </div>

          <h1 className="font-['Syne'] text-4xl font-extrabold text-[var(--navy)] mb-4 leading-tight">
            {guide.title}
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            {guide.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>📅 {guide.publishedAt ? new Date(guide.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
            <span>•</span>
            <span>⏱️ {getReadingTime(guide.content)} min read</span>
            <span>•</span>
            <span>👁️ <ViewTracker type="guide" id={guide.id} initialCount={guide.viewCount} /> views</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm">
            <div
              className="guide-content"
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(guide.content)
              }}
            />
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-12">
              <h2 className="font-['Syne'] text-2xl font-bold text-[var(--navy)] mb-6">
                Related Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuides.map(related => (
                  <Link
                    key={related.id}
                    href={`/guides/${related.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
                  >
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                      {related.category}
                    </span>
                    <h3 className="font-semibold text-[var(--navy)] mt-3 mb-2 line-clamp-2 hover:text-[var(--blue)]">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="font-['Syne'] text-xl font-bold text-[var(--navy)] mb-3">
              Need Expert Help?
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with verified MSME consultants for personalized guidance.
            </p>
            <Link href="/consultants">
              <button className="bg-[var(--blue)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e40af] transition-colors">
                Find Expert Consultants →
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
