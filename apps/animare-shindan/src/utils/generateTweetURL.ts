const hashtag = 'あにまーれオタクタイプ診断'

export default (url: string, text: string): string =>
  `https://twitter.com/intent/tweet?hashtags=${encodeURIComponent(
    hashtag
  )}&text=${encodeURIComponent(text + '\n')}&url=${encodeURIComponent(url)}`
