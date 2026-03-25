import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-[#94a3b8] px-6 py-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* About Column */}
          <div className="md:col-span-2">
            <div className="font-['Syne'] text-xl font-extrabold text-white mb-2">
              MSME<span className="text-[var(--orange)]">Vault</span>
            </div>
            <p className="text-[13px] leading-relaxed mb-3">
              India's most comprehensive directory of government schemes, loans & subsidies for MSME owners.
            </p>
            <div className="text-xs">
              📧 aditybiz350@gmail.com &nbsp;|&nbsp; 📞 +91 9373238164
            </div>
          </div>

          {/* Schemes Column */}
          <div>
            <h4 className="text-white text-[13px] font-bold mb-3">Schemes</h4>
            <div className="flex flex-col gap-[7px]">
              <Link href="/schemes?type=central" className="text-xs hover:text-white cursor-pointer transition-colors">
                Central Schemes
              </Link>
              <Link href="/schemes?type=state" className="text-xs hover:text-white cursor-pointer transition-colors">
                State Schemes
              </Link>
              <Link href="/schemes" className="text-xs hover:text-white cursor-pointer transition-colors">
                Startup India
              </Link>
              <Link href="/schemes" className="text-xs hover:text-white cursor-pointer transition-colors">
                Mudra Loans
              </Link>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-white text-[13px] font-bold mb-3">Tools</h4>
            <div className="flex flex-col gap-[7px]">
              <Link href="/eligibility-checker" className="text-xs hover:text-white cursor-pointer transition-colors">
                Eligibility Checker
              </Link>
              <Link href="/loans" className="text-xs hover:text-white cursor-pointer transition-colors">
                Loan Compare
              </Link>
              <Link href="/guides" className="text-xs hover:text-white cursor-pointer transition-colors">
                Doc Checklist
              </Link>
              <Link href="/guides" className="text-xs hover:text-white cursor-pointer transition-colors">
                EMI Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1e3a5f] pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs">
            © 2025 MSMEVault.in · Not affiliated with Government of India
          </p>
          <p className="text-xs">
            Privacy Policy · Disclaimer · Sitemap
          </p>
        </div>
      </div>
    </footer>
  )
}
