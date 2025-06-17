import type { Quiz, QuizWithAnswers } from "./types"
import { getDatabase } from "./mongodb"

export async function saveQuiz(quiz: Quiz, correctAnswers: Record<string, string>): Promise<string> {
  try {
    const db = await getDatabase()
    const quizzesCollection = db.collection("quizzes")

    const quizWithAnswers: QuizWithAnswers = {
      ...quiz,
      correctAnswers,
      createdAt: new Date(),
    }

    const result = await quizzesCollection.insertOne(quizWithAnswers)
    return quiz.quizId
  } catch (error) {
    console.error("Error saving quiz to MongoDB:", error)
    throw new Error("Failed to save quiz")
  }
}

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  try {
    const db = await getDatabase()
    const quizzesCollection = db.collection("quizzes")

    const quiz = await quizzesCollection.findOne({ quizId })

    if (!quiz) {
      return null
    }

    // Return quiz without correct answers for security
    return {
      quizId: quiz.quizId,
      topic: quiz.topic,
      questions: quiz.questions,
    }
  } catch (error) {
    console.error("Error fetching quiz from MongoDB:", error)
    return null
  }
}

export async function getQuizAnswers(quizId: string): Promise<Record<string, string> | null> {
  try {
    const db = await getDatabase()
    const quizzesCollection = db.collection("quizzes")

    const quiz = await quizzesCollection.findOne({ quizId })

    if (!quiz) {
      return null
    }

    return quiz.correctAnswers || null
  } catch (error) {
    console.error("Error fetching quiz answers from MongoDB:", error)
    return null
  }
}

export async function saveQuizResult(
  quizId: string,
  userAnswers: Record<string, string>,
  score: number,
): Promise<void> {
  try {
    const db = await getDatabase()
    const resultsCollection = db.collection("quiz_results")

    await resultsCollection.insertOne({
      quizId,
      userAnswers,
      score,
      completedAt: new Date(),
    })
  } catch (error) {
    console.error("Error saving quiz result to MongoDB:", error)
    throw new Error("Failed to save quiz result")
  }
}
