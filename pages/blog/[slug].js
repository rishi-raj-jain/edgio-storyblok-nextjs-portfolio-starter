import dynamic from 'next/dynamic'
import SEO from '@/components/Seo'
import Author from '@/components/Author'
import Article from '@/components/Article'
import markdownToHtml from '@/lib/markdown'
import DateString from '@/components/DateString'
import { deploymentUrl, imageLink } from '@/lib/data'
import { getOtherBlogs, getPost } from '@/lib/api'
const MorePosts = dynamic(() => import('@/components/more-posts'))

export default function Post({ post, morePosts }) {
  const SEODetails = {
    description: post.content.intro,
    pubDate: post.first_published_at,
    author: post.content.author.name,
    canonical: `${deploymentUrl}/blog/${post.slug}`,
    title: `${post.content.title} - ${post.content.author.name}`,
  }
  if (post.content.image) {
    SEODetails['image'] = `${imageLink}/api?title=${post.content.title}&image=${post.content.image}`
  }
  return (
    <div className="w-full flex flex-col items-center">
      <SEO {...SEODetails}>
        <link as="script" rel="preload" href="/css/light.css" />
        <link as="script" rel="preload" href="/css/dark.css" />
      </SEO>
      <div className="w-full md:max-w-2xl">
        <div className="w-full flex flex-col items-center">
          <DateString date={new Date(SEODetails.pubDate)} />
          <h1 className="mt-3 mb-7 text-center font-bold text-2xl sm:text-4xl">
            {post.content.title}
          </h1>
          <Author post={post} {...SEODetails} />
        </div>
        <div className="mt-7 w-full h-[1px] bg-gray-200"></div>
        <Article post={post} />
        <MorePosts morePosts={morePosts} />
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  // Once deployed directly fetch from the `deployedUrl/api/blog/slug`, look at github.com/rishi-raj-jain/rishi.app for future reference.
  try {
    const items = []
    const data = await getPost(params.slug)
    const { first_published_at, full_slug } = data['post']
    const appendFirst = (item) => (item.length ? items.push(item[0]) : null)
    appendFirst(await getOtherBlogs(first_published_at, full_slug, 1, true))
    appendFirst(await getOtherBlogs(first_published_at, full_slug, 1, false))
    data['post']['content']['long_text'] = await markdownToHtml(data.post.content.long_text)
    return {
      props: { morePosts: items, post: data['post'] },
      revalidate: 60,
    }
  } catch {
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
