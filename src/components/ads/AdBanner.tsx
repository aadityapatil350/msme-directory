const AD_UNITS = {
  '160x300': { key: 'f1d88d565f07264707ba8d44a1dce38f', width: 160, height: 300 },
  '160x600': { key: '1167af3a6d7109f6f13989ecf310d9ce', width: 160, height: 600 },
  '300x250': { key: 'a3eb7e0649641c01c36d37f5673607da', width: 300, height: 250 },
  '320x50': { key: 'be56837a843f95971f574ec34fc582c4', width: 320, height: 50 },
  '468x60': { key: 'bf0eea39a3ede5629163ece54b094273', width: 468, height: 60 },
  '728x90': { key: 'ae55e0f90031bd6fda229ed77cb3378b', width: 728, height: 90 },
} as const

export type AdSize = keyof typeof AD_UNITS

// Each banner renders in its own sandboxed iframe (srcDoc) because the ad
// network's invoke.js reads a single global `atOptions` var — sharing one
// page-level scope across multiple banners causes them to clobber each other.
export default function AdBanner({ size, className }: { size: AdSize; className?: string }) {
  const { key, width, height } = AD_UNITS[size]

  const srcDoc = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body>
<script>
atOptions = {
  'key': '${key}',
  'format': 'iframe',
  'height': ${height},
  'width': ${width},
  'params': {}
};
</script>
<script src="https://nobleduringsurveillance.com/${key}/invoke.js"></script>
</body></html>`

  return (
    <iframe
      title="Advertisement"
      srcDoc={srcDoc}
      width={width}
      height={height}
      style={{ border: 0, overflow: 'hidden', maxWidth: '100%' }}
      scrolling="no"
      loading="lazy"
      className={className}
    />
  )
}
