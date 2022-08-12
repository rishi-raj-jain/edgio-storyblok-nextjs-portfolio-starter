const { withLayer0, withServiceWorker } = require('@layer0/next/config')

const imageOptions = {
  domains: ['localhost', 'a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0.link'],
}

const __preLayer0Export = {
  images: imageOptions,
  output: 'standalone',
  layer0SourceMaps: true,
}

module.exports = withLayer0(withServiceWorker(__preLayer0Export))
