export const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'

export const month = new Array()
month[0] = 'January'
month[1] = 'February'
month[2] = 'March'
month[3] = 'April'
month[4] = 'May'
month[5] = 'June'
month[6] = 'July'
month[7] = 'August'
month[8] = 'September'
month[9] = 'October'
month[10] = 'November'
month[11] = 'December'

export const getOrigin = (req) => {
  let origin
  if (typeof window !== 'undefined') {
    origin = window.location.origin
  }
  if (req) {
    let hostURL = req.headers['host']
    if (hostURL) {
      hostURL = hostURL.replace('http://', '')
      hostURL = hostURL.replace('https://', '')
      if (hostURL.includes('localhost:') || hostURL.includes('127.0.0.1')) {
        origin = `http://${hostURL}`
      } else {
        origin = `https://${hostURL}`
      }
    }
  }
  return origin
}
