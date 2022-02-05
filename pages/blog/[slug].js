import dynamic from 'next/dynamic'
import SEO from '@/components/Seo'
import Author from '@/components/Author'
import Article from '@/components/Article'
import markdownToHtml from '@/lib/markdown'
import DateString from '@/components/DateString'
import { deploymentUrl, imageLink } from '@/lib/data'
const MorePosts = dynamic(() => import('@/components/more-posts'))

export default function Post({ content, post, morePosts }) {
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
  const blogFetch = await fetch(`${deploymentUrl}/api/blog/${params.slug}`)
  if (!blogFetch.ok) return { notFound: true }
  const blogData = await blogFetch.json()
  blogData['post']['content']['long_text'] = await markdownToHtml(blogData.post.content.long_text)
  return {
    props: { ...blogData },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
