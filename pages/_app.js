import '@/styles/global.css'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { install, prefetch } from '@layer0/prefetch/window'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const prefetchCSS = () => {
      if (document.location.pathname.endsWith('blogs')) {
        prefetch('/css/dark.css')
        prefetch('/css/light.css')
      }
    }
    install({
      watch: [
        {
          selector: 'body',
          callback: (el) => {
            var oldHref = document.location.href
            var bodyList = document.querySelector('body')
            prefetchCSS()
            var observer = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                  oldHref = document.location.href
                  prefetchCSS()
                }
              })
            })
            var config = {
              childList: true,
              subtree: true,
            }
            observer.observe(bodyList, config)
          },
        },
      ],
    })
  }, [])

  return (
    <ThemeProvider attribute="class">
      <div className="transition-colors duration-200 bg-white dark:bg-black text-black dark:text-gray-200 font-display flex flex-col items-center">
        <Navbar />
        <div className="py-10 w-full max-w-[90vw] lg:max-w-[75vw] sm:px-10 flex flex-col">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
