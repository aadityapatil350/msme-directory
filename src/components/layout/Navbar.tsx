'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Menu,
  X,
  ChevronDown,
  Calculator,
  Percent,
  FileCheck,
  ArrowRight,
} from 'lucide-react'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      {/* Statutory Trust Ribbon */}
      <div className="bg-zinc-50 border-b border-zinc-200/60 text-zinc-500 text-[11px] font-medium py-1 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
          <span>
            Independent Educational Portal &bull; Sourced from Official Gazette &bull; Scheme Registrations are 100% Free
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center text-white font-bold text-xs shadow-2xs transition-transform group-hover:scale-105">
              V
            </div>
            <div className="flex items-baseline">
              <span className="font-bold text-base tracking-tight text-zinc-950">
                MSME<span className="font-normal text-zinc-500">Vault</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono ml-1">.in</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                pathname === '/'
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/schemes"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/schemes')
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Schemes
            </Link>

            <Link
              href="/loans"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/loans')
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Loan Rates
            </Link>

            <Link
              href="/guides"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/guides')
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Policy Guides
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/blog')
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              Blog
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive('/tools') || isActive('/eligibility-checker')
                    ? 'text-zinc-950 bg-zinc-100 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                <span>Calculators</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${toolsOpen ? 'rotate-180 text-zinc-950' : 'text-zinc-400'}`} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 w-72 bg-white border border-zinc-200 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                  <Link
                    href="/tools/emi-calculator"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-md bg-zinc-100 text-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calculator className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-xs text-zinc-950">MSME EMI Calculator</div>
                      <div className="text-[11px] text-zinc-500">Loan payments &amp; amortization</div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/subsidy-calculator"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-md bg-zinc-100 text-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Percent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-xs text-zinc-950">PMEGP Subsidy Calculator</div>
                      <div className="text-[11px] text-zinc-500">15%–35% margin money grants</div>
                    </div>
                  </Link>

                  <Link
                    href="/eligibility-checker"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-50 transition-colors border-t border-zinc-100 mt-1 pt-2"
                  >
                    <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-medium text-xs text-zinc-950">Scheme Matcher</div>
                      <div className="text-[11px] text-zinc-500">Find eligible schemes in 60s</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/consultants"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/consultants')
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              <span>CA Directory</span>
              <span className="ml-1.5 text-[9px] font-mono uppercase bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">
                Beta
              </span>
            </Link>

            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/about')
                  ? 'text-zinc-950 bg-zinc-100 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSwitcher />

            <Link
              href="/tools/emi-calculator"
              className="text-xs font-medium text-zinc-700 hover:text-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-white transition-colors"
            >
              EMI Calc
            </Link>

            <Link
              href="/eligibility-checker"
              className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-2xs transition-all flex items-center gap-1.5"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-5 space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            Home
          </Link>
          <Link
            href="/schemes"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            Browse Schemes
          </Link>
          <Link
            href="/loans"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            Loan Comparison
          </Link>
          <Link
            href="/guides"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            Policy Guides
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            Blog
          </Link>
          <Link
            href="/tools/emi-calculator"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            EMI Calculator
          </Link>
          <Link
            href="/tools/subsidy-calculator"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            PMEGP Subsidy Calculator
          </Link>
          <Link
            href="/consultants"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            CA Directory (Beta)
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-950 hover:bg-zinc-50"
          >
            About &amp; Editorial Policy
          </Link>

          <div className="pt-2 border-t border-zinc-100">
            <Link
              href="/eligibility-checker"
              onClick={() => setIsOpen(false)}
              className="w-full bg-zinc-950 text-white text-xs font-medium py-2.5 rounded-lg text-center flex items-center justify-center gap-1.5"
            >
              <span>Check Scheme Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
