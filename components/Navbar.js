import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const navLinks = [
  {
    pathname: '/',
    name: 'Home',
  },
  {
    pathname: '/about',
    name: 'About',
  },
  {
    pathname: '/blogs',
    name: 'Blogs',
  },
]

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className="sticky top-0 z-10 backdrop-filter backdrop-blur-xl w-full flex flex-col items-center">
      <div className="w-full max-w-[90vw] lg:max-w-[75vw] sm:px-10 flex flex-row items-center justify-between">
        <button
          onClick={() => {
            if (mounted) {
              setTheme(theme === 'light' ? 'dark' : 'light')
            }
          }}
          className="appearance-none focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="black"
            viewBox="0 0 16 16"
            className="transition-all duration-500 block dark:hidden"
          >
            <title>Turn on the dark mode</title>
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            viewBox="0 0 16 16"
            height="12"
            fill="white"
            className="transition-all duration-500 hidden dark:block"
          >
            <title>Turn on the light mode</title>
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
          </svg>
        </button>
        <div className="relative max-w-[258px] overflow-x-scroll sm:overflow-x-hidden sm:max-w-none flex flex-row items-center space-x-5">
          {navLinks.map((item) => (
            <Link href={item.pathname} key={item.name}>
              <a
                className={`${
                  item.hasOwnProperty('class') ? item.class : ''
                } flex flex-row items-center relative space-x-3`}
              >
                <span className="text-md font-medium">{item.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
