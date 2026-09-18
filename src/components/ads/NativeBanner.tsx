'use client'

import Script from 'next/script'

const CONTAINER_ID = 'container-d6197c11a41d38db30d090737afd36aa'

export default function NativeBanner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div id={CONTAINER_ID} />
      <Script
        id="native-banner-script"
        src={`https://nobleduringsurveillance.com/${CONTAINER_ID.replace('container-', '')}/invoke.js`}
        strategy="lazyOnload"
        data-cfasync="false"
      />
    </div>
  )
}
