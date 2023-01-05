const { withEdgio, withServiceWorker } = require('@edgio/next/config')

const imageOptions = {
  domains: ['localhost', 'a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0.link'],
}

module.exports = withEdgio(withServiceWorker({
  images: imageOptions,
  edgioSourceMaps: true,
}))
