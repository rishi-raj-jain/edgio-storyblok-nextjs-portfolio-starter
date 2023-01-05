import Link from 'next/link'
import Prefetch from '@edgio/react/Prefetch'
import { createNextDataURL } from '@edgio/next/client'

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
            <Prefetch url={createNextDataURL({ href: '/blog/' + item.slug, routeParams: { slug: item.slug } })}>
              <a href={`/blog/${item.slug}`} className="hover:underline mb-5 block w-full font-bold text-lg">
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
