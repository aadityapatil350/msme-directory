'use client'

import Script from 'next/script'

// Popunder (includes the network's ad-blocker-bypass variant) + SocialBar.
// Loaded once, sitewide, after the page is interactive.
export default function SitewideAds() {
  return (
    <>
      <Script
        id="popunder-ad"
        src="https://nobleduringsurveillance.com/08/4a/0a/084a0ab3325e8fa4939b376daabbe7c2.js"
        strategy="lazyOnload"
      />
      <Script
        id="social-bar-ad"
        src="https://nobleduringsurveillance.com/f4/d6/cf/f4d6cfb1a2225de8a91be48581ae3b74.js"
        strategy="lazyOnload"
      />
    </>
  )
}
