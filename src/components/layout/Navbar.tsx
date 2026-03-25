'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/schemes', label: 'Schemes' },
    { href: '/loans', label: 'Loans' },
    { href: '/eligibility-checker', label: 'Eligibility' },
    { href: '/consultants', label: 'Consultants' },
    { href: '/guides', label: 'Guides' },
    { href: '/list-your-firm', label: 'List Your Firm' },
    { href: '/user/login', label: 'Dashboard' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-[var(--navy)] px-6 flex items-center justify-between h-[52px] sticky top-0 z-100">
      {/* Logo */}
      <Link href="/" className="font-['Syne'] font-extrabold text-lg text-white">
        MSME<span className="text-[var(--orange)]">Vault</span>.in
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] transition-colors ${
              isActive(link.href) ? 'text-white' : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <button className="hidden md:block bg-[var(--orange)] text-white text-[13px] font-semibold px-4 py-[7px] rounded-md cursor-pointer hover:bg-orange-600 transition-colors">
        <Link href="/eligibility-checker">Check Eligibility →</Link>
      </button>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#94a3b8] hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[52px] left-0 right-0 bg-[var(--navy)] border-t border-[#1e3a5f] md:hidden">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 text-sm border-b border-[#1e3a5f] ${
                  isActive(link.href) ? 'text-white' : 'text-[#94a3b8]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/eligibility-checker"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-[var(--orange)] text-white text-sm font-semibold px-4 py-2 rounded-md text-center"
            >
              Check Eligibility →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
