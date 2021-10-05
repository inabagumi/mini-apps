import prisma from './prisma'

export type Question = {
  answers: string[]
  title: string
}

export async function getQuestions(): Promise<Question[]> {
  const questions = await prisma.question.findMany({
    orderBy: {
      id: 'desc'
    },
    select: {
      answers: {
        select: {
          value: true
        }
      },
      title: true
    }
  })

  return questions.map(({ answers, title }) => ({
    answers: answers.map((answer) => answer.value),
    title
  }))
}

export type Talent = {
  name: string
  twitter?: string | null
  youtube?: string | null
}

export type RecommendedVideo = {
  url: string
}

export type ResultParameter = {
  label: string
  value: number
}

export type Result = {
  attribute: string
  catchphrase: string
  parameters: ResultParameter[]
  recommendedVideo: RecommendedVideo
  slug: string
  talent: Talent
  type: string
}

export async function getAnalysisResult(slug: string): Promise<Result | null> {
  const result = await prisma.result.findFirst({
    select: {
      attribute: true,
      catchphrase: true,
      parameters: true,
      recommendedVideo: {
        select: {
          url: true
        }
      },
      slug: true,
      talent: {
        select: {
          name: true,
          twitter: true,
          youtube: true
        }
      },
      type: true
    },
    where: {
      slug: slug
    }
  })

  return result
    ? {
        ...result,
        parameters: result.parameters as ResultParameter[]
      }
    : null
}

export async function getAnalysisResultIDs(): Promise<string[]> {
  const results = await prisma.result.findMany({
    select: {
      slug: true
    }
  })

  return results.map((result) => result.slug)
}
