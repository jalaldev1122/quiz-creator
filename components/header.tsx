import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Topic Quiz Creator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Generate quizzes on any topic with AI</p>
      </div>
      <ModeToggle />
    </header>
  )
}
