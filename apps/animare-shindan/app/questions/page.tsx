import { type Metadata } from 'next'
import { type JSX } from 'react'

import { getAnalysisResultIDs, getQuestions } from '@/lib/analysis'

import Analysis, { AnswerList, Header, PrevButton } from './analysis'
import styles from './page.module.css'

export const metadata: Metadata = {
  alternates: {
    canonical: '/questions'
  },
  title: '診断中...'
}

export default async function QuestionsPage(): Promise<JSX.Element> {
  const [questions, resultIDs] = await Promise.all([
    getQuestions(),
    getAnalysisResultIDs()
  ])

  return (
    <Analysis questions={questions} resultIDs={resultIDs}>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <AnswerList className={styles.answerList} />
        </div>

        <PrevButton className={styles.prevButton}>1つ前に戻る</PrevButton>
      </div>
    </Analysis>
  )
}
