'use client'

import { delay } from '@/lib/timer'
import { useRouter } from 'next/navigation'
import { use, useEffect } from 'react'

type Props = {
  idPromise: Promise<string>
}

export default function Redirect({ idPromise }: Props) {
  const router = useRouter()
  const [id] = use(Promise.all([idPromise, delay(2)]))

  useEffect(() => {
    router.push(`/kuji/${id}`)
  }, [router, id])

  return null
}
