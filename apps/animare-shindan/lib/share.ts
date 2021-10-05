const LINE_SHARE_BASE_URL = 'https://social-plugins.line.me'
const TWEET_BASE_URL = 'https://twitter.com'
const SHARE_HASHTAG = 'あにまーれオタクタイプ診断'

export function createLineShareURL(url: string): string {
  const shareURL = new URL('/lineit/share', LINE_SHARE_BASE_URL)

  shareURL.searchParams.set('url', url)

  return shareURL.toString()
}

export function createTweetURL(url: string, text = ''): string {
  const shareURL = new URL('/intent/tweet', TWEET_BASE_URL)

  shareURL.searchParams.set('hashtags', SHARE_HASHTAG)
  shareURL.searchParams.set('text', text)
  shareURL.searchParams.set('url', url)

  return shareURL.toString()
}
