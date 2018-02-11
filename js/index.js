const in_view = el => {
  const top = el.getBoundingClientRect().top
  const bottom = el.getBoundingClientRect().bottom
  return top >= 0 && bottom <= window.innerHeight
}

document.addEventListener('DOMContentLoaded', () => {
  const MAX_NUMBER_OF_CAMERAS = 826
  const WAIT_TIME = 500
  const BASE_URL = 'http://207.251.86.238/cctv'

  Array(MAX_NUMBER_OF_CAMERAS).fill(0).forEach((_, i) =>  {
    const img = document.createElement('img')
    img.src = `${BASE_URL}${i}.jpg`
    img.title = `Camera ${i}`
    document.querySelector('body').insertAdjacentElement('beforeend', img)
  })

  document.querySelectorAll('img').forEach(el => {
    el.addEventListener('load', () => {
      let lastFetched = new Date()

      const refetch = () => {
        const currentTime = new Date()
        const notRecentlyFetched = (currentTime - lastFetched) > WAIT_TIME

        const imageLoaded = el.complete
        if (!document.hidden && notRecentlyFetched && in_view(el) && imageLoaded) {
          lastFetched = currentTime
          el.src = el.src.split('?')[0] + '?' + new Date().getTime()
        }
        setTimeout(refetch, WAIT_TIME)
      }

      setTimeout(refetch, WAIT_TIME)
    }, { once: true })
  })
})
