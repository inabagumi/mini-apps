'use client'

import { Root as Portal } from '@radix-ui/react-portal'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import {
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { type Question } from '@/lib/analysis'

import styles from './analysis.module.css'

function noop(): void {
  throw new TypeError('Cannot be executed before initialization.')
}

type AnalysisContextValue = {
  count: number
  questions: Question[]
  setCount: (value: number) => void
  startAnalyze: () => void
}

const AnalysisContext = createContext<AnalysisContextValue>({
  count: 0,
  questions: [],
  setCount: noop,
  startAnalyze: noop
})

function useAnalysisContext(): AnalysisContextValue {
  return useContext(AnalysisContext)
}

type UseAnalyzerReturn = {
  startAnalyze: () => void
}

function useAnalyzer(): UseAnalyzerReturn {
  const { startAnalyze } = useAnalysisContext()

  return { startAnalyze }
}

type UseCounterReturn = {
  currentCount: number
  maxCount: number
  setCount: (count: number) => void
}

function useCounter(): UseCounterReturn {
  const { count: currentCount, questions, setCount } = useAnalysisContext()
  const maxCount = useMemo(() => questions.length, [questions])

  return { currentCount, maxCount, setCount }
}

function useCurrentQuestion(): Question {
  const { count, questions } = useAnalysisContext()
  const question = questions[count - 1]

  return question
}

export function Header(): JSX.Element {
  const { currentCount: count, maxCount } = useCounter()
  const question = useCurrentQuestion()

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.number}>Q{count}</h3>
        <h2 className={styles.title}>{question.title}</h2>
      </header>

      <div className={styles.counter}>
        {maxCount === count ? (
          <p className={styles.counterContent}>
            <mark
              className={clsx(styles.counterValue, styles.counterValueLast)}
            >
              ラスト
            </mark>
          </p>
        ) : (
          <p className={styles.counterContent}>
            残り
            <mark className={styles.counterValue}>
              {maxCount - (count - 1)}
            </mark>
            問
          </p>
        )}

        <progress className={styles.progressBar} max={maxCount} value={count} />
      </div>
    </>
  )
}

type AnswerProps = {
  question: Question
  show?: boolean
}

function Answer({ question, show = false }: AnswerProps): JSX.Element {
  const { startAnalyze } = useAnalyzer()
  const { currentCount, maxCount, setCount } = useCounter()

  const handleClickAnswer = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (currentCount < maxCount) {
      setCount(currentCount + 1)
    } else {
      startAnalyze()
    }
  }, [currentCount, maxCount, setCount, startAnalyze])

  return (
    <div
      aria-hidden={!show}
      className={clsx(styles.answer, { [styles.answerShow]: show })}
    >
      {question.answers.map((answer, i) => (
        <button
          className={styles.answerButton}
          key={`answer-${i}`}
          onClick={handleClickAnswer}
          type="button"
        >
          {answer}
        </button>
      ))}
    </div>
  )
}

type AnswerListProps = HTMLAttributes<HTMLDivElement>

export function AnswerList({ style, ...props }: AnswerListProps): JSX.Element {
  const { questions } = useAnalysisContext()
  const { currentCount } = useCounter()

  return (
    <div
      {...props}
      style={{
        // @ts-expect-error CSS Variables
        '--answer-count': currentCount,
        ...style
      }}
    >
      {questions.map((question, i) => (
        <Answer
          key={question.title}
          question={question}
          show={currentCount === i + 1}
        />
      ))}
    </div>
  )
}

type PrevButtonProps = HTMLAttributes<HTMLButtonElement>

export function PrevButton({
  className,
  onClick,
  ...props
}: PrevButtonProps): JSX.Element {
  const { currentCount, setCount } = useCounter()

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (typeof onClick === 'function') {
        onClick(event)
      }

      setCount(currentCount - 1)
    },
    [currentCount, setCount, onClick]
  )

  return (
    <button
      className={clsx(className, { [styles.prevButtonHide]: currentCount < 2 })}
      onClick={handleClick}
      type="button"
      {...props}
    />
  )
}

type AnalyzingProps = {
  resultURL: string
}

function Analyzing({ resultURL }: AnalyzingProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(resultURL)
    }, 1_500)

    return () => {
      clearTimeout(timer)
    }
  }, [resultURL, router])

  return (
    <Portal className={styles.nowAnalyzing}>
      <p className={styles.nowAnalyzingText}>あなたのオタクタイプを分析中</p>
    </Portal>
  )
}

type Props = {
  children: ReactNode
  questions: Question[]
  resultURL: string
}

export default function Analysis({
  children,
  questions,
  resultURL
}: Props): JSX.Element {
  const [count, setCount] = useState(1)
  const [nowAnalyzing, setNowAnalyzing] = useState(false)
  const maxCount = useMemo(() => questions.length, [questions])

  const wrappedSetCount = useCallback(
    (count: number) => {
      if (!(1 <= count && count <= maxCount)) {
        throw new RangeError(`The argument must be between 1 and ${maxCount}.`)
      }

      setCount(count)
    },
    [maxCount, setCount]
  )

  const startAnalyze = useCallback(() => {
    setNowAnalyzing(true)
  }, [setNowAnalyzing])

  return (
    <AnalysisContext.Provider
      value={{ count, questions, setCount: wrappedSetCount, startAnalyze }}
    >
      {children}

      {nowAnalyzing && <Analyzing resultURL={resultURL} />}
    </AnalysisContext.Provider>
  )
}
