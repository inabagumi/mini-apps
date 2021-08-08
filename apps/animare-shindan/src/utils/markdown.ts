import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export async function convert(body: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(body)

  return file.toString()
}
