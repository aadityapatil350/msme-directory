'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/data/verified-blog'
import { Clock, ArrowRight, Search, BookOpen } from 'lucide-react'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)))
    return ['All', ...unique]
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query))
      return matchesCategory && matchesQuery
    })
  }, [posts, selectedCategory, searchQuery])

  return (
    <div>
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? posts.length
                : posts.filter((p) => p.category === cat).length
            const isSelected = selectedCategory === cat

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-2xs font-semibold'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-950'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-200'
                      : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Live Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 30 articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 font-mono">
        <span>
          Showing <strong className="text-zinc-950">{filteredPosts.length}</strong> of{' '}
          <strong className="text-zinc-950">{posts.length}</strong> verified articles
        </span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-emerald-700 hover:underline cursor-pointer"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
          <BookOpen className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
          <h3 className="font-bold text-sm text-zinc-950 mb-1">
            No articles matched your filter
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            Try adjusting your search query or selecting &quot;All&quot; to browse all 30 articles.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
            }}
            className="text-xs bg-zinc-900 text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Show All 30 Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTimeMinutes} min read</span>
                  </div>
                </div>

                <h2 className="font-bold text-base text-zinc-950 mb-2 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-zinc-500 line-clamp-3 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-[11px]">
                <div className="text-zinc-400 font-mono">
                  {formatDate(post.publishedAt)}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-zinc-700 hover:text-zinc-950 font-medium inline-flex items-center gap-1 group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
