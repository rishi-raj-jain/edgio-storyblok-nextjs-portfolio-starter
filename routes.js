import { nextRoutes } from '@layer0/next'
import { Router } from '@layer0/core/router'
import { foreverEdge, assetCache, nextCache } from './cache'

// Create a new router
const router = new Router()

// Not index perma links
router.noIndexPermalink()

// Serve service worker
router.get('/service-worker.js', ({ serviceWorker }) => {
  return serviceWorker('.next/static/service-worker.js')
})

// Cache assets
router.get('/static/:file', ({ cache, serveStatic }) => {
  cache(assetCache)
  serveStatic('public/static/:file')
})
router.match('/fonts/:file', ({ cache, serveStatic }) => {
  cache(assetCache)
  serveStatic('public/fonts/:file')
})
router.match('/css/:file', ({ cache, serveStatic }) => {
  cache(assetCache)
  serveStatic('public/css/:file')
})

// Caching the Next.js optimized images forever
router.match('/_next/image/:path*', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  cache(foreverEdge)
})

// Caching the Next.js data props
router.match('/_next/data/:build/blog/:name.json', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('cache-control')
  cache(nextCache)
})
router.match('/_next/data/:build/:name.json', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('cache-control')
  cache(nextCache)
})

// Default Next.js Routes
router.use(nextRoutes)

module.exports = router
