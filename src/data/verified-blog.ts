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
]
