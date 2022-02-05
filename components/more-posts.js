import Link from 'next/link'
import Prefetch from '@layer0/react/Prefetch'

const MorePosts = ({ morePosts }) => {
  const filteredPosts = morePosts.filter((item) => item.hasOwnProperty('name'))

  return (
    filteredPosts.length > 0 && (
      <div className="flex flex-col">
        <div className="text-sm mt-10 mb-5">
          <span> More Posts &rarr; </span>
        </div>
        {filteredPosts.map((item) => (
          <Link href={`/blog/${item.slug}`} key={item.slug}>
            <Prefetch
              url={
                process.browser
                  ? `/_next/data/${__NEXT_DATA__.buildId}/blog/${item.slug}.json`
                  : `/blog/${item.slug}`
              }
            >
              <a
                href={`/blog/${item.slug}`}
                className="hover:underline mb-5 block w-full font-bold text-lg"
              >
                {item.name}
              </a>
            </Prefetch>
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
