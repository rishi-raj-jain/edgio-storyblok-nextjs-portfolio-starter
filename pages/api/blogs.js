import { defaultBlogs } from '@/lib/data'
import { getAllPostsForHome, getRecommendedPosts, getTagline } from '@/lib/api'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const allPosts = (await getAllPostsForHome()) || []
    const recommendedPosts = (await getRecommendedPosts()) || []
    const blogsTagline = (await getTagline('blogs')) || defaultBlogs
    res.status(200).json({ allPosts, recommendedPosts, blogsTagline })
  }
  res.status(404)
}
