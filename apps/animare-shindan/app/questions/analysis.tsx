"use client";

import { Root as Portal } from "@radix-ui/react-portal";
import { useRouter } from "next/navigation";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ComponentProps,
  HTMLAttributes,
  JSX,
  MouseEventHandler,
  ReactNode,
} from "react";

import { Button } from "@/components/button";
import type { Question } from "@/lib/analysis";
import { cn } from "@/lib/cn";

const noop = (): void => {
  throw new TypeError("Cannot be executed before initialization.");
};

interface AnalysisContextValue {
  analyzing: boolean;
  count: number;
  questions: Question[];
  setCount: (value: number) => void;
  startAnalyze: () => void;
}

const AnalysisContext = createContext<AnalysisContextValue>({
  analyzing: false,
  count: 0,
  questions: [],
  setCount: noop,
  startAnalyze: noop,
});

const useAnalysisContext = (): AnalysisContextValue => use(AnalysisContext);

interface UseAnalyzerReturn {
  analyzing: boolean;
  startAnalyze: () => void;
}

const useAnalyzer = (): UseAnalyzerReturn => {
  const { analyzing, startAnalyze } = useAnalysisContext();

  return { analyzing, startAnalyze };
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prevCount = useRef(count);

  // Move the focus to the new question so that keyboard and screen reader
  // users can follow the transition. Nothing is done on the initial render to
  // keep the default focus position when the page is opened.
  useEffect(() => {
    if (prevCount.current !== count) {
      titleRef.current?.focus({ preventScroll: true });
    }

    prevCount.current = count;
  }, [count]);

  return (
    <>
      <header className="flex min-h-41 flex-col items-center justify-center gap-4 sm:min-h-49">
        <p className="m-0 flex h-10 min-w-20 items-center justify-center rounded-full bg-sun px-4 pb-1 text-22 font-black tracking-badge text-ink">
          <span className="sr-only">質問</span>Q{count}
        </p>
        <h2
          className="m-0 w-full px-2 text-center text-2xl leading-normal font-black tracking-wide text-balance wrap-anywhere break-auto-phrase text-white sm:text-3xl"
          ref={titleRef}
          tabIndex={-1}
        >
          {question.title}
        </h2>
      </header>

      <div className="mt-2 px-1.5">
        <p className="m-0 flex h-10 items-baseline justify-end gap-0.5 text-sm leading-9 font-black text-white">
          {maxCount === count ? (
            <mark className="bg-transparent text-lg text-highlight">
              ラスト
            </mark>
          ) : (
            <>
              残り
              <mark className="bg-transparent text-2xl text-highlight">
                {maxCount - (count - 1)}
              </mark>
              問
            </>
          )}
        </p>

        <progress
          aria-label="診断の進み具合"
          className="block h-3 w-full appearance-none overflow-hidden rounded-md border-0 bg-black/30 [&::-moz-progress-bar]:rounded-md [&::-moz-progress-bar]:bg-highlight [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-md [&::-webkit-progress-value]:bg-highlight motion-safe:[&::-webkit-progress-value]:transition-[width] motion-safe:[&::-webkit-progress-value]:duration-300 motion-safe:[&::-webkit-progress-value]:ease-out"
          max={maxCount}
          value={count}
        />
      </div>
    </>
  );
};

interface AnswerProps {
  question: Question;
  show?: boolean;
}

const Answer = ({ question, show = false }: AnswerProps): JSX.Element => {
  const { analyzing, startAnalyze } = useAnalyzer();
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
    <fieldset
      aria-hidden={!show}
      className={cn(
        "mt-5 flex min-w-0 shrink-0 grow-0 basis-full flex-col gap-2.5 px-1.5 py-1.5 backface-hidden motion-safe:transition-opacity motion-safe:duration-400 motion-safe:ease-linear sm:gap-3",
        show ? "opacity-100" : "opacity-0"
      )}
      // Answers of the other questions are kept in the DOM for the slide
      // animation, so they must not be focusable.
      inert={!show}
    >
      <legend className="sr-only">{question.title}</legend>

      {question.answers.map((answer, i) => (
        <button
          className="flex min-h-17.5 w-full items-center justify-start rounded-2xl border-3 border-ink bg-white px-5 py-3 text-left text-base leading-heading font-bold break-words text-ink transition-[background-color,box-shadow] duration-150 ease-out hover:bg-highlight-tint hover:shadow-raised active:bg-highlight disabled:cursor-default sm:min-h-21.5 sm:text-xl sm:leading-compact"
          disabled={analyzing}
          key={`answer-${i}`}
          onClick={handleClickAnswer}
          type="button"
        >
          {answer}
        </button>
      ))}
    </fieldset>
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

type PrevButtonProps = ComponentProps<typeof Button>;

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
    <Button
      className={cn(className, currentCount < 2 && "invisible opacity-0")}
      onClick={handleClick}
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
    <Portal className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 text-center text-xl font-black text-white motion-safe:animate-fade-in sm:text-2xl">
      <output className="after:absolute after:ml-0.5 after:inline-block after:content-[''] motion-safe:after:animate-loading-dots motion-reduce:after:content-['...']">
        あなたのオタクタイプを分析中
      </output>
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
    () => ({
      analyzing: resultURL !== null,
      count,
      questions,
      setCount: wrappedSetCount,
      startAnalyze,
    }),
    [count, questions, resultURL, wrappedSetCount, startAnalyze]
  );

  return (
    <AnalysisContext value={contextValue}>
      {children}

      {resultURL && <Analyzing resultURL={resultURL} />}
    </AnalysisContext>
  );
}
