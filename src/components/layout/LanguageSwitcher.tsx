'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'

export interface Language {
  code: string
  label: string
  nativeName: string
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
]

declare global {
  interface Window {
    google?: any
    googleTranslateElementInit?: () => void
  }
}

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 1. Read existing cookie if set
    const cookies = document.cookie.split(';')
    const googtransCookie = cookies.find((c) => c.trim().startsWith('googtrans='))
    if (googtransCookie) {
      const match = googtransCookie.split('=')[1]
      const langCode = match.split('/')[2] || 'en'
      setCurrentLang(langCode)
    }

    // 2. Initialize Google Translate script
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr,gu,ta,te,bn,kn,pa,ml',
              autoDisplay: false,
            },
            'google_translate_element'
          )
        }
      }

      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    // Close on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)

    // Set standard googtrans cookies for main and subdomains
    const domain = window.location.hostname
    if (langCode === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${domain};`
    }

    // Trigger translate or reload to apply
    window.location.reload()
  }

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0]

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200 bg-white transition-all shadow-2xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-3.5 h-3.5 text-zinc-500" />
        <span className="font-semibold text-zinc-900">{activeLang.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
          <div className="px-2 py-1 text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-100 mb-1">
            Select Language / भाषा
          </div>
          <div className="max-h-60 overflow-y-auto space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-medium'
                      : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                  }`}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>
                      ({lang.label})
                    </span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
