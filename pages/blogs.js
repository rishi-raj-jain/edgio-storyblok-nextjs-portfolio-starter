import { defaultBlogs } from '@/lib/data'
import { getAllPostsForHome, getRecommendedPosts, getTagline } from '@/lib/api'
import Link from 'next/link'
import SEO from '@/components/Seo'
import { Prefetch } from '@layer0/react'
import { deploymentUrl } from '@/lib/data'
import SearchBar from '@/components/SearchBar'
import DateString from '@/components/DateString'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const Blogs = ({ allPosts, recommendedPosts, blogsTagline }) => {
  const SEODetails = {
    title: `Blogs - Jane Doe`,
    canonical: `${deploymentUrl}/blogs`,
  }

  return (
    <>
      <SEO {...SEODetails} />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl sm:text-5xl">Blogs</h1>
        <h2
          className="mt-5 dark:text-gray-400 font-regular text-md sm:text-xl whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: new RichTextResolver().render(blogsTagline),
          }}
        />
        <SearchBar content={allPosts} />
        <div className="flex flex-row flex-wrap">
          <div className="mt-10 lg:mt-20 w-full lg:w-2/3 lg:pr-10 flex flex-col">
            {allPosts.map((item) => (
              <div
                key={`/blog/${item.slug}`}
                className="border-b dark:border-gray-700 pb-10 mb-10 flex flex-col"
              >
                <span className="dark:text-gray-400 text-gray-700">
                  <DateString date={new Date(item.first_published_at)} />
                </span>
                <Link href={`/blog/${item.slug}`}>
                  <Prefetch
                    url={
                      process.browser
                        ? `/_next/data/${__NEXT_DATA__.buildId}/blog/${item.slug}.json`
                        : `/blog/${item.slug}`
                    }
                  >
                    <a className="mt-3 hover:underline" href={`/blog/${item.slug}`}>
                      <span className="font-bold text-lg sm:text-2xl">{item.content.title}</span>
                    </a>
                  </Prefetch>
                </Link>
                <span className="mt-3 dark:text-gray-400 text-gray-700 line-clamp-2 text-sm">
                  {item.content.intro}
                </span>
                <Link href={`/blog/${item.slug}`}>
                  <Prefetch
                    url={
                      process.browser
                        ? `/_next/data/${__NEXT_DATA__.buildId}/blog/${item.slug}.json`
                        : `/blog/${item.slug}`
                    }
                  >
                    <a
                      href={`/blog/${item.slug}`}
                      className="hover:underline text-blue-500 mt-5 uppercase text-sm"
                    >
                      Read More &rarr;
                    </a>
                  </Prefetch>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-0 lg:mt-20 w-full lg:w-1/3 flex flex-col">
            <h4 className="font-bold text-md sm:text-lg">Recommended Posts</h4>
            {recommendedPosts.map((item) => (
              <a
                rel="noopener"
                target="_blank"
                key={item.content.Title}
                href={item.content.Url.url}
                className="mt-5 pb-2 border-b dark:border-gray-700 hover:underline truncate dark:text-gray-400 text-gray-500 text-sm"
              >
                {item.content.Title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs

export async function getStaticProps() {
  // Once deployed directly fetch from the `deployedUrl/api/blogs`, look at github.com/rishi-raj-jain/rishi.app for future reference.
  try {
    const allPosts = (await getAllPostsForHome()) || []
    const recommendedPosts = (await getRecommendedPosts()) || []
    const blogsTagline = (await getTagline('blogs')) || defaultBlogs
    return {
      props: { allPosts, recommendedPosts, blogsTagline },
      revalidate: 60,
    }
  } catch {
    return { notFound: true }
  }
}
