import { type Metadata } from 'next'

import { getAnalysisResultIDs, getQuestions } from '@/lib/analysis'

import Analysis, { AnswerList, Header, PrevButton } from './analysis'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: {
    canonical: '/questions'
  },
  title: '診断中...'
}

export default async function QuestionsPage(): Promise<JSX.Element> {
  const [questions, results] = await Promise.all([
    getQuestions(),
    getAnalysisResultIDs()
  ])
  const resultID = results[Math.floor(results.length * Math.random())]
  const resultURL = `/s/${resultID}`

  return (
    <Analysis questions={questions} resultURL={resultURL}>
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
