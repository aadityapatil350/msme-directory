/**
 * Simple markdown parser for blog and guide content
 * Converts markdown to HTML with proper formatting
 */

export function parseMarkdown(content: string): string {
  if (!content) return ''

  let html = content

  // Remove the first H1 if it exists (since we display title separately)
  html = html.replace(/^# .+\n+/, '')

  // Normalize line endings
  html = html.replace(/\r\n/g, '\n')

  // Process line by line for better control
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | null = null
  let paragraphBuffer: string[] = []

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(' ').trim()
      if (text) {
        result.push(`<p>${parseInline(text)}</p>`)
      }
      paragraphBuffer = []
    }
  }

  const flushList = () => {
    if (inList && listType) {
      result.push(`</${listType}>`)
      inList = false
      listType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Empty line - flush paragraph and list
    if (trimmedLine === '') {
      flushParagraph()
      flushList()
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(trimmedLine)) {
      flushParagraph()
      flushList()
      result.push('<hr />')
      continue
    }

    // Headers
    if (trimmedLine.startsWith('## ')) {
      flushParagraph()
      flushList()
      const text = trimmedLine.replace(/^## /, '')
      result.push(`<h2>${parseInline(text)}</h2>`)
      continue
    }
    if (trimmedLine.startsWith('### ')) {
      flushParagraph()
      flushList()
      const text = trimmedLine.replace(/^### /, '')
      result.push(`<h3>${parseInline(text)}</h3>`)
      continue
    }
    if (trimmedLine.startsWith('#### ')) {
      flushParagraph()
      flushList()
      const text = trimmedLine.replace(/^#### /, '')
      result.push(`<h4>${parseInline(text)}</h4>`)
      continue
    }

    // Unordered list items
    if (/^[-*] /.test(trimmedLine)) {
      flushParagraph()
      if (!inList || listType !== 'ul') {
        flushList()
        result.push('<ul>')
        inList = true
        listType = 'ul'
      }
      const text = trimmedLine.replace(/^[-*] /, '')
      result.push(`<li>${parseInline(text)}</li>`)
      continue
    }

    // Ordered list items
    if (/^\d+\. /.test(trimmedLine)) {
      flushParagraph()
      if (!inList || listType !== 'ol') {
        flushList()
        result.push('<ol>')
        inList = true
        listType = 'ol'
      }
      const text = trimmedLine.replace(/^\d+\. /, '')
      result.push(`<li>${parseInline(text)}</li>`)
      continue
    }

    // Checkbox list items
    if (/^- \[[ x]\] /.test(trimmedLine)) {
      flushParagraph()
      if (!inList || listType !== 'ul') {
        flushList()
        result.push('<ul class="checklist">')
        inList = true
        listType = 'ul'
      }
      const isChecked = trimmedLine.includes('[x]')
      const text = trimmedLine.replace(/^- \[[ x]\] /, '')
      result.push(`<li class="checklist-item ${isChecked ? 'checked' : ''}">${parseInline(text)}</li>`)
      continue
    }

    // Blockquote
    if (trimmedLine.startsWith('> ')) {
      flushParagraph()
      flushList()
      const text = trimmedLine.replace(/^> /, '')
      result.push(`<blockquote><p>${parseInline(text)}</p></blockquote>`)
      continue
    }

    // Regular text - add to paragraph buffer
    flushList()
    paragraphBuffer.push(trimmedLine)
  }

  // Flush any remaining content
  flushParagraph()
  flushList()

  return result.join('\n')
}

/**
 * Parse inline markdown elements
 */
function parseInline(text: string): string {
  let result = text

  // Bold text: **text** or __text__
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Italic text: *text* or _text_ (but not when part of bold)
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
  result = result.replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>')

  // Inline code: `code`
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Preserve emojis with proper styling
  result = result.replace(/(✅|❌|💡|📌|⚠️|📖|📅|👁️|💼|🏛️|💰|👨‍💼|📧|📞|🎯|🔑|📊|💵|🏆|⭐|🚀|💪|🔥|✨)/g, '<span class="emoji">$1</span>')

  return result
}

/**
 * Get estimated reading time
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.max(3, Math.ceil(words / wordsPerMinute))
}

/**
 * Extract table of contents from content
 */
export function extractTOC(content: string): { id: string; text: string; level: number }[] {
  const toc: { id: string; text: string; level: number }[] = []
  const lines = content.split('\n')

  lines.forEach(line => {
    const h2Match = line.match(/^## (.+)$/)
    const h3Match = line.match(/^### (.+)$/)

    if (h2Match) {
      const text = h2Match[1]
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      toc.push({ id, text, level: 2 })
    } else if (h3Match) {
      const text = h3Match[1]
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      toc.push({ id, text, level: 3 })
    }
  })

  return toc
}
