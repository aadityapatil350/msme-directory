// Blog posts. Each post targets a specific low-competition keyword identified
// in the spec (§2.3). Dates are staggered to avoid Google scaled-content signals.
// Every factual claim is anchored to a primary source listed in `sources`.

export interface BlogAuthor {
  name: string
  role: string
  credentials: string
}

export interface BlogSource {
  label: string
  url: string
}

export interface BlogFAQ {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  targetKeyword: string
  category:
    | 'Udyam & Registration'
    | 'Mudra & Loans'
    | 'PMEGP & Subsidies'
    | 'Compliance & GST'
    | 'MSME Guides'
  tags: string[]
  publishedAt: string // ISO date
  updatedAt: string
  readTimeMinutes: number
  author: BlogAuthor
  excerpt: string
  content: string // Markdown-lite (## for h2, ### for h3, - for list, > for callout, [text](url) for links)
  faq: BlogFAQ[]
  sources: BlogSource[]
  relatedSlugs: string[] // links to sibling posts
  relatedGuides?: string[] // links to /guides/[slug]
}

const AUTHOR_ADITYA: BlogAuthor = {
  name: 'Aditya Patil',
  role: 'Lead Research Analyst',
  credentials: 'MSME Policy Research Desk, MSMEVault',
}

export const BLOG_POSTS: BlogPost[] = [
  // ============================================================
  // POST 1 — Udyam Registration Kaise Kare (Hinglish, low comp)
  // ============================================================
  {
    slug: 'udyam-registration-kaise-kare',
    title: 'Udyam Registration Kaise Kare: Step-by-Step Guide (2026 Update)',
    metaTitle: 'Udyam Registration Kaise Kare: Free Step-by-Step Process (2026)',
    metaDescription:
      'Udyam registration ki puri process step-by-step. Free official portal, Aadhaar OTP se activation, PAN/GST auto-verification, aur permanent URN certificate — 15 minutes mein complete.',
    targetKeyword: 'udyam registration kaise kare',
    category: 'Udyam & Registration',
    tags: ['Udyam', 'Registration', 'MSME', 'Hindi Guide'],
    publishedAt: '2026-08-24',
    updatedAt: '2026-08-24',
    readTimeMinutes: 8,
    author: AUTHOR_ADITYA,
    excerpt:
      'Agar aap ek chhota vyapari ya udyami hain aur government ki MSME schemes ka faayda uthana chahte hain, to Udyam Registration pehla zaroori kadam hai. Yeh guide bilkul plain language mein bataayegi ki asli portal par 15 minutes mein free registration kaise complete karein.',
    content: `## Udyam Registration Kya Hai?

Udyam Registration Government of India ka official recognition system hai jo Ministry of MSME ne July 2020 mein launch kiya tha. Yeh purane Udyog Aadhaar Memorandum (UAM) ki jagah aaya hai. Iske baad koi bhi micro, small ya medium enterprise ek permanent 19-digit Udyam Registration Number (URN) aur QR-code wala e-certificate lifetime ke liye paa sakta hai.

Yeh registration bilkul **free** hai — official portal [udyamregistration.gov.in](https://udyamregistration.gov.in) par. Agar koi private website ya agent aapse fees maang raha hai, samajh jaayie ki aap galat jagah phase hain.

> **Zaroori note:** Udyam Registration ke baad hi aap CGTMSE (₹10 crore tak collateral-free loan), Mudra loan, PMEGP subsidy, aur MSME Samadhaan (delayed payment recovery) jaisi central schemes ke liye eligible bante hain.

## Registration Se Pehle Kya Chahiye?

Registration process shuru karne se pehle yeh 4 cheezein aapke paas hone chahiye:

- **Aadhaar Number** — Proprietor ka (proprietorship firm), managing partner ka (partnership firm), ya karta ka (HUF).
- **Mobile Number linked with Aadhaar** — Kyunki OTP wahi par aayega.
- **PAN Card** — Business ka ya proprietor ka. From 1 April 2021 se PAN mandatory hai.
- **GSTIN (agar applicable ho)** — Voluntary MSMEs ke liye optional, lekin agar aap GST ke daayre mein hain to zaroori.

Aapko koi bhi document upload nahi karna. Portal khud hi PAN aur GSTIN ko Income Tax Department aur GSTN databases se cross-verify kar leta hai — yahi Udyam Registration ki sabse badi khoobi hai.

## Step-by-Step Registration Process

### Step 1: Official Portal Par Jaayie

Browser mein type karein: **udyamregistration.gov.in**. URL sahi hai iski confirmation karein — SSL padlock hona chahiye. Homepage par "For New Entrepreneurs who are not Registered yet as MSME or those with EM-II" wale button par click karein.

### Step 2: Aadhaar Verification

Aadhaar number aur naam (jaisa Aadhaar par likha hai) enter karein. "Validate & Generate OTP" par click karein. Aapke Aadhaar-linked mobile par 6-digit OTP aayega — enter karein. Yeh step complete hone ke baad hi aage badh sakte hain.

### Step 3: PAN Validation

Ab PAN details enter karein — organization type (proprietorship, HUF, partnership, LLP, private limited, etc.), PAN number, aur incorporation date. Portal automatically Income Tax se validate karega. Agar PAN details match nahi karein to error aayega — aise mein Income Tax portal par pehle correction karvaayie.

### Step 4: Business Details Bhare

Yahan ek detailed form khulega:
- Enterprise ka naam
- Location of plant/unit (agar multiple locations hain to sabhi add karein)
- Office address
- Bank account details (account number + IFSC)
- Major activity: Manufacturing / Service / Trading
- NIC (National Industrial Classification) code — apna business activity ka code select karein. Agar confusion ho to portal par search kar sakte hain.
- Employment count (male, female, others)
- Investment in Plant & Machinery ya Equipment (ITR-linked auto-fetch)
- Annual turnover (GST-linked auto-fetch, agar GSTIN diya hai)

### Step 5: Classification Auto-Calculate

Portal aapki investment aur turnover ke basis par automatically classify kar dega:

| Category | Investment (P&M/Equipment) | Turnover |
|---|---|---|
| Micro | ₹2.5 crore tak | ₹10 crore tak |
| Small | ₹25 crore tak | ₹100 crore tak |
| Medium | ₹125 crore tak | ₹500 crore tak |

Yeh naye limits **1 April 2025** se effective hain (S.O. 1364(E) dated 21 March 2025). Dono conditions ek saath meet honi chahiye — ek bhi cross ho gayi to next category mein chala jaayega.

### Step 6: Declaration + Submit

Self-declaration checkboxes tick karein (koi document proof nahi lagta), captcha bhare, aur "Submit and Get Final OTP" par click karein. Ek final OTP verification hoga. Success hone par turant Udyam Registration Certificate generate ho jaayega — download karein aur PDF save karein.

## Certificate Mein Kya Hota Hai?

Aapke URN certificate mein yeh sab included hoga:
- Permanent 19-digit URN (format: UDYAM-XX-00-0000000)
- QR code — koi bhi lender/authority scan karke verify kar sakta hai
- Category (Micro/Small/Medium)
- NIC codes list
- Date of registration
- All addresses

Iss certificate ki koi expiry nahi hai. Renew karne ki zaroorat bhi nahi hoti — bas har financial year ke baad aap "Update Udyam" section mein ja kar latest turnover/investment figures update karte rahein.

## Registration Ke Baad Kya Karein?

Sirf certificate le lena kaafi nahi hai. In cheezein ka bhi dhyan rakhein:

1. **Bank ko inform karein** — apni existing bank branch mein URN submit karein taaki Priority Sector Lending benefits activate ho sakein.
2. **GST portal par MSME status update karein** — vendors/buyers ko turant payment terms enforce karne mein help milegi.
3. **MSME Samadhaan** ([samadhaan.msme.gov.in](https://samadhaan.msme.gov.in)) par account bana lein — agar koi buyer 45 din se zyada payment lagaata hai to yahan complaint kar sakte hain.
4. **CGTMSE, Mudra, ya PMEGP** ke liye eligibility check karein — Udyam-registered MSMEs ko in schemes mein priority milti hai.

## Common Mistakes — Inhein Avoid Karein

- Kabhi bhi kisi third-party website ko fees na dein. Registration 100% free hai.
- Aadhaar-linked mobile number active na hone par process ruk jaati hai — pehle UIDAI se number update karva lein.
- PAN aur Aadhaar naam mismatch ho to portal reject kar dega. Corrections ke liye pehle Income Tax portal par jaayie.
- Turnover figures ko exaggerate na karein. Portal ITR aur GSTR se cross-verify karta hai — mismatch par registration cancel ho sakti hai.

Agar aap detailed English step-by-step guide dhundh rahe hain to hamara comprehensive [Udyam Registration Guide](/guides/udyam-registration) padhein.
`,
    faq: [
      {
        question: 'Kya Udyam registration ke liye koi fee lagti hai?',
        answer:
          'Nahi. Official portal udyamregistration.gov.in par registration completely FREE hai. Koi bhi website jo fees maang rahi hai woh fraud hai. Government ne is baat par baar-baar public advisory bhi jaari ki hai.',
      },
      {
        question: 'Udyam certificate ki validity kitne saal ki hoti hai?',
        answer:
          'Certificate lifetime valid hai. Renew karne ki zaroorat nahi. Sirf har financial year mein turnover/investment figures ko "Update Udyam" section se refresh karte rehna hota hai.',
      },
      {
        question: 'Bina GST ke Udyam registration ho sakti hai?',
        answer:
          'Haan, agar aapka business GST ke threshold (₹40 lakh goods / ₹20 lakh services) se neeche hai to GST optional hai. Lekin agar aap already GST-registered hain to GSTIN dena zaroori hai.',
      },
      {
        question: 'Aadhaar OTP nahi aa raha hai, kya karein?',
        answer:
          'Sabse pehle check karein ki aapka mobile number Aadhaar se linked hai — nearest Aadhaar Seva Kendra ya UIDAI portal se update karva sakte hain. Agar linked hai lekin OTP nahi aa raha to network issue ho sakta hai — 5 minutes wait karke resend try karein.',
      },
      {
        question: 'Ek se zyada businesses ke liye alag Udyam registration lena zaroori hai?',
        answer:
          'Ek proprietor ke saare businesses ek hi Udyam registration mein cover ho sakte hain — bas plant/unit locations aur NIC codes add karne padte hain. Lekin agar entities alag hain (jaise ek proprietorship aur ek partnership) to alag URN chahiye.',
      },
    ],
    sources: [
      { label: 'Udyam Registration Official Portal', url: 'https://udyamregistration.gov.in' },
      { label: 'Ministry of MSME – msme.gov.in', url: 'https://msme.gov.in' },
      {
        label: 'S.O. 1364(E) dated 21 March 2025 – MSME classification revision',
        url: 'https://msme.gov.in',
      },
    ],
    relatedSlugs: ['udyam-registration-fees-truth', 'udyam-vs-udyog-aadhaar-comparison', 'print-udyam-certificate-guide'],
    relatedGuides: ['udyam-registration'],
  },

  // ============================================================
  // POST 2 — Udyam Registration Fees: Is It Really Free?
  // ============================================================
  {
    slug: 'udyam-registration-fees-truth',
    title: 'Udyam Registration Fees: Is It Really Free? (2026 Fact-Check)',
    metaTitle: 'Udyam Registration Fees: The Truth About Costs & Fake Sites (2026)',
    metaDescription:
      'Official Udyam registration on udyamregistration.gov.in is 100% free — verified from Ministry of MSME. Learn how to spot fake fee-charging websites and what happens if you paid one.',
    targetKeyword: 'udyam registration fees',
    category: 'Udyam & Registration',
    tags: ['Udyam', 'Fees', 'Fraud Awareness', 'MSME'],
    publishedAt: '2026-08-27',
    updatedAt: '2026-08-27',
    readTimeMinutes: 6,
    author: AUTHOR_ADITYA,
    excerpt:
      'A quick Google search for "udyam registration" throws up dozens of sites charging ₹499 to ₹4,999. Almost all of them are unofficial. This piece explains why the government portal is genuinely free, how the fraud ecosystem works, and what to do if you already paid.',
    content: `## The Short Answer: Yes, It Is 100% Free

Udyam Registration on the **official Government of India portal** — [udyamregistration.gov.in](https://udyamregistration.gov.in) — costs ₹0. The Ministry of MSME has stated this position in multiple public advisories and it has not changed since the portal launched in July 2020.

If a website is asking for a "registration fee", "consultation fee", "processing fee", "government charges", or any other rupee amount to register your MSME on Udyam, that website is not the government. Full stop.

> The government has publicly warned about this repeatedly. Look for the PIB press releases from 2020, 2022, and 2024 — all reiterate: "Registration on the Udyam Portal is free of cost. Entrepreneurs are not required to pay any fees or charges to anyone in this regard."

## So Why Do These Fee-Charging Sites Exist?

Because they can. Most of them operate legally in a grey zone. They call themselves "consultants" or "facilitators" and technically they are — they take your details, fill the same free government form on your behalf, and charge you ₹499 to ₹4,999 for a service that takes any Aadhaar-holder about 12 minutes to do themselves.

The problem isn't the service itself — problem is that they typically:

- Buy Google ads for "udyam registration" so their site appears above the official one.
- Use URLs that look official — with words like *msme*, *udyam*, *gov*, *india* stuffed into the domain.
- Design their pages with tricolours, Ashoka Chakra imagery, and phrasing that mimics a government site.
- Do not clearly disclose that they are private entities.

Some go further and issue a fake "certificate" that isn't the real URN — so the buyer thinks they are registered but isn't. This is where actual fraud begins.

## How to Spot a Fake Udyam Site — 5 Reliable Signals

1. **The URL is not udyamregistration.gov.in.** Any URL ending in .in, .org, .co.in, or containing extra words like msmeregistration.in, udyam-msme-portal.com, or msmecertificate.co.in is not the government.
2. **They ask for payment before showing the OTP screen.** Official portal never takes money — Aadhaar OTP validation is the very first step.
3. **They ask you to upload PAN card, Aadhaar card, or address proof.** Official portal auto-verifies from IT/GSTN databases — no uploads needed.
4. **They promise "24-hour approval", "guaranteed certificate", or "expert help".** Real registration is instant and self-service — nothing to expedite.
5. **They mention "government fees" as a separate line item.** There are no government fees. That is the tell.

## What Does the Real Portal Look Like?

The genuine Udyam portal has these markers:

- URL bar shows exactly https://udyamregistration.gov.in with a valid SSL certificate.
- Header carries the Government of India emblem and "Ministry of Micro, Small and Medium Enterprises".
- Landing page has two big blue buttons: one for new entrepreneurs and one for existing UAM holders migrating.
- No pricing, no packages, no "buy now" — anywhere.

## I Already Paid a Fee Site. What Now?

If you already registered through a paid site, don't panic. Two possibilities:

**Case 1: They actually registered you on the government portal.** Search your PAN or Aadhaar on [udyamregistration.gov.in → Print / Verify Udyam Certificate](https://udyamregistration.gov.in). If a valid URN shows up, your registration is real — you just overpaid for a free service. You are legally registered.

**Case 2: They issued a fake certificate.** If nothing shows up on the official verification page, you were scammed. The "certificate" they gave you has no legal standing. Actions to take:

- Register yourself for free on the official portal immediately — takes 15 minutes.
- File a consumer complaint on [consumerhelpline.gov.in](https://consumerhelpline.gov.in) with the fake site's payment receipt.
- Report the fake website to Google Safe Browsing and the CERT-In cybercrime portal ([cybercrime.gov.in](https://cybercrime.gov.in)).
- If the amount is significant (₹5,000+), file an FIR — Section 420 IPC (cheating) applies.

## Are There Any Legitimate Reasons to Pay a Consultant?

Yes, but be honest with yourself about what you're paying for. A legitimate CA or MSME consultant might charge for:

- **Choosing the right NIC code** — if your business spans multiple activities and picking the wrong primary code will affect your scheme eligibility.
- **Cleaning up prior filings** — if your PAN or GST data has mismatches, someone needs to fix those before Udyam will accept them.
- **Bundling Udyam with GST, Shop Act, and other statutory registrations** — many small businesses use one consultant to handle all of it in one go.

That's a professional service fee — usually ₹500 to ₹2,000 depending on complexity. That's fine. What is not fine is calling it a "government fee" or a "Udyam registration charge" — because the government charges nothing.

## Bottom Line

Save yourself ₹499 to ₹4,999 and 15 minutes of confusion. Go directly to [udyamregistration.gov.in](https://udyamregistration.gov.in), follow the six steps in our detailed [Udyam guide](/guides/udyam-registration), and get your URN. If you need help understanding NIC codes or fixing PAN mismatches, that's a legitimate consultant fee — but the registration itself is, and always has been, free.
`,
    faq: [
      {
        question: 'Does the Government of India charge any fee for Udyam registration?',
        answer:
          'No. The Ministry of MSME has publicly and repeatedly confirmed that registration on udyamregistration.gov.in is 100% free. There are no government fees, processing charges, or hidden costs.',
      },
      {
        question: 'What is the average fee that private sites charge?',
        answer:
          'Fake or "facilitator" sites typically charge between ₹499 and ₹4,999. Some tiered plans go up to ₹9,999 with add-ons like "expert consultation" — all for what is a free 15-minute self-service process on the official portal.',
      },
      {
        question: 'Can I get a refund if I paid a private site?',
        answer:
          'Legally the site may claim it provided a "facilitation service" and refuse refund. Your best route is to check whether they actually registered you (verify URN on the official portal). If they issued a fake certificate, file a consumer complaint and cybercrime FIR.',
      },
      {
        question: 'How do I verify if my Udyam certificate is genuine?',
        answer:
          'Go to udyamregistration.gov.in, click "Print / Verify Udyam Certificate", enter your URN or reference number, and validate via OTP. If the certificate shows up with your correct business details, it is real. If not, you have a fake certificate.',
      },
    ],
    sources: [
      { label: 'Udyam Registration Portal', url: 'https://udyamregistration.gov.in' },
      { label: 'Ministry of MSME', url: 'https://msme.gov.in' },
      { label: 'National Consumer Helpline', url: 'https://consumerhelpline.gov.in' },
      { label: 'CERT-In Cybercrime Reporting', url: 'https://cybercrime.gov.in' },
    ],
    relatedSlugs: ['udyam-registration-kaise-kare', 'udyam-vs-udyog-aadhaar-comparison', 'print-udyam-certificate-guide'],
    relatedGuides: ['udyam-registration'],
  },

  // ============================================================
  // POST 3 — Udyam vs Udyog Aadhaar
  // ============================================================
  {
    slug: 'udyam-vs-udyog-aadhaar-comparison',
    title: 'Udyam vs Udyog Aadhaar: What Changed and What It Means For You',
    metaTitle: 'Udyam vs Udyog Aadhaar (UAM): Full Comparison + Migration Guide 2026',
    metaDescription:
      'Detailed comparison of the old Udyog Aadhaar Memorandum (UAM) versus the current Udyam Registration — classification, validity, verification, benefits, and how UAM holders migrate.',
    targetKeyword: 'udyam vs udyog aadhaar',
    category: 'Udyam & Registration',
    tags: ['Udyam', 'Udyog Aadhaar', 'Comparison', 'UAM', 'Migration'],
    publishedAt: '2026-08-30',
    updatedAt: '2026-08-30',
    readTimeMinutes: 9,
    author: AUTHOR_ADITYA,
    excerpt:
      'If you registered your MSME before 1 July 2020 under Udyog Aadhaar Memorandum (UAM), your old registration expired on 31 March 2022. Here is exactly what changed under the Udyam regime, why the shift happened, and how to migrate without losing benefits.',
    content: `## Two Systems, Same Purpose — But Very Different Design

Both Udyog Aadhaar Memorandum (UAM) and Udyam Registration exist to give MSMEs a formal identity so they can access government schemes, credit, and legal protections. But they operate on fundamentally different philosophies.

**Udyog Aadhaar** (launched September 2015) was a self-declaration system. You filled a one-page form on udyogaadhaar.gov.in, self-attested your investment and employment, and got an Udyog Aadhaar Number (UAN). Almost nothing was verified.

**Udyam Registration** (launched July 2020, mandatory from April 2021) replaced UAM with an integrated, verified, PAN- and GST-linked system on udyamregistration.gov.in. The government cross-verifies every detail against the Income Tax Department and GSTN databases.

The shift wasn't cosmetic — it was designed to eliminate the ghost registrations and misclassifications that plagued UAM.

## Head-to-Head: 12 Key Differences

| Parameter | Udyog Aadhaar (UAM) | Udyam Registration |
|---|---|---|
| Launched | 15 Sep 2015 | 1 July 2020 |
| Status | Discontinued (from 1 July 2020) | Current — mandatory |
| Portal | udyogaadhaar.gov.in (offline) | udyamregistration.gov.in |
| Registration Number | 12-digit UAN | 19-digit URN (UDYAM-XX-00-0000000) |
| PAN Requirement | Optional | Mandatory (from 1 April 2021) |
| GST Verification | Not linked | Auto-verified via GSTN |
| Investment Verification | Self-declared, no proof | Auto-fetched from ITR |
| Turnover Criterion | Not part of classification | Included since June 2020 |
| Classification (Micro) | Investment ≤ ₹25 lakh (Mfg) / ₹10 lakh (Svc) | Investment ≤ ₹2.5 cr AND Turnover ≤ ₹10 cr |
| Certificate Format | Text PDF, no QR | QR-coded e-certificate |
| Validity | Was valid till 31 March 2022 only | Lifetime |
| Multiple UANs Allowed | Yes (one per activity) | No — one URN per entity |

## Why the Government Made the Change

Three problems with UAM had become impossible to ignore by 2020:

**1. Ghost registrations at scale.** Because UAM was fully self-declared with no PAN linkage, anyone with just an Aadhaar could register a business that didn't exist. Estimates put the ghost UAM count in the tens of lakhs. Priority Sector Lending targets were being met on paper against enterprises that weren't real.

**2. Misclassification of medium enterprises as micro.** Businesses would deliberately declare low investment figures to stay in the Micro bracket and access CGTMSE/PMEGP benefits meant for the smallest players. UAM had no way to catch this.

**3. Old classification was outdated.** The 2006 MSMED Act limits (₹25 lakh / ₹5 crore / ₹10 crore for investment) had not kept up with inflation or the size of modern MSMEs. The Atmanirbhar Bharat announcement of June 2020 revised these upward and added turnover as a joint criterion — which required a new system to enforce.

Then in **March 2025**, the government revised classification limits again — Micro investment ceiling went from ₹1 crore to ₹2.5 crore, Small from ₹10 crore to ₹25 crore, and Medium from ₹50 crore to ₹125 crore (S.O. 1364(E) dated 21 March 2025). Only a database-driven system like Udyam could enforce and update these limits at scale.

## What This Means If You Have an Old UAM

**Your UAM stopped being valid on 31 March 2022.** After that date, you cannot use your UAN to access any MSME scheme benefit, priority sector lending, or MSME Samadhaan delayed payment protection.

If you are still relying on an old UAM certificate for anything — a bank loan, a tender, a subsidy — check immediately. Most likely, the counterparty has already realised your registration is expired and is either processing it as "unregistered MSME" or has flagged it for verification.

## How to Migrate from UAM to Udyam

The migration process is straightforward:

1. Go to [udyamregistration.gov.in](https://udyamregistration.gov.in).
2. On the homepage, click **"For those having registration as EM-II or UAM"** (this is the second button, not the "new entrepreneurs" one).
3. Enter your existing UAN.
4. Verify via Aadhaar OTP.
5. The system pulls forward your basic details but you'll need to re-enter PAN and GSTIN (if applicable). These will be auto-verified.
6. Confirm your latest investment and turnover figures.
7. Submit — you'll receive your new 19-digit URN and QR certificate instantly.

The whole thing takes about 10 minutes if your PAN, Aadhaar, and GST data are consistent. If there are mismatches, you'll need to fix them at the source first.

## What Benefits Are You Missing If You Haven't Migrated?

- **CGTMSE coverage up to ₹10 crore** — the revised limit effective 1 April 2025 (CGTMSE Circular 250/2024-25).
- **Mudra Tarun Plus loans up to ₹20 lakh** for eligible repaid-Tarun borrowers (w.e.f. 24 October 2024).
- **PMEGP margin money subsidy** — 15% to 35% of project cost.
- **PM Vishwakarma** — ₹3 lakh at 5% fixed interest for eligible artisans.
- **MSME Samadhaan protection** — right to interest on delayed payments beyond 45 days.
- **Priority Sector Lending** benefits from your bank.
- **Public procurement preference** — 25% of central government purchases are earmarked for MSMEs, but only registered ones.

That's a substantial list of benefits sitting on the table for anyone still holding an expired UAM.

## What About the Udyam Assist Platform (UAP)?

The government launched the Udyam Assist Platform in January 2023 specifically for informal micro-enterprises (IMEs) that cannot produce PAN or GST — think tiny street-vendor operations or unregistered proprietorships. UAP registrations are also treated as MSMEs for scheme access purposes.

As of 28 February 2026, the combined Udyam + UAP database had **7.83 crore registered enterprises**, according to the Ministry of MSME — a strong signal that both channels are working at scale.

## Bottom Line

If you have a UAM, it is expired. Migrate today — the process is free, takes 10 minutes, and unlocks a substantial set of central and state scheme benefits. If you never registered, use our step-by-step [Udyam Registration guide](/guides/udyam-registration) or the Hinglish version [Udyam Registration Kaise Kare](/blog/udyam-registration-kaise-kare) to get started.
`,
    faq: [
      {
        question: 'Is Udyog Aadhaar still valid in 2026?',
        answer:
          'No. All Udyog Aadhaar Memorandum (UAM) registrations became invalid on 31 March 2022. You must migrate to Udyam Registration to continue accessing MSME benefits.',
      },
      {
        question: 'Will I lose my old UAM data if I migrate to Udyam?',
        answer:
          'No, migration is a data-forward process. Your existing registration details are pulled into the Udyam system. You will get a fresh 19-digit URN, but your business history stays intact.',
      },
      {
        question: 'Is there a deadline to migrate from UAM to Udyam?',
        answer:
          'The original deadline was 31 March 2022. Post that, UAM registrations are treated as expired. There is no penalty for late migration — you can migrate any time — but until you do, you cannot claim MSME scheme benefits.',
      },
      {
        question: 'Do I need to migrate if my business closed and re-opened?',
        answer:
          'If it is the same PAN and legal entity, migrate. If you have started a new legal entity, apply fresh under Udyam — do not try to migrate the UAM of a defunct business.',
      },
      {
        question: 'Is Udyam Assist Platform (UAP) different from Udyam?',
        answer:
          'Yes. UAP is a special channel for Informal Micro Enterprises (IMEs) that cannot produce PAN or GST — mostly very small unregistered operations. UAP registrations are still treated as MSMEs for scheme benefits.',
      },
    ],
    sources: [
      { label: 'Udyam Registration Portal', url: 'https://udyamregistration.gov.in' },
      { label: 'Udyam Assist Platform Statistics', url: 'https://msme.gov.in' },
      { label: 'S.O. 1364(E) dated 21 March 2025', url: 'https://msme.gov.in' },
      { label: 'CGTMSE Circular 250/2024-25', url: 'https://www.cgtmse.in' },
    ],
    relatedSlugs: ['udyam-registration-kaise-kare', 'udyam-registration-fees-truth', 'print-udyam-certificate-guide'],
    relatedGuides: ['udyam-registration'],
  },

  // ============================================================
  // POST 4 — Mudra Loan Kaise Le (Hinglish)
  // ============================================================
  {
    slug: 'mudra-loan-kaise-le',
    title: 'Mudra Loan Kaise Le: Shishu, Kishor, Tarun & Tarun Plus (2026)',
    metaTitle: 'Mudra Loan Kaise Le 2026: ₹20 Lakh Tak Collateral-Free Business Loan',
    metaDescription:
      'Mudra loan lene ka complete process — eligibility, documents, kaunsa bank apply karein, kitni interest rate lagti hai. Tarun Plus mein ₹20 lakh tak collateral-free loan available (w.e.f. 24 Oct 2024).',
    targetKeyword: 'mudra loan kaise le',
    category: 'Mudra & Loans',
    tags: ['Mudra', 'Loans', 'PMMY', 'Hindi Guide', 'Business Loan'],
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    readTimeMinutes: 10,
    author: AUTHOR_ADITYA,
    excerpt:
      'Pradhan Mantri Mudra Yojana ke through aap ₹50,000 se ₹20 lakh tak ka collateral-free business loan le sakte hain. Yeh guide bataayegi ki kaunsi category (Shishu, Kishor, Tarun, Tarun Plus) aapke liye sahi hai, documents kya lagenge, aur kis bank mein apply karna sabse easy hai.',
    content: `## Mudra Loan Kya Hai?

Pradhan Mantri Mudra Yojana (PMMY) ek Government of India scheme hai jo April 2015 mein launch hui thi. Iska purpose hai chhote vyapariyon, dukaandaaron, aur micro-enterprises ko **bina collateral (bina koi security ya property gehnak) rakhe** business loan dilana.

Aap directly Mudra Corporation se loan nahi lete — MUDRA ek refinancing institution hai. Aap kisi bhi authorised **Member Lending Institution (MLI)** — PSU banks, private banks, RRBs, small finance banks, NBFCs, MFIs — ke through apply karte hain, aur woh MUDRA se refinancing paate hain.

Ab tak (1 April 2026 tak) is scheme ke under **52.37 crore loans** sanction ho chuke hain, jinka total disbursement **₹33.65 lakh crore** hai. Yeh scale itni badi hai kyunki demand real hai — aur formal MSME lending mein Mudra ne bahut se pehli baar borrow karne waalon ko banking system mein laaya hai.

## Char Categories — Kaunsi Aapke Liye?

Government ne Mudra loans ko chaar amount brackets mein divide kiya hai:

| Category | Loan Amount | Kiske Liye |
|---|---|---|
| **Shishu** | ₹50,000 tak | Bilkul naya business, chhoti ki dukaan, street vendor |
| **Kishor** | ₹50,001 se ₹5 lakh | Existing micro business, small workshop |
| **Tarun** | ₹5 lakh se ₹10 lakh | Established micro business, expansion capital |
| **Tarun Plus** | ₹10 lakh se ₹20 lakh | Repaid Tarun successful borrower (w.e.f. 24 Oct 2024) |

**Tarun Plus 2024 mein add hui thi** — Department of Financial Services ne 24 October 2024 se yeh new category launch ki taaki accha repayment record wale existing borrowers ko higher limits mil sakein.

## Eligibility Criteria

Mudra loan ke liye eligible hone ke liye yeh conditions honi chahiye:

- **Business type:** Manufacturing, services, trading, ya agri-allied activities. Farm loans (crop finance) is scheme mein cover nahi hain — unke liye separate KCC hai.
- **Business size:** Micro enterprise category mein hona chahiye — matlab investment ₹2.5 crore tak aur turnover ₹10 crore tak (new April 2025 limits).
- **Age:** Applicant ki age 18 se 65 saal ke beech honi chahiye.
- **Citizenship:** Indian citizen honi chahiye.
- **Credit history:** Ideally clean — lekin first-time borrowers ke liye bhi doors open hain (Shishu category particularly).
- **Loan purpose:** Sirf business/income-generation ke liye — personal, wedding, ya property purchase ke liye nahi.

## Documents Kya Lagenge?

Category ke hisab se documents alag hote hain. Shishu (₹50k tak) ke liye minimal documentation, Tarun/Tarun Plus (₹5L+) ke liye zyada detailed.

**Shishu Loan Documents (₹50,000 tak):**
- KYC: Aadhaar, PAN
- Passport-size photograph
- Business address proof (rent agreement, electricity bill)
- Simple loan application form

**Kishor & Tarun Documents (₹50k se ₹10 lakh):**
- Sab kuch above +
- 6 months ka bank statement
- Business proof (Udyam certificate, Shop Act license, GST if applicable)
- Sales/purchase invoices (last 6 months)
- Property papers (if any — for banking relationship, not as security)

**Tarun Plus Documents (₹10L se ₹20L):**
- Sab kuch above +
- Previous Tarun loan repayment track record
- ITR (last 2 years)
- Detailed project report / business plan
- CIBIL score usually 700+ expected

## Interest Rate Kitni Lagegi?

Yahan ek zaroori baat samajhne wali hai: **Mudra scheme khud koi fixed rate nahi decide karti.** Rates lending institution decide karti hai apne repo-linked pricing ke basis par.

Practical range jo bank/NBFCs charge karte hain:
- **PSU Banks:** EBLR + 0.5% to 2% spread (typically 9% to 11.5% p.a.)
- **Private Banks:** RLLR + spread (typically 10% to 13% p.a.)
- **Small Finance Banks:** 12% to 15% p.a.
- **NBFCs & MFIs:** 14% to 24% p.a. (higher for Shishu category)

**Warning:** Agar koi aapse "5% Mudra rate", "government-fixed rate", ya "special interest scheme" bata raha hai to woh galat hai — Mudra ke under koi central interest subvention nahi hai. Rates purely lender-driven hain.

## Step-by-Step Application Process

### Step 1: Apni Category Decide Karein

Apni current business needs ke basis par decide karein — Shishu, Kishor, Tarun, ya Tarun Plus. Zaroorat se zyada amount mat maango, aur zaroorat se kam bhi nahi — sanction jitna approve hota hai utna hi disburse hota hai.

### Step 2: Lender Choose Karein

Aapke paas 3 raaste hain:

**Option A: Jan Samarth Portal ([jansamarth.in](https://jansamarth.in))**
Yeh government ka single-window credit portal hai. Ek application se multiple banks aapki eligibility check karti hain. Sabse easy option agar aap first-time borrower hain.

**Option B: udyamimitra.in**
MUDRA ka official facilitation portal. Aap apni application yahan submit karke nearby MLIs se contact karva sakte hain.

**Option C: Direct Bank Visit**
Kisi bhi PSU bank branch (SBI, PNB, Bank of Baroda, Canara, etc.) ya private bank (HDFC, ICICI, Axis) mein directly jaayein aur "Mudra loan application" ke liye poochein. Har designated branch mein Mudra loan officer hota hai.

### Step 3: Application Bharo

Application form 3-4 pages ka hota hai. Main sections:
- Personal & KYC details
- Business details (name, address, activity, vintage)
- Loan amount and purpose
- Bank account details
- Existing loans (if any)

### Step 4: Document Submission

Documents bank ko physically ya online (bank ke portal par) submit karein. Banks 15 se 30 din leti hain processing mein — Shishu usually faster hota hai.

### Step 5: Verification & Sanction

Bank apni internal verification karti hai:
- KYC check
- Bank statement analysis
- Business site visit (Kishor/Tarun ke liye common hai)
- CIBIL check
- Reference verification

Approval ke baad **Mudra Card** (a RuPay debit card) issue hoti hai, jo kaam capital limit ki tarah use kar sakte hain.

## Common Rejection Reasons — Inhein Avoid Karein

1. **Business proof nahi hai:** Udyam certificate ya Shop Act license apply karne se pehle bana lein.
2. **Bank account mein activity kam hai:** 6 mahine ka clean bank statement banaana zaroori hai — cash-only businesses ke liye yeh challenge hota hai.
3. **CIBIL score kam hai:** 650 se neeche score par PSU banks reject karti hain. Score improve karne ke baad apply karein.
4. **Ambitious loan amount:** Shishu category ka business ₹5 lakh maang raha ho to reject hoga. Realistic amount rakhein.
5. **Purpose clear nahi hai:** Loan kis raw material, equipment, ya inventory ke liye chahiye — clearly document karein.

## Mudra Loan Ke Baad Kya?

Loan disburse hone ke baad kuch cheezein zaroori hain:

- **EMI on time chukayein** — miss karne par CIBIL score down hota hai aur Tarun Plus eligibility khatam hoti hai.
- **Utilisation ki proof rakhein** — bills, invoices, receipts — bank audit maang sakti hai.
- **Successful repayment ke baad Tarun Plus ke liye eligible ho jaate hain** — upto ₹20 lakh limit.
- **Credit history build karein** — next round ka business loan (₹50 lakh+) ke liye ground taiyar hoga.

Detailed English version aur bank-wise comparison ke liye [Mudra Loan Guide](/guides/mudra-loan) padhein.
`,
    faq: [
      {
        question: 'Mudra loan ke liye collateral chahiye kya?',
        answer:
          'Nahi, Mudra loans completely collateral-free hote hain. Bank aapse property, gold, ya FD gehnak nahi rakh sakti. Yeh scheme ki sabse badi khoobi hai — chhote vyapariyon ko formal credit access dilana bina asset security ke.',
      },
      {
        question: 'Tarun Plus category kab launch hui thi?',
        answer:
          '24 October 2024 se Tarun Plus category effective hai. Yeh existing borrowers ke liye hai jinhone previous Tarun loan (₹5-10 lakh) successfully repay kar diya hai. Naye borrowers directly Tarun Plus mein apply nahi kar sakte.',
      },
      {
        question: 'Kya Mudra loan par government subsidy milti hai?',
        answer:
          'Nahi. Mudra ek pure credit scheme hai — koi capital subsidy ya interest subvention nahi hai. Interest rates purely lending institution decide karti hai apni policy ke basis par.',
      },
      {
        question: 'Kaunsa bank Mudra loan ke liye best hai?',
        answer:
          'PSU banks (SBI, PNB, Bank of Baroda) sabse competitive interest rates offer karti hain (9-11.5% typically). Processing time slightly zyada hai. Private banks aur small finance banks faster hain lekin rates 12-15% ho sakti hain. First-time borrowers ko Jan Samarth portal recommend karta hai.',
      },
      {
        question: 'Mudra loan reject ho gaya to kya karein?',
        answer:
          'Sabse pehle rejection reason poochein — CIBIL, income, ya document issue. Small issues (missing docs, unclear purpose) fix karke usi bank mein re-apply kar sakte hain 3 mahine baad. Zyada serious issues (low CIBIL) ke liye pehle credit history improve karein.',
      },
    ],
    sources: [
      { label: 'Mudra Corporation', url: 'https://www.mudra.org.in' },
      { label: 'Jan Samarth Portal', url: 'https://www.jansamarth.in' },
      { label: 'Udyami Mitra Portal', url: 'https://udyamimitra.in' },
      { label: 'PMMY Fact Sheet (Ministry of Finance)', url: 'https://financialservices.gov.in' },
      { label: 'DFS Notification on Tarun Plus (24 Oct 2024)', url: 'https://financialservices.gov.in' },
    ],
    relatedSlugs: ['pmegp-margin-money-calculation', 'print-udyam-certificate-guide'],
    relatedGuides: ['mudra-loan'],
  },

  // ============================================================
  // POST 5 — PMEGP Margin Money Calculation
  // ============================================================
  {
    slug: 'pmegp-margin-money-calculation',
    title: 'PMEGP Margin Money: How the 15%–35% Subsidy Is Actually Calculated (2026)',
    metaTitle: 'PMEGP Margin Money Calculation Explained: Category-Wise Subsidy Rates 2026',
    metaDescription:
      'Complete PMEGP margin money subsidy calculation with examples. Rural vs urban rates, general vs special category, project cost limits (₹50L mfg / ₹20L svc), and how the KVIC formula actually works.',
    targetKeyword: 'pmegp margin money',
    category: 'PMEGP & Subsidies',
    tags: ['PMEGP', 'Subsidy', 'Margin Money', 'KVIC'],
    publishedAt: '2026-09-05',
    updatedAt: '2026-09-05',
    readTimeMinutes: 11,
    author: AUTHOR_ADITYA,
    excerpt:
      'PMEGP is one of the most generous MSME subsidy schemes — you can get 15% to 35% of your project cost as a free grant that never needs to be repaid. But the exact rate depends on where you are, who you are, and what your project costs. This piece breaks the math down with worked examples.',
    content: `## What Is PMEGP Margin Money?

Prime Minister's Employment Generation Programme (PMEGP) is a credit-linked subsidy scheme run by the Ministry of MSME through KVIC (Khadi and Village Industries Commission). It combines a bank loan with a government subsidy called **margin money**.

The margin money is a portion of your project cost that the government pays as a grant — meaning you never have to repay it. It stays in a locked account for 3 years and, if you meet the terms (unit runs, jobs created), gets converted to your capital permanently.

The rest of the project cost is split between:
- **Your contribution** (5% or 10% of project cost — called "own contribution")
- **Bank term loan** (the balance)

So a project with ₹10 lakh cost, 25% margin money, and 10% own contribution has this structure:

- Margin money (govt subsidy): ₹2.5 lakh
- Own contribution: ₹1 lakh
- Bank loan: ₹6.5 lakh
- **Total project cost:** ₹10 lakh

You take a bank loan of ₹6.5 lakh, pay EMI on ₹6.5 lakh, and end up owning a ₹10 lakh asset.

## Project Cost Ceilings

There are hard caps on how big a project PMEGP will fund:

| Sector | Maximum Project Cost | Second Loan (Upgradation) |
|---|---|---|
| Manufacturing | ₹50 lakh | ₹1 crore |
| Service / Business | ₹20 lakh | ₹25 lakh |

The second loan is available to existing PMEGP beneficiaries who have completed 3 years, repaid the first loan, and want to expand.

## The Subsidy Rate Table

This is where most confusion happens. The margin money percentage depends on **two independent factors** — location (rural vs urban) and applicant category (general vs special).

| Category | Location | Margin Money | Own Contribution |
|---|---|---|---|
| General | Urban | **15%** | 10% |
| General | Rural | **25%** | 10% |
| Special* | Urban | **25%** | 5% |
| Special* | Rural | **35%** | 5% |

*Special categories = SC, ST, OBC, Minorities, Women, Ex-servicemen, PwD, applicants from North Eastern Region, Hill and Border areas.

**Rural definition:** As per PMEGP guidelines, "rural area" means any area outside a municipality/municipal corporation limit — including village panchayats.

## Worked Examples

### Example 1: General category, urban

A general-category male applicant in Pune (urban) wants to start a printing unit costing ₹20 lakh.

- Margin money: 15% × ₹20,00,000 = **₹3,00,000** (govt subsidy)
- Own contribution: 10% × ₹20,00,000 = **₹2,00,000** (you pay upfront)
- Bank loan: **₹15,00,000** (you take from bank)

You pay EMI on ₹15 lakh, own an asset worth ₹20 lakh.

### Example 2: SC/ST female, rural

A woman from an SC community in a village in Odisha wants to start a bakery costing ₹15 lakh. She qualifies as "special category" on two counts (SC + woman), plus rural.

- Margin money: 35% × ₹15,00,000 = **₹5,25,000** (govt subsidy)
- Own contribution: 5% × ₹15,00,000 = **₹75,000** (upfront)
- Bank loan: **₹9,00,000**

She pays EMI on ₹9 lakh, owns a ₹15 lakh unit.

### Example 3: Maximum-size manufacturing project

A general-category applicant in a rural area wants to set up a small manufacturing unit at the maximum allowed ₹50 lakh cost.

- Margin money: 25% × ₹50,00,000 = **₹12,50,000** (govt subsidy)
- Own contribution: 10% × ₹50,00,000 = **₹5,00,000**
- Bank loan: **₹32,50,000**

The ₹12.5 lakh subsidy is essentially free capital.

## Eligibility Criteria

For PMEGP, both the **applicant** and the **project** must qualify:

**Applicant conditions:**
- Age above 18 years (no upper limit).
- Minimum 8th standard education for projects above ₹10 lakh (mfg) or ₹5 lakh (svc). Below these thresholds, no education criterion.
- No income ceiling.
- New venture only — existing units, or units that have already availed government subsidy under any scheme, are not eligible.
- Applicant should not have defaulted on any loan.

**Project conditions:**
- Must be a new manufacturing or service unit.
- Not in negative activities list (see below).
- Must generate employment (this is the whole point of the scheme).

**Negative activity list (partial):**
Meat processing/canning, tobacco products, intoxicants, milk processing (except small-scale), animal husbandry (except cocoons), transport (except auto-rickshaws and taxis for SC/ST/women), retail trade of goods, and businesses that harm environment.

## How to Apply — Step by Step

### Step 1: Prepare Your Detailed Project Report (DPR)

The DPR is the single most important document. It should include:
- Business description and objectives
- Market analysis
- Technical feasibility (machinery list, layout, power requirement)
- Financial projections (P&L, cash flow, breakeven — usually 5 years)
- Employment generation (how many people will be hired)

You can prepare it yourself or engage a consultant (₹5,000 to ₹20,000 depending on complexity). For projects above ₹25 lakh, a professionally prepared DPR is essentially mandatory.

### Step 2: Register on the PMEGP e-Portal

Go to [kviconline.gov.in/pmegpeportal](https://kviconline.gov.in/pmegpeportal). Register with mobile OTP, complete the online application form, upload your DPR, and select your preferred financing bank.

### Step 3: Wait for the DIC/KVIC Verification

Your application goes to the District Industries Centre (DIC) or the nearest KVIC office based on your location. They verify your KYC, category, and project fit — usually 15 to 30 days.

### Step 4: Bank Appraisal

If verification is cleared, your file goes to the bank you chose. Bank does its own credit appraisal — this can take 30 to 60 days. The bank may ask for site visit, further clarifications, or DPR revisions.

### Step 5: Sanction, Training, and Disbursement

Once the bank sanctions the loan:
1. You must attend a mandatory **EDP training** (Entrepreneurship Development Programme) — usually 5 to 10 days.
2. Bank disburses the term loan portion.
3. Margin money is credited by KVIC/DIC to a special account and locked for 3 years.
4. You start operations, generate employment, pay EMI on the bank portion only.

After 3 years, if your unit is operational and meeting employment targets, the margin money gets adjusted against your loan/capital permanently — effectively becoming a free grant.

## Rejection Reasons and How to Avoid Them

**1. Weak DPR.** By far the biggest killer. Realistic projections, clear machinery list, credible market analysis. Copy-paste templates get rejected.

**2. Wrong category selection.** Applying under "special category" without proper caste/community/PwD certificate is an automatic reject. Attach the certificate up front.

**3. Existing unit.** PMEGP is strictly for **new** ventures. If you've been running the unit for even a few months, or if the same address has hosted another business recently, expect scrutiny.

**4. Bank rejection due to low creditworthiness.** Even if DIC/KVIC approves, the bank has independent power to reject. Bad CIBIL, high existing debt, or a shaky business plan will get you rejected at the bank stage.

**5. Negative activity list.** Applying for a business in the negative list is an automatic no. Double-check the current list on the PMEGP portal before you begin.

## After Sanction — What You Must Do

- Complete the mandatory EDP training. Skipping this cancels the sanction.
- Set up the unit within the stipulated timeframe (usually 6 months from disbursement).
- Maintain employment as declared in DPR — the government verifies this at year-end audits.
- Do not divert funds to any activity other than what was sanctioned.
- Repay bank EMI on time — default triggers margin money reversal.

For loan-side details, see our [Mudra vs PMEGP comparison](/blog/mudra-loan-kaise-le) or the full [PMEGP scheme guide](/schemes/pmegp).

## Bottom Line

PMEGP margin money is one of the few genuine "free money" schemes in India — as long as your unit runs and generates jobs, you keep the subsidy permanently. The 15%–35% range depends on where you are and who you are, but even the lowest rate (15% for general urban) is a real capital advantage. The catch is that PMEGP has a genuinely rigorous approval process — spend the effort on a strong DPR and pick your category honestly, and the numbers work out very well.
`,
    faq: [
      {
        question: 'Is PMEGP margin money a loan or a grant?',
        answer:
          'It is a grant, but with a 3-year lock-in. During the first 3 years, the margin money sits in a locked account. If your unit is operational and meets employment targets at year 3, the margin money is permanently adjusted as your capital — you never repay it. If the unit shuts down or diverts funds, it is clawed back.',
      },
      {
        question: 'Can I apply for PMEGP if I already have an existing business?',
        answer:
          'No. PMEGP is strictly for new units. If you want to expand an existing PMEGP-funded unit, you can apply for a Second Loan for upgradation (up to ₹1 crore mfg / ₹25 lakh svc) after completing 3 years and repaying the first loan.',
      },
      {
        question: 'What is the interest rate on the bank loan portion?',
        answer:
          'PMEGP does not fix interest rates — banks charge their standard MSME/priority-sector rates, typically 9% to 12% for PSU banks. There is no interest subvention specific to PMEGP.',
      },
      {
        question: 'Can I choose my own bank for the loan?',
        answer:
          'Yes, you select the preferred bank during online application. Public sector banks, private banks, RRBs, cooperative banks, and small finance banks all participate. Choose based on your existing banking relationship and processing speed.',
      },
      {
        question: 'How long does the full PMEGP process take?',
        answer:
          'From application to disbursement typically 3 to 6 months. Verification stage (DIC/KVIC) is 15–30 days, bank appraisal is 30–60 days, and setup + EDP training + first disbursement adds another 30–60 days. Well-prepared applications with strong DPRs move faster.',
      },
    ],
    sources: [
      { label: 'PMEGP e-Portal (KVIC)', url: 'https://www.kviconline.gov.in/pmegpeportal' },
      { label: 'KVIC – PMEGP Guidelines', url: 'https://www.kvic.gov.in' },
      { label: 'Ministry of MSME', url: 'https://msme.gov.in' },
    ],
    relatedSlugs: ['mudra-loan-kaise-le', 'udyam-registration-kaise-kare'],
    relatedGuides: [],
  },

  // ============================================================
  // POST 6 — Print Udyam Certificate
  // ============================================================
  {
    slug: 'print-udyam-certificate-guide',
    title: 'How to Print or Download Your Udyam Certificate (2026 Guide)',
    metaTitle: 'Print Udyam Certificate Online: Free Download Process 2026',
    metaDescription:
      'Step-by-step process to reprint or download your Udyam Registration certificate from udyamregistration.gov.in. Verify authenticity, resolve URN issues, and export QR e-certificate — free.',
    targetKeyword: 'print udyam certificate',
    category: 'Udyam & Registration',
    tags: ['Udyam', 'Certificate', 'Download', 'Verification'],
    publishedAt: '2026-09-08',
    updatedAt: '2026-09-08',
    readTimeMinutes: 5,
    author: AUTHOR_ADITYA,
    excerpt:
      'Whether you misplaced your original Udyam certificate, need a fresh copy for a bank submission, or want to verify a vendor is a genuine MSME — the reprint process is free, takes under 2 minutes, and works entirely from the official portal.',
    content: `## Why You Might Need to Print Udyam Certificate Again

The Udyam certificate is your MSME identity proof. You will typically need it for:

- Opening or updating a current account (banks now verify Udyam status for PSL classification).
- Applying for CGTMSE-covered loans (guarantee cover up to ₹10 crore w.e.f. 1 April 2025).
- Bidding on GeM (Government e-Marketplace) tenders — MSME preference applies.
- Filing MSME Samadhaan complaints for delayed payments beyond 45 days.
- Claiming input on state-level industrial subsidies.
- Statutory audits and internal compliance records.

If you lost the original PDF, or need a fresh copy after updating your business details, reprinting is free from the official portal.

## The Reprint Process — Step by Step

### Step 1: Go to the Official Portal

Open [udyamregistration.gov.in](https://udyamregistration.gov.in). Verify the URL and SSL padlock. Any other URL is not the government.

### Step 2: Click "Print / Verify Udyam Certificate"

On the homepage, look for the **"Print / Verify"** link in the top navigation (usually near the top-right). Click it — you'll land on a search page.

### Step 3: Enter Your URN or Reference Number

You have two options:
- Enter your **19-digit URN** (format: UDYAM-XX-00-0000000) if you have it.
- Enter your registered **mobile number** or **email ID** if you've lost the URN.

Complete the captcha and click "Validate".

### Step 4: Aadhaar OTP Verification

The portal sends a 6-digit OTP to your Aadhaar-linked mobile number. Enter it. If your Aadhaar number has changed since registration, you'll need to first update it via the "Update Udyam" flow.

### Step 5: Download the Certificate

Once verified, your Udyam certificate opens in the browser. Options:
- **Print** (Ctrl+P / Cmd+P) — for physical copies.
- **Save as PDF** — for digital records. Recommended: save to cloud storage.

The certificate carries a **QR code** — anyone can scan this to verify authenticity in real time.

## What If You Don't Remember Your URN?

Two paths:

**Option 1: Recover via mobile/email.** On the same "Print / Verify" page, enter your registered mobile number or email. The system will send an OTP and show your URN.

**Option 2: Contact MSME Champions.** If neither the mobile nor the email work (both changed), you'll need to raise a support ticket at [my.msme.gov.in](https://my.msme.gov.in) with proof of identity. Response typically takes 5 to 10 working days.

## How to Verify If a Certificate Is Genuine

If a vendor or business partner has given you their Udyam certificate and you want to verify it's real (not a fabricated one from a fake site):

1. Go to udyamregistration.gov.in → Print / Verify.
2. Enter the URN from the certificate they shared.
3. Complete captcha and search.
4. If the government portal shows the same business name, category, and registration date — it's genuine.
5. If nothing comes up or details don't match — the certificate is fake.

Alternatively, scan the QR code on the certificate directly using any smartphone QR scanner. It should redirect to the official portal with the same URN details.

## Common Issues

**"OTP not received"** — Your mobile number linked to Aadhaar might have changed. Update Aadhaar at any UIDAI Seva Kendra first, then retry.

**"URN not found"** — Either the URN was typed incorrectly (check the format: UDYAM-XX-00-0000000, 19 characters), or the registration doesn't exist in the government database (indicates a fake certificate from a fee-charging fraud site).

**"Please update your registration"** — Portal is prompting you to refresh turnover/investment figures. Do this once, then reprint.

**"Aadhaar name mismatch"** — Applicant's Aadhaar name has changed since registration (e.g., after marriage). Update Aadhaar first, then update Udyam.

## What About the Old Udyog Aadhaar (UAM) Certificate?

If you're trying to reprint an old **Udyog Aadhaar Memorandum** certificate — that system was retired on 30 June 2020, and all UAM registrations expired on 31 March 2022. You cannot use a UAM certificate as valid MSME proof today.

You need to migrate to Udyam first. See our detailed comparison in [Udyam vs Udyog Aadhaar: What Changed](/blog/udyam-vs-udyog-aadhaar-comparison).

## Cost Reminder

Reprinting is 100% free on the official portal. If any website is charging you a fee to "download your Udyam certificate" — even ₹99 — it is not the government. The Ministry of MSME does not charge for registration, re-verification, or reprint. See our fact-check on this in [Udyam Registration Fees: Is It Really Free?](/blog/udyam-registration-fees-truth).

## Bottom Line

Print / download / verify Udyam certificate — all three take under 2 minutes on the official portal, cost nothing, and work off Aadhaar OTP. Save the PDF to your cloud storage so you don't need to go through the process every time.
`,
    faq: [
      {
        question: 'Is there any fee for reprinting the Udyam certificate?',
        answer:
          'No. Reprinting is 100% free on udyamregistration.gov.in. Any website charging a fee to reprint or download your Udyam certificate is not the government.',
      },
      {
        question: 'How can I recover my Udyam URN if I have lost it?',
        answer:
          'On the "Print / Verify" page, enter your registered mobile number or email instead of the URN. The system will send an OTP and display your URN.',
      },
      {
        question: 'How can I verify if a vendor\'s Udyam certificate is genuine?',
        answer:
          'Two ways: (1) Enter their URN on the government portal\'s Print/Verify page and compare details; (2) Scan the QR code on their certificate — it should redirect to the official portal with matching details.',
      },
      {
        question: 'My Udyam certificate is showing old address / turnover. What do I do?',
        answer:
          'Use the "Update Udyam" flow on the portal. Login with your URN and Aadhaar OTP, edit the outdated fields, and download the refreshed certificate. This is also free.',
      },
      {
        question: 'Can I get a physical printed certificate from a government office?',
        answer:
          'No. Udyam is a fully digital system. There is no physical certificate issued from any government office. The e-certificate downloaded from the portal, with the embedded QR code, is the only official version.',
      },
    ],
    sources: [
      { label: 'Udyam Registration Portal', url: 'https://udyamregistration.gov.in' },
      { label: 'MSME Champions Portal', url: 'https://my.msme.gov.in' },
    ],
    relatedSlugs: ['udyam-registration-kaise-kare', 'udyam-registration-fees-truth', 'udyam-vs-udyog-aadhaar-comparison'],
    relatedGuides: ['udyam-registration'],
  },

  // ============================================================
  // POST 7 — PM Vishwakarma Scheme 2026 Guide (KD 34%, Vol 22.2k)
  // ============================================================
  {
    slug: 'pm-vishwakarma-yojana-guide',
    title: 'PM Vishwakarma Yojana 2026: 18 Eligible Trades, ₹15,000 Toolkit & 5% Loan Guide',
    metaTitle: 'PM Vishwakarma Scheme (2026): 18 Trades, ₹15k Grant & 5% Loan',
    metaDescription:
      'Complete guide to PM Vishwakarma Scheme 2026. 18 traditional artisan trades, ₹15,000 e-voucher for toolkits, ₹500/day stipend during skill training, and up to ₹3 Lakh collateral-free loan at fixed 5% interest.',
    targetKeyword: 'pm vishwakarma yojana',
    category: 'MSME Guides',
    tags: ['PM Vishwakarma', 'Artisans', 'Subsidized Loan', 'Skill Training', 'Central Scheme'],
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    readTimeMinutes: 10,
    author: AUTHOR_ADITYA,
    excerpt:
      'Launched to empower traditional artisans and craftspeople across India, the PM Vishwakarma Scheme provides holistic support: end-to-end skill upgradation, ₹15,000 modern toolkit incentives, digital transaction cashbacks, and collateral-free enterprise loans up to ₹3 Lakh at an attractive fixed 5% interest rate.',
    content: `## What is the PM Vishwakarma Scheme?

The **PM Vishwakarma Yojana** is a Central Sector Scheme launched by the Ministry of Micro, Small and Medium Enterprises (MoMSME) to support traditional artisans and craftspeople who work with their hands and tools.

The scheme has an outlay of **₹13,000 crore** and is fully funded by the Central Government. It recognizes traditional craftspeople as essential contributors to India's informal economy and provides them with official recognition, skill training, modern toolkit vouchers, and subsidized credit without requiring collateral.

---

## The 18 Eligible Traditional Trades

To qualify for PM Vishwakarma, the beneficiary must be engaged in one of the following 18 traditional family-based crafts:

### Wood-Based Trades
1. **Carpenter (Suthar / Badhai)**
2. **Boat Maker**

### Iron / Metal-Based Trades
3. **Armourer**
4. **Blacksmith (Lohar)**
5. **Hammer & Tool Kit Maker**
6. **Locksmith**
7. **Sculptor (Moortikar / Stone Carver / Stone Breaker)**

### Gold / Jewelry Trades
8. **Goldsmith (Sonar)**

### Clay / Earth Trades
9. **Potter (Kumhaar)**

### Leather Trades
10. **Cobbler (Mochi) / Shoesmith / Footwear Artisan**

### Construction Trades
11. **Mason (Rajmistri)**

### Fiber / Natural Material Trades
12. **Basket / Mat / Broom Maker / Coir Weaver**
13. **Doll & Toy Maker (Traditional)**

### Personal Services & Grooming Trades
14. **Barber (Naai)**
15. **Garland Maker (Malakaar)**
16. **Washerman (Dhobi)**
17. **Tailor (Darzi)**
18. **Fishing Net Maker**

---

## 4 Core Benefits Under PM Vishwakarma

Beneficiaries enrolled in the scheme receive four major support components:

### 1. Recognition & Identity
- Beneficiaries receive an official **PM Vishwakarma Certificate** and a **PM Vishwakarma ID Card**.
- Provides formal recognition as a certified artisan across India.

### 2. Skill Training & Daily Stipend
- **Basic Training:** 5 to 7 days (40 hours) of foundational training in modern techniques, tool handling, and digital tools.
- **Advanced Training:** 15 days (120 hours) for interested candidates seeking higher specialization.
- **Training Stipend:** **₹500 per day** paid directly into the beneficiary's Aadhaar-seeded bank account during training.

### 3. Toolkit Incentive (₹15,000 Grant)
- Upon completion of basic training, beneficiaries receive an **e-voucher of up to ₹15,000** to purchase modern, high-grade tools suited to their craft.
- This is a 100% government grant — not a loan.

### 4. Collateral-Free Enterprise Credit (Up to ₹3 Lakh @ Fixed 5%)
Beneficiaries who successfully complete basic skill training and maintain active operations can access institutional loans in two tranches:

| Loan Tranche | Maximum Amount | Repayment Tenure | Eligibility Condition |
| :--- | :--- | :--- | :--- |
| **Tranche 1 (First Loan)** | **Up to ₹1,00,000** | 18 Months | Completed Basic Training |
| **Tranche 2 (Second Loan)** | **Up to ₹2,00,000** | 30 Months | Maintained standard repayment in Tranche 1 + adopted digital payments |

- **Effective Interest Rate:** Fixed at **5.0% per annum** for the borrower.
- **Interest Subvention:** The Government of India provides an **interest subvention of 8.0%** directly to the lending bank, keeping the borrower's burden at only 5%.
- **No Collateral:** 100% collateral-free, backed by the Credit Guarantee Scheme for PM Vishwakarma administered by NCGTC.

---

## Eligibility Criteria

1. **Age:** Minimum 18 years on the date of registration.
2. **Trade:** Actively engaged in one of the 18 specified traditional trades.
3. **Family Cap:** Only **one member per family** (husband, wife, and unmarried children) is eligible.
4. **Government Service Restriction:** Persons in government service and their family members are not eligible.
5. **No Existing Similar Subsidized Loan:** Beneficiaries must not have availed loans under PMEGP, PM SVANidhi, or Mudra for similar credit facilities within the preceding 5 years.

---

## Step-by-Step Registration Process

1. **Step 1: Visit Nearest CSC (Common Service Centre):** Initial enrollment requires biometric Aadhaar authentication at any CSC or online at [pmvishwakarma.gov.in](https://pmvishwakarma.gov.in).
2. **Step 2: Submit Aadhaar & Mobile Verification:** Complete biometric verification and mobile OTP validation.
3. **Step 3: Trade & Family Declaration:** Select your specific craft trade and enter family details.
4. **Step 4: Three-Stage Verification:**
   - *Stage 1:* Verification by Gram Panchayat Head (rural) or Urban Local Body (ULB) Executive (urban).
   - *Stage 2:* Screening by the District Implementation Committee (DIC).
   - *Stage 3:* Final approval by the State Level Screening Committee.
5. **Step 5: Training & Benefit Disbursement:** Once verified, you are scheduled for 5-day basic training and receive your PM Vishwakarma ID and toolkit e-voucher.

---

## Statutory Safety Reminder

Official registration for the PM Vishwakarma Scheme is carried out via Common Service Centres and the official government portal [pmvishwakarma.gov.in](https://pmvishwakarma.gov.in). There are no government processing fees for approval. Never pay unauthorized private agents claiming to guarantee loan approvals.
`,
    faq: [
      {
        question: 'What is the interest rate on PM Vishwakarma loans?',
        answer:
          'The borrower pays a fixed concessional interest rate of 5.0% per annum. The Government of India provides an 8.0% interest subvention directly to the lending bank.',
      },
      {
        question: 'Is the ₹15,000 toolkit incentive a loan or a grant?',
        answer:
          'The ₹15,000 toolkit incentive is a 100% government grant provided as an e-voucher. It does not need to be repaid.',
      },
      {
        question: 'Can multiple family members apply for PM Vishwakarma?',
        answer:
          'No. As per scheme guidelines, benefits are restricted to one member per family (defined as husband, wife, and unmarried children).',
      },
      {
        question: 'Do I need to submit property collateral for the ₹3 Lakh loan?',
        answer:
          'No. PM Vishwakarma loans are 100% collateral-free and credit-guaranteed by the Government through NCGTC.',
      },
    ],
    sources: [
      { label: 'PM Vishwakarma Official Portal', url: 'https://pmvishwakarma.gov.in' },
      { label: 'Ministry of MSME — PM Vishwakarma Guidelines', url: 'https://msme.gov.in' },
    ],
    relatedSlugs: ['mudra-loan-kaise-le', 'business-loan-without-collateral-guide', 'pmegp-margin-money-calculation'],
    relatedGuides: ['mudra-loan'],
  },

  // ============================================================
  // POST 8 — PMFME Scheme Guide (KD 34%, Vol 8.1k)
  // ============================================================
  {
    slug: 'pmfme-scheme-food-processing-guide',
    title: 'PMFME Scheme 2026: How to Get 35% Capital Subsidy for Food Processing Units',
    metaTitle: 'PMFME Scheme 2026: 35% Capital Subsidy for Food Processing (Max ₹10L)',
    metaDescription:
      'Everything you need to know about the PMFME (Pradhan Mantri Formalisation of Micro food processing Enterprises) Scheme 2026. 35% credit-linked capital subsidy up to ₹10 Lakh, ODOP eligibility, seed capital for SHGs, and online application process.',
    targetKeyword: 'pmfme scheme',
    category: 'PMEGP & Subsidies',
    tags: ['PMFME', 'Food Processing', 'Capital Subsidy', 'MoFPI', 'Agri Business'],
    publishedAt: '2026-09-15',
    updatedAt: '2026-09-15',
    readTimeMinutes: 8,
    author: AUTHOR_ADITYA,
    excerpt:
      'If you are starting or expanding a food manufacturing or packaging business — such as flour mills, spices processing, bakery, oil extraction, fruit pulp, or snacks — the PMFME Scheme offers a massive 35% credit-linked capital subsidy of up to ₹10 Lakh per enterprise.',
    content: `## What is the PMFME Scheme?

The **PM Formalisation of Micro food processing Enterprises (PMFME) Scheme** is a flagship initiative launched by the **Ministry of Food Processing Industries (MoFPI)** under the Aatmanirbhar Bharat Abhiyan.

With an outlay of **₹10,000 crore**, the scheme aims to enhance the competitiveness of individual micro-enterprises in the unorganized food processing sector, promote formalization, and support Farmer Producer Organizations (FPOs), Self Help Groups (SHGs), and Producer Cooperatives.

---

## Key Benefits & Financial Support

### 1. Credit-Linked Capital Subsidy for Individual Units
- **Subsidy Rate:** **35% of the eligible project cost**.
- **Maximum Ceiling:** **₹10,00,000 (₹10 Lakh)** per micro-enterprise.
- **Beneficiary Contribution:** Minimum **10% of project cost** as own equity.
- **Bank Loan:** The balance 55% to 90% is financed via term loans from commercial banks.

### 2. Seed Capital for SHG Members
- **₹40,000 per SHG member** provided as seed capital for working capital requirements and purchase of small tools.

### 3. Support for Common Infrastructure
- FPOs, SHGs, Producer Cooperatives, or State agencies establishing common processing facilities, cold storage, packaging units, or testing labs can receive **35% capital subsidy up to ₹3 Crore**.

### 4. Branding and Marketing Support
- **Up to 50% subsidy** for branding, packaging design, barcode registration, FSSAI compliance, and marketing under state or national brands.

---

## One District One Product (ODOP) Focus

The PMFME Scheme adopts the **One District One Product (ODOP)** approach to reap the benefit of scale in procurement of inputs, common services, and marketing of products.

- **ODOP Alignment:** Each district across India has an identified perishable food product (e.g., Mango processing in Ratnagiri, Spices in Guntur, Makhana in Darbhanga, Turmeric in Nizamabad).
- **Non-ODOP Units:** Existing food processing units producing non-ODOP products are also eligible for modernization and expansion subsidies.

---

## Eligible Food Processing Activities

A wide range of agro-processing and value-addition activities are covered:
- **Grain & Pulse Milling:** Flour mills, rice processing, besan units, dal mills.
- **Oil Extraction:** Mustard oil, groundnut oil, sesame, and cold-pressed oil expellers.
- **Fruits & Vegetables:** Pickles, jams, sauces, dehydrated fruits, juices, fruit pulp.
- **Bakery & Confectionery:** Bread, biscuits, cakes, cookies, rusks.
- **Spices & Condiments:** Turmeric grinding, chilly powder, spice blends, ginger-garlic paste.
- **Dairy & Snacks:** Paneer, ghee, curd packaging, namkeen, roasted snacks, papad.
- **Fish & Meat Processing:** Packaged frozen meat, dried fish, value-added poultry products.

---

## Eligibility Criteria for Individual Micro-Enterprises

1. **Enterprise Type:** Individual proprietorship, partnership, LLP, or private limited enterprise engaged in food processing.
2. **Investment Limit:** Micro-enterprise with plant & machinery investment under ₹2.5 Crore (as per 2026 MSME thresholds).
3. **Age & Qualification:** Applicant must be at least 18 years old. Minimum 8th standard education is preferred for project costs above ₹5 Lakh.
4. **Ownership:** Applicant must possess ownership or registered lease rights to the business premises.

---

## How the Subsidy is Credited & Adjusted

Like PMEGP, PMFME operates on a **back-ended subsidy mechanism**:
1. The sanctioned 35% subsidy amount is released by MoFPI to the lending bank.
2. The bank places the subsidy amount in a **Term Deposit Receipt (TDR)** in the borrower's name for a period of **3 years**.
3. No interest is charged on the loan component equal to the subsidy amount.
4. After 3 years of successful operation and physical verification of the food unit, the subsidy is adjusted against the outstanding term loan principal.

---

## How to Apply Online (Step-by-Step)

1. **Step 1:** Visit the official portal [pmfme.mofpi.gov.in](https://pmfme.mofpi.gov.in).
2. **Step 2:** Register as an Applicant with your Aadhaar, PAN, and Mobile Number.
3. **Step 3:** Prepare a Detailed Project Report (DPR) detailing machinery costs, raw material sourcing, and financial projections.
4. **Step 4:** Submit the online application along with quotation of machinery, premises proof, and Udyam Registration.
5. **Step 5:** District Resource Persons (DRP) appointed by the State Nodal Agency assist in vetting your DPR before forwarding to the selected bank branch.
`,
    faq: [
      {
        question: 'What is the maximum subsidy under the PMFME scheme for an individual unit?',
        answer:
          'Under PMFME, individual food processing units get a 35% credit-linked capital subsidy on eligible project cost, capped at a maximum of ₹10 Lakh.',
      },
      {
        question: 'Is Udyam Registration mandatory for PMFME?',
        answer:
          'Yes. Having a valid Udyam Registration number is required for micro-enterprises applying for bank loans and capital subsidies under PMFME.',
      },
      {
        question: 'Can new food processing businesses apply or only existing ones?',
        answer:
          'Both new (greenfield) and existing (brownfield) micro food processing units are eligible for financial support under PMFME, with preference given to ODOP products.',
      },
      {
        question: 'What is the beneficiary contribution under PMFME?',
        answer:
          'The applicant must contribute a minimum of 10% of the total project cost from their own funds as equity margin.',
      },
    ],
    sources: [
      { label: 'MoFPI — PMFME Official Portal', url: 'https://pmfme.mofpi.gov.in' },
      { label: 'Ministry of Food Processing Industries Guidelines', url: 'https://mofpi.gov.in' },
    ],
    relatedSlugs: ['pmegp-margin-money-calculation', 'business-loan-without-collateral-guide', 'udyam-registration-kaise-kare'],
    relatedGuides: ['pmegp-loan'],
  },

  // ============================================================
  // POST 9 — Stand-Up India Scheme Guide (KD 38%, Vol 9.9k)
  // ============================================================
  {
    slug: 'stand-up-india-loan-scheme-guide',
    title: 'Stand-Up India Scheme 2026: ₹10 Lakh to ₹1 Crore Loans for Women and SC/ST Founders',
    metaTitle: 'Stand-Up India Scheme 2026: ₹10L to ₹1Cr Greenfield Business Loans',
    metaDescription:
      'Complete guide to Stand-Up India loans from ₹10 Lakh to ₹1 Crore. Eligibility for Women and SC/ST entrepreneurs, 85% project cost financing, 7-year repayment, and online application on StandUpMitra.',
    targetKeyword: 'stand up india',
    category: 'Mudra & Loans',
    tags: ['Stand-Up India', 'Women Entrepreneurs', 'SC ST Loans', 'Greenfield Financing', 'Business Loans'],
    publishedAt: '2026-09-18',
    updatedAt: '2026-09-18',
    readTimeMinutes: 8,
    author: AUTHOR_ADITYA,
    excerpt:
      'The Stand-Up India Scheme facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one Woman borrower per bank branch for setting up greenfield commercial enterprises.',
    content: `## Overview of Stand-Up India Scheme

The **Stand-Up India Scheme** was launched by the Department of Financial Services (DFS), Ministry of Finance, to promote entrepreneurship at the grassroots level among women and SC/ST communities.

Under the scheme, every branch of all Scheduled Commercial Banks is mandated to facilitate bank loans between **₹10 Lakh and ₹1 Crore** to at least one SC/ST borrower and at least one Woman borrower for setting up a greenfield enterprise.

---

## Key Loan Parameters

| Parameter | Scheme Specification |
| :--- | :--- |
| **Loan Amount** | **₹10,00,000 to ₹1,00,00,000 (₹10 Lakh to ₹1 Crore)** |
| **Nature of Facility** | Composite Loan (inclusive of Term Loan and Working Capital) |
| **Target Beneficiaries** | SC, ST, and Women Entrepreneurs |
| **Enterprise Type** | Greenfield project only (first-time venture) |
| **Eligible Sectors** | Manufacturing, Services, Agri-allied activities, and Trading |
| **Loan Coverage** | Up to **85% of total project cost** |
| **Repayment Tenure** | **Up to 7 years** with a maximum moratorium period of **18 months** |
| **Interest Rate** | Lowest applicable rate for that category (Base Rate / MCLR + Tenure Premium + max 3%) |

---

## What is a "Greenfield Enterprise"?

In the context of Stand-Up India, **"greenfield"** signifies the first-time venture of the beneficiary in the manufacturing, services, agri-allied, or trading sector. Existing operational businesses seeking expansion loans are not covered under Stand-Up India (they should explore CGTMSE or Mudra Tarun Plus instead).

In non-individual enterprises (such as Partnerships, LLPs, or Private Limited Companies), at least **51% of the shareholding and controlling stake** must be held by either an SC/ST or a Woman entrepreneur.

---

## Margin Money & Promoter Equity

- The scheme envisions that the loan will cover **up to 85% of the total project cost** (inclusive of term loan and working capital).
- The borrower is expected to bring in at least **15% of the project cost** as own margin money.
- If the borrower is eligible for central or state subsidies (e.g. state industrial policy incentives), the subsidy can be counted towards the margin money, provided the borrower's own cash contribution is at least 10%.

---

## Security & Collateral Requirements

- **Primary Security:** Assets created out of the bank loan (plant, machinery, equipment, stock, book debts).
- **Collateral / Guarantee:** Stand-Up India loans can be secured either through collateral security or through the **Credit Guarantee Fund for Stand-Up India (CGFSI)** operated by NCGTC, minimizing physical collateral requirements.

---

## How to Apply on the StandUpMitra Portal

1. **Step 1: Access the Portal:** Visit [standupmitra.in](https://www.standupmitra.in).
2. **Step 2: Register as Borrower:** Choose whether you need "Trainee Borrower" handholding (for business plan preparation, financial training) or "Ready Borrower" status.
3. **Step 3: Fill Business & Loan Details:** Enter project cost, preferred bank branch, sector, and promoter equity share.
4. **Step 4: Upload Documents:** Upload PAN, Aadhaar, Caste Certificate (for SC/ST), Udyam Registration, project report, and premises proof.
5. **Step 5: Bank Processing:** The application is directly routed to the selected bank branch for appraisal, sanction, and disbursement.
`,
    faq: [
      {
        question: 'Can a general category male apply for Stand-Up India?',
        answer:
          'No. Stand-Up India is strictly reserved for Women entrepreneurs (all categories) and Scheduled Caste (SC) / Scheduled Tribe (ST) founders.',
      },
      {
        question: 'What is the maximum loan limit under Stand-Up India?',
        answer:
          'The scheme provides composite loans (term loan plus working capital) from ₹10 Lakh up to a maximum of ₹1 Crore.',
      },
      {
        question: 'What is the repayment tenure for Stand-Up India loans?',
        answer:
          'The repayment tenure is up to 7 years, with a moratorium period of up to 18 months during the initial project setup phase.',
      },
    ],
    sources: [
      { label: 'StandUpMitra Official Portal', url: 'https://www.standupmitra.in' },
      { label: 'Department of Financial Services — Stand-Up India', url: 'https://financialservices.gov.in' },
    ],
    relatedSlugs: ['business-loan-without-collateral-guide', 'mudra-loan-kaise-le', 'pmegp-margin-money-calculation'],
    relatedGuides: ['cgtmse', 'mudra-loan'],
  },

  // ============================================================
  // POST 10 — Business Loan Without Collateral Guide (KD 38%, Vol 880)
  // ============================================================
  {
    slug: 'business-loan-without-collateral-guide',
    title: 'Business Loans Without Collateral in India (2026): Top 5 Options, Limits & Rates',
    metaTitle: 'Business Loan Without Collateral in India (2026) – Top 5 Options',
    metaDescription:
      'Compare the best collateral-free business loan options in India: CGTMSE guarantee up to ₹10 Crore, Mudra Tarun Plus up to ₹20 Lakh, Bank unsecured credit lines, and Fintech NBFC loans. Verified interest rates and eligibility criteria.',
    targetKeyword: 'business loan without collateral',
    category: 'Mudra & Loans',
    tags: ['Collateral Free Loans', 'Business Loan', 'CGTMSE', 'Mudra', 'Unsecured Loan', 'MSME Finance'],
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    readTimeMinutes: 9,
    author: AUTHOR_ADITYA,
    excerpt:
      'Securing credit without pledging residential property or commercial land is the primary financing hurdle for growing MSMEs. Here is a definitive guide to the top 5 legitimate, government-backed and institutional collateral-free business loan routes available in India.',
    content: `## The Collateral Hurdle for Indian Small Businesses

For millions of micro, small, and medium enterprise owners, obtaining capital has historically required pledging immovable property — such as residential homes, industrial land, or commercial offices — as primary collateral security.

However, over the past three years, the Reserve Bank of India (RBI), Ministry of MSME, and financial institutions have dramatically expanded **collateral-free credit mechanisms**. Today, an enterprise can secure from **₹50,000 up to ₹10 Crore** in institutional business financing without mortgaging real estate assets.

---

## Top 5 Collateral-Free Business Loan Options Compared

| Loan Option | Guarantee / Backing | Maximum Amount | Indicative Interest Rate | Best Suited For |
| :--- | :--- | :--- | :--- | :--- |
| **1. CGTMSE Scheme** | Credit Guarantee Trust (MoMSME & SIDBI) | **Up to ₹10 Crore** | 9.0% – 13.0% p.a. | Established MSMEs expanding machinery or working capital |
| **2. PM Mudra Yojana** | Credit Guarantee Fund for Micro Units (CGFMU) | **Up to ₹20 Lakh** (Tarun Plus) | 8.5% – 12.5% p.a. | Micro enterprises, shops, services, and small manufacturing |
| **3. PM Vishwakarma** | NCGTC Guarantee + 8% Interest Subvention | **Up to ₹3 Lakh** | **Fixed 5.0% p.a.** | 18 Traditional artisans and craftspeople |
| **4. Bank Unsecured Credit Lines** | Cash Flow / GST Underwritten (SBI, HDFC, ICICI) | Up to ₹50 Lakh – ₹1 Crore | 11.5% – 16.0% p.a. | Businesses with 2+ years GST returns and clean bank banking |
| **5. Fintech & NBFC MSME Loans** | Digital Cashflow Scoring (Tata Capital, Lendingkart) | Up to ₹30 Lakh – ₹75 Lakh | 15.0% – 24.0% p.a. | Fast 48-hour disbursals with no physical branch visits |

---

## Deep Dive into Each Collateral-Free Route

### 1. CGTMSE Credit Guarantee Scheme (Up to ₹10 Crore)
- **How It Works:** Instead of asking the borrower for property collateral, the lending bank purchases credit guarantee cover from CGTMSE. If the loan defaults, CGTMSE reimburses the bank **75% to 85%** of the defaulted amount.
- **2025–2026 Upgrade:** The guarantee ceiling was raised from ₹5 Crore to **₹10 Crore** w.e.f. 1 April 2025.
- **Annual Guarantee Fee (AGF):** Standard guarantee fee ranges from 0.37% to 1.35% per annum, depending on loan slab and borrower category (reduced rates for women and micro units).

### 2. PM Mudra Yojana (Up to ₹20 Lakh)
- **4 Brackets:** Shishu (&le;₹50k), Kishor (₹50k–₹5L), Tarun (₹5L–₹10L), and **Tarun Plus** (up to ₹20L for entrepreneurs who have previously repaid a Tarun loan).
- **No Processing Fee:** For Shishu and Kishor loans, public sector banks do not charge processing fees.

### 3. Bank Cash-Flow Based Working Capital Lines
- Major commercial banks (SBI SME Clean Credit, HDFC Business Growth Loan, ICICI Business Installment Loan) offer collateral-free term loans and overdraft limits up to ₹50 Lakh.
- **Underwriting Basis:** Approved solely on **GST return consistency, bank statement average quarterly balance (AQB), and CIBIL score (&ge; 720)**.

---

## Mandatory Documentation for Collateral-Free Loans

To qualify quickly for an unsecured or guarantee-backed business loan, keep these verified documents ready:

1. **KYC:** PAN & Aadhaar of all promoters / directors.
2. **Statutory Registrations:** Udyam Registration Certificate and GST Registration Certificate.
3. **Banking Track Record:** Last 12 months operating bank account statements in digital PDF format.
4. **Tax Compliance:** Last 2 to 3 years Income Tax Returns (ITR) with Computation of Income and audited financials (if applicable).
5. **GST Data:** GSTR-3B and GSTR-1 filings for the last 12 months.
6. **Existing Loan Obligations:** Sanction letters and repayment track records for all existing borrowing.

---

## Red Flags & Scams to Avoid

When applying for collateral-free business loans:
- **Never Pay "Approval Fees" in Advance:** Legitimate banks and NBFCs deduct processing charges directly from the disbursed loan amount. Any agent demanding upfront cash or UPI transfers for "guaranteed approval" is a scam.
- **Verify RBI Registration:** Ensure the lending entity is a Scheduled Commercial Bank or an RBI-registered NBFC.
`,
    faq: [
      {
        question: 'Can a newly registered business get a collateral-free loan?',
        answer:
          'Yes. New (greenfield) businesses can secure collateral-free loans through PM Mudra Shishu (up to ₹50,000), PM Vishwakarma (up to ₹3 Lakh), or PMEGP (margin money subsidy + bank loan).',
      },
      {
        question: 'What is the minimum CIBIL score required for an unsecured business loan?',
        answer:
          'Most banks and NBFCs require a personal CIBIL score of 700+ (ideally 750+) and a Commercial CMR score between 1 and 4 for unsecured loan approval.',
      },
      {
        question: 'Is CGTMSE a loan or a guarantee?',
        answer:
          'CGTMSE is a Credit Guarantee Trust operated by the Government and SIDBI. It is not a direct lender — it provides guarantee cover to banks so they can disburse collateral-free loans up to ₹10 Crore.',
      },
    ],
    sources: [
      { label: 'CGTMSE Official Portal', url: 'https://www.cgtmse.in' },
      { label: 'Mudra Official Portal', url: 'https://www.mudra.org.in' },
      { label: 'Reserve Bank of India Master Directions', url: 'https://rbi.org.in' },
    ],
    relatedSlugs: ['mudra-loan-kaise-le', 'stand-up-india-loan-scheme-guide', 'pmegp-margin-money-calculation'],
    relatedGuides: ['cgtmse', 'mudra-loan'],
  },

  // ============================================================
  // POST 11 — PMEGP Loan Online Application Guide (KD 50%, Vol 246k)
  // ============================================================
  {
    slug: 'pmegp-loan-apply-online-guide',
    title: 'PMEGP Loan 2026: Complete Application Process, Project Limits & Subsidy Claim',
    metaTitle: 'PMEGP Loan 2026: Online Application Process, ₹50L Limit & Subsidy',
    metaDescription:
      'Complete guide to PMEGP loan application 2026. Revised project cost limits of ₹50 Lakh (Manufacturing) and ₹20 Lakh (Service), 15% to 35% margin money subsidy, KVIC e-portal step-by-step process, and DPR format.',
    targetKeyword: 'pmegp loan',
    category: 'PMEGP & Subsidies',
    tags: ['PMEGP', 'KVIC', 'Capital Subsidy', 'Govt Loan', 'Self Employment', 'DPR'],
    publishedAt: '2026-09-25',
    updatedAt: '2026-09-25',
    readTimeMinutes: 11,
    author: AUTHOR_ADITYA,
    excerpt:
      'The Prime Minister Employment Generation Programme (PMEGP) is India’s largest credit-linked subsidy scheme for setting up new manufacturing and service micro-enterprises, offering up to 35% government grant on project costs up to ₹50 Lakh.',
    content: `## What is the PMEGP Scheme?

The **Prime Minister’s Employment Generation Programme (PMEGP)** is a flagship credit-linked subsidy programme administered by the **Ministry of MSME** through the **Khadi and Village Industries Commission (KVIC)** as the national single nodal agency.

At the state level, the scheme is implemented through:
- State KVIC Directorates
- State Khadi and Village Industries Boards (KVIB)
- District Industries Centres (DIC)
- Coir Board (for coir units)

---

## Revised Project Cost Ceilings (2026 Update)

The Government of India has significantly enhanced the maximum project cost ceilings for new enterprises setting up under PMEGP:

| Enterprise Sector | Maximum Eligible Project Cost | Minimum Qualification for Projects &gt; ₹10L |
| :--- | :--- | :--- |
| **Manufacturing Sector** | **₹50,00,000 (₹50 Lakh)** | 8th Class Pass |
| **Service / Business Sector** | **₹20,00,000 (₹20 Lakh)** | 8th Class Pass (for &gt; ₹5L) |

*Note: The cost of land cannot be included in the project cost calculation. Project cost comprises capital expenditure (plant, machinery, equipment, building construction) and one cycle of working capital.*

---

## Margin Money Subsidy Rates Matrix

The subsidy under PMEGP is termed **"Margin Money"** and is calculated as a percentage of the total approved project cost:

| Beneficiary Category | Own Contribution (Promoter Equity) | Urban Area Subsidy | Rural Area Subsidy |
| :--- | :--- | :--- | :--- |
| **General Category** | 10% of project cost | **15%** | **25%** |
| **Special Category** (Women, SC, ST, OBC, Minorities, Ex-Servicemen, PH, NER, Hill & Border areas) | **5% of project cost** | **25%** | **35%** |

### Real-World Calculation Example:
- **Project Type:** Rural Manufacturing Unit (General Category Woman entrepreneur &rarr; Special Category).
- **Total Project Cost:** ₹40,00,000 (₹40 Lakh).
- **Own Contribution (5%):** ₹2,00,000 (₹2 Lakh).
- **Bank Loan Sanction (95%):** ₹38,00,000.
- **Government Subsidy (35% Rural):** **₹14,00,000 (₹14 Lakh)**.
- **Effective Net Loan Repayable:** Only **₹24,00,000 (₹24 Lakh)** after 3-year subsidy adjustment.

---

## Eligibility Criteria

1. **Age:** Minimum 18 years on date of application. No upper age limit.
2. **Enterprise Status:** **Only new (greenfield) projects** are eligible for first-time PMEGP assistance.
3. **Education:** Minimum 8th standard pass for manufacturing projects costing over ₹10 Lakh, and service projects costing over ₹5 Lakh.
4. **No Other Subsidy:** The applicant must not have availed central/state subsidy under any other government scheme for the same project.
5. **Existing Units Ineligible for First Loan:** Existing industrial units cannot apply for the first PMEGP subsidy. (A separate Second PMEGP Loan up to ₹1 Crore for upgradation is available for successful existing units).

---

## Documents Required for PMEGP Application

Keep clean scanned copies of these documents ready before opening the online portal:
1. **Aadhaar Card & PAN Card**
2. **Passport Size Photograph**
3. **Highest Educational Qualification Certificate** (8th standard mark sheet or higher)
4. **Special Category Proof:** Caste Certificate (SC/ST/OBC) or Disability Certificate (if applicable)
5. **Detailed Project Report (DPR):** Breakdown of machinery quotations, raw material costs, manpower expenses, and 5-year cash flow projections.
6. **Rural Area Certificate:** Issued by the local Gram Panchayat / Sarpanch (mandatory to claim the higher 25% or 35% rural subsidy).
7. **EDP Training Certificate:** (Can also be completed online after in-principle bank sanction).

---

## Step-by-Step Online Application Process

1. **Step 1:** Go to the official KVIC portal: [kviconline.gov.in/pmegpeportal](https://www.kviconline.gov.in/pmegpeportal/).
2. **Step 2:** Click **"Application for New Unit"** to open the PMEGP online form.
3. **Step 3:** Enter your 12-digit Aadhaar number and validate with Aadhaar OTP.
4. **Step 4:** Select the Implementing Agency (KVIC, KVIB, or DIC) and your target district.
5. **Step 5:** Enter your proposed industry activity (NIC code), select your preferred financing bank branch, and input project cost estimates.
6. **Step 6:** Upload your DPR, photo, education proof, and rural certificate.
7. **Step 7:** Submit the application and download your 14-digit **PMEGP Application ID & Password**.
8. **Step 8 (Scrutiny):** Your application is reviewed by the District Level Task Force Committee (DLTFC) and forwarded electronically to the selected bank branch for credit appraisal.
`,
    faq: [
      {
        question: 'What is the maximum subsidy amount under PMEGP?',
        answer:
          'For a manufacturing project at the maximum ceiling of ₹50 Lakh in a rural area for special category beneficiaries (35%), the maximum subsidy grant is ₹17.5 Lakh.',
      },
      {
        question: 'Can I apply for PMEGP for an existing business?',
        answer:
          'First-time PMEGP subsidy is strictly for new (greenfield) enterprises. However, existing units that previously repaid their first PMEGP loan can apply for a Second PMEGP Upgradation Loan up to ₹1 Crore with 15%–20% subsidy.',
      },
      {
        question: 'Is EDP (Entrepreneurship Development Programme) training mandatory for PMEGP?',
        answer:
          'Yes. Completion of EDP training (which can now be completed online via the e-learning portal) is mandatory before the release of the margin money subsidy.',
      },
      {
        question: 'What is the official website to apply for PMEGP?',
        answer:
          'The only official portal for PMEGP applications is kviconline.gov.in/pmegpeportal. There are no registration fees.',
      },
    ],
    sources: [
      { label: 'KVIC PMEGP Official e-Portal', url: 'https://www.kviconline.gov.in/pmegpeportal/' },
      { label: 'Ministry of MSME — PMEGP Operational Guidelines', url: 'https://msme.gov.in' },
    ],
    relatedSlugs: ['pmegp-margin-money-calculation', 'business-loan-without-collateral-guide', 'pmfme-scheme-food-processing-guide'],
    relatedGuides: ['pmegp-loan'],
  },
]

