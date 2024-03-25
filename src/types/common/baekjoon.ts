interface IBaseSolvedProblem {
  problemNum: string
  problemLink: string
  language: string
}

interface ISolvedTime{
  solvedTime: string
}

interface ISolvedTimeArray{
  solvedTime: string[]
  isReview?: boolean
}

export type ISolvedProblem = IBaseSolvedProblem & ISolvedTime;

export type ICustomSolvedProblem = IBaseSolvedProblem & ISolvedTimeArray;


export interface IBaekjoonCrawlingData {
  solved_problem: ICustomSolvedProblem[]
  solved_count: number
  solved_recent: string
  updated_at: Date
  today: Date
  review_count: number
  solved_total_count:number
  solved_day:number
}