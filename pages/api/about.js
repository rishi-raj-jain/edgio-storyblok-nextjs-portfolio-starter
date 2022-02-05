import { defaultAbout } from '@/lib/data'
import { getTagline, getTimelineItems } from '@/lib/api'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let arePosts = true,
      page = 1,
      Timeline = {}
    while (arePosts) {
      let tempTimeline = (await getTimelineItems(5, page)) || []
      if (tempTimeline.length > 0) {
        tempTimeline.forEach((a) => {
          if (Timeline.hasOwnProperty(a.content.Year)) {
            Timeline[a.content.Year].push(a)
          } else {
            Timeline[a.content.Year] = [a]
          }
        })
        page += 1
      } else {
        arePosts = false
      }
    }
    const aboutTagline = (await getTagline('about')) || defaultAbout
    res.status(200).json({ Timeline, aboutTagline })
  }
  res.status(404)
}
