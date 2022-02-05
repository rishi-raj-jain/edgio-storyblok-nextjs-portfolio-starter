import { getTagline } from '@/lib/api'
import { defaultHome } from '@/lib/data'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const homeTagline = (await getTagline('home')) || defaultHome
    res.status(200).json({ homeTagline })
  }
  res.status(404)
}
