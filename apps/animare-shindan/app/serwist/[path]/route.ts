import { createSerwistRoute } from '@serwist/turbopack'
import { cacheLife } from 'next/cache'

// `createSerwistRoute` also returns route segment config (`dynamic`,
// `revalidate`, ...) that is not compatible with Cache Components, so only
// `generateStaticParams` is re-exported. The generated files are cached with
// `use cache` instead so that they are prerendered at build time.
const serwist = createSerwistRoute({
  swSrc: 'app/sw.ts',
  useNativeEsbuild: true
})

export const { generateStaticParams } = serwist

type ServiceWorkerFile = {
  body: string
  contentType: string
}

async function getServiceWorkerFile(
  path: string
): Promise<ServiceWorkerFile | null> {
  'use cache'
  cacheLife('max')

  const response = await serwist.GET(new Request('http://localhost/'), {
    params: Promise.resolve({ path })
  })
  const body = await response.text()

  return body
    ? {
        body,
        contentType: response.headers.get('Content-Type') ?? 'text/plain'
      }
    : null
}

export async function GET(
  _request: Request,
  { params }: RouteContext<'/serwist/[path]'>
): Promise<Response> {
  const { path } = await params
  const file = await getServiceWorkerFile(path)

  if (!file) {
    return new Response(null, { status: 404 })
  }

  return new Response(file.body, {
    headers: {
      'Content-Type': file.contentType,
      'Service-Worker-Allowed': '/'
    }
  })
}
