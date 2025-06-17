export interface Question {
  id: number
  text: string
  options: string[]
}

export interface Quiz {
  quizId: string
  topic: string
  questions: Question[]
}

export interface QuizWithAnswers extends Quiz {
  correctAnswers: Record<string, string>
  createdAt: Date
}

export interface QuizFeedback {
  id: number
  yourAnswer: string
  correctAnswer: string
}

export interface AIQuizRequest {
  topic: string
}

export interface AIQuizResponse {
  questions: Question[]
  answers: Record<string, string>
}
