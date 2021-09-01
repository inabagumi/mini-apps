import { promises as fs } from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import process from 'process'

export type Question = {
  answers: string[]
  title: string
}

export async function getQuestions(): Promise<Question[]> {
  const filePath = path.join(process.cwd(), 'data', 'questions.yaml')
  const content = await fs.readFile(filePath, 'utf-8')
  const questions = yaml.load(content) as Question[]

  return questions
}

export type ResultParameter = {
  label: string
  value: number
}

export type Result = {
  attribute: string
  catchphrase: string
  embedHTML: string
  image: string
  name: string
  parameters: ResultParameter[]
  slug: string
  type: string
  twitter: string
  youtube: string
}

const resultsDirectory = path.join(process.cwd(), 'data', 'results')

export async function getAnalysisResult(slug: string): Promise<Result> {
  const filePath = path.join(resultsDirectory, `${slug}.yaml`)
  const content = await fs.readFile(filePath, 'utf-8')
  const result = yaml.load(content) as Result

  return {
    ...result,
    slug
  }
}

export async function getAnalysisResultIDs(): Promise<string[]> {
  const resultFiles = await fs.readdir(resultsDirectory)
  const ids = resultFiles
    .filter((resultFile) => /\.ya?ml$/i.test(resultFile))
    .map((resultFile) => resultFile.replace(/\.ya?ml$/i, ''))

  return ids
}
