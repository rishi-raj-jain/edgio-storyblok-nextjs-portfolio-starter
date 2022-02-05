import Head from 'next/head'
import { useTheme } from 'next-themes'
import { Fragment, useEffect, useState } from 'react'

const Article = ({ post }) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          media={mounted ? 'all' : 'print'}
          href={`/css/${mounted ? (theme === 'system' ? 'light' : theme) : 'light'}.css`}
        />
      </Head>
      <article
        className="prose dark:prose-light max-w-none mt-10 text-sm"
        dangerouslySetInnerHTML={{ __html: post.content.long_text }}
      />
    </Fragment>
  )
}

export default Article
