"use client";

import { Root as Portal } from "@radix-ui/react-portal";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { HTMLAttributes, JSX, MouseEventHandler, ReactNode } from "react";

import type { Question } from "@/lib/analysis";

import styles from "./analysis.module.css";

const noop = (): void => {
  throw new TypeError("Cannot be executed before initialization.");
};

interface AnalysisContextValue {
  count: number;
  questions: Question[];
  setCount: (value: number) => void;
  startAnalyze: () => void;
}

const AnalysisContext = createContext<AnalysisContextValue>({
  count: 0,
  questions: [],
  setCount: noop,
  startAnalyze: noop,
});

const useAnalysisContext = (): AnalysisContextValue => use(AnalysisContext);

interface UseAnalyzerReturn {
  startAnalyze: () => void;
}

const useAnalyzer = (): UseAnalyzerReturn => {
  const { startAnalyze } = useAnalysisContext();

  return { startAnalyze };
};

interface UseCounterReturn {
  currentCount: number;
  maxCount: number;
  setCount: (count: number) => void;
}

const useCounter = (): UseCounterReturn => {
  const { count: currentCount, questions, setCount } = useAnalysisContext();
  const maxCount = useMemo(() => questions.length, [questions]);

  return { currentCount, maxCount, setCount };
};

const useCurrentQuestion = (): Question => {
  const { count, questions } = useAnalysisContext();
  const question = questions[count - 1];

  return question;
};

export const Header = (): JSX.Element => {
  const { currentCount: count, maxCount } = useCounter();
  const question = useCurrentQuestion();

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
  );
};

interface AnswerProps {
  question: Question;
  show?: boolean;
}

const Answer = ({ question, show = false }: AnswerProps): JSX.Element => {
  const { startAnalyze } = useAnalyzer();
  const { currentCount, maxCount, setCount } = useCounter();

  const handleClickAnswer = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (currentCount < maxCount) {
      setCount(currentCount + 1);
    } else {
      startAnalyze();
    }
  }, [currentCount, maxCount, setCount, startAnalyze]);

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
  );
};

type AnswerListProps = HTMLAttributes<HTMLDivElement>;

export const AnswerList = ({
  style,
  ...props
}: AnswerListProps): JSX.Element => {
  const { questions } = useAnalysisContext();
  const { currentCount } = useCounter();

  return (
    <div
      {...props}
      style={{
        // @ts-expect-error CSS Variables
        "--answer-count": currentCount,
        ...style,
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
  );
};

type PrevButtonProps = HTMLAttributes<HTMLButtonElement>;

export const PrevButton = ({
  className,
  onClick,
  ...props
}: PrevButtonProps): JSX.Element => {
  const { currentCount, setCount } = useCounter();

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (typeof onClick === "function") {
        onClick(event);
      }

      setCount(currentCount - 1);
    },
    [currentCount, setCount, onClick]
  );

  return (
    <button
      className={clsx(className, { [styles.prevButtonHide]: currentCount < 2 })}
      onClick={handleClick}
      type="button"
      {...props}
    />
  );
};

interface AnalyzingProps {
  resultURL: string;
}

const Analyzing = ({ resultURL }: AnalyzingProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(resultURL);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [resultURL, router]);

  return (
    <Portal className={styles.nowAnalyzing}>
      <p className={styles.nowAnalyzingText}>あなたのオタクタイプを分析中</p>
    </Portal>
  );
};

interface Props {
  children: ReactNode;
  questions: Question[];
  resultIDs: string[];
}

export default function Analysis({
  children,
  questions,
  resultIDs,
}: Props): JSX.Element {
  const [count, setCount] = useState(1);
  const [resultURL, setResultURL] = useState<string | null>(null);
  const maxCount = useMemo(() => questions.length, [questions]);

  const wrappedSetCount = useCallback(
    (value: number) => {
      if (!(value >= 1 && value <= maxCount)) {
        throw new RangeError(`The argument must be between 1 and ${maxCount}.`);
      }

      setCount(value);
    },
    [maxCount, setCount]
  );

  const startAnalyze = useCallback(() => {
    // Pick the result in the browser when the last question is answered so
    // that every visitor gets their own random result.
    const resultID = resultIDs[Math.floor(resultIDs.length * Math.random())];

    setResultURL(`/s/${resultID}`);
  }, [resultIDs]);

  const contextValue = useMemo(
    () => ({ count, questions, setCount: wrappedSetCount, startAnalyze }),
    [count, questions, wrappedSetCount, startAnalyze]
  );

  return (
    <AnalysisContext value={contextValue}>
      {children}

      {resultURL && <Analyzing resultURL={resultURL} />}
    </AnalysisContext>
  );
}
