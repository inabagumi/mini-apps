import remark from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'

export async function convert(body: string): Promise<string> {
  const file = await remark().use(gfm).use(html).process(body)

  return file.toString()
}
