import { getPost, getOtherBlogs } from '@/lib/api'

export default async function handler(req, res) {
  const { slug } = req.query
  if (req.method === 'GET') {
    const items = []
    const data = await getPost(slug)
    const { first_published_at, full_slug } = data['post']
    const appendFirst = (item) => (item.length ? items.push(item[0]) : null)
    appendFirst(await getOtherBlogs(first_published_at, full_slug, 1, true))
    appendFirst(await getOtherBlogs(first_published_at, full_slug, 1, false))
    res.status(200).json({
      morePosts: items,
      ...data,
    })
  }
  res.status(404)
}
