import type { ReactNode } from 'react'

export default function SimpleTitle({ children }: { children: ReactNode }) {
  return <h1 className="mb-8 font-bold text-2xl leading-6">{children}</h1>
}
