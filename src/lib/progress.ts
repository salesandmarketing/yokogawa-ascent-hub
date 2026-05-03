import { useEffect, useState, useCallback } from "react";
import { allLessonIds, modules, totalLessons } from "@/data/curriculum";

const KEY_LESSONS = "yk:lessons-completed";
const KEY_QUIZZES = "yk:quiz-scores";
const KEY_THEME = "yk:theme";

type QuizScores = Record<string, { score: number; total: number }>;

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>(() => read<string[]>(KEY_LESSONS, []));
  const [quizScores, setQuizScores] = useState<QuizScores>(() => read<QuizScores>(KEY_QUIZZES, {}));

  useEffect(() => {
    const onStorage = () => {
      setCompleted(read<string[]>(KEY_LESSONS, []));
      setQuizScores(read<QuizScores>(KEY_QUIZZES, {}));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleLesson = useCallback((id: string, done?: boolean) => {
    setCompleted((prev) => {
      const isDone = done ?? !prev.includes(id);
      const next = isDone ? Array.from(new Set([...prev, id])) : prev.filter((x) => x !== id);
      localStorage.setItem(KEY_LESSONS, JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
      return next;
    });
  }, []);

  const recordQuiz = useCallback((lessonId: string, score: number, total: number) => {
    setQuizScores((prev) => {
      const existing = prev[lessonId];
      // keep best score
      const better = !existing || score > existing.score;
      const next = better ? { ...prev, [lessonId]: { score, total } } : prev;
      localStorage.setItem(KEY_QUIZZES, JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
      return next;
    });
  }, []);

  const overallPct = Math.round((completed.length / totalLessons) * 100);
  const modulePct = (moduleId: string) => {
    const mod = modules.find((m) => m.id === moduleId)!;
    const done = mod.lessons.filter((l) => completed.includes(l.id)).length;
    return { done, total: mod.lessons.length, pct: Math.round((done / mod.lessons.length) * 100) };
  };

  const totalQuizScore = Object.values(quizScores).reduce((s, v) => s + v.score, 0);
  const totalQuizMax = Object.values(quizScores).reduce((s, v) => s + v.total, 0);

  return { completed, toggleLesson, quizScores, recordQuiz, overallPct, modulePct, totalQuizScore, totalQuizMax, allLessonIds };
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(KEY_THEME)) as "light" | "dark" | null;
    if (saved) return saved;
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(KEY_THEME, theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
