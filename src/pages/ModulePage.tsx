import { useMemo, useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { modules } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { CheckCircle2, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ModulePage() {
  const { slug } = useParams();
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return <Navigate to="/" replace />;

  const { completed, toggleLesson, recordQuiz, modulePct } = useProgress();
  const [activeId, setActiveId] = useState(mod.lessons[0].id);
  useEffect(() => { setActiveId(mod.lessons[0].id); window.scrollTo(0, 0); }, [mod.id]);

  const lesson = useMemo(() => mod.lessons.find((l) => l.id === activeId)!, [mod, activeId]);
  const idx = mod.lessons.findIndex((l) => l.id === activeId);
  const p = modulePct(mod.id);
  const Icon = mod.icon;
  const isDone = completed.includes(lesson.id);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" /> Dashboard
        </Link>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Module {mod.number} · {mod.priorityLabel}</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight">{mod.title}</h1>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Module progress · {p.done} of {p.total} lessons</span>
            <span className="font-semibold">{p.pct}%</span>
          </div>
          <Progress value={p.pct} className="h-2" />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        {/* Lesson list */}
        <aside>
          <Card className="p-2 shadow-card sticky top-20">
            <ul className="space-y-0.5">
              {mod.lessons.map((l, i) => {
                const done = completed.includes(l.id);
                const active = l.id === activeId;
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => { setActiveId(l.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-md text-sm flex items-start gap-2.5 transition-colors",
                        active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      )}
                      <span className="flex-1">
                        <span className="block text-[10px] uppercase tracking-wider opacity-60">Lesson {i + 1}</span>
                        <span className="font-medium leading-tight block">{l.title}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </aside>

        {/* Content */}
        <article className="space-y-6 min-w-0">
          <Card className="p-6 sm:p-8 shadow-card">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">Lesson {idx + 1}</p>
            <h2 className="font-display text-2xl font-bold mt-1">{lesson.title}</h2>
            <p className="text-muted-foreground mt-2">{lesson.summary}</p>

            <div className="mt-6 space-y-6">
              {lesson.sections.map((s, i) => (
                <section key={i}>
                  <h3 className="font-display text-lg font-semibold mb-2">{s.heading}</h3>
                  {s.body && <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{s.body}</p>}
                  {s.bullets && (
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {s.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Practice blocks */}
            {lesson.practice?.kind === "writing" && (
              <div className="mt-8 p-4 rounded-lg border border-dashed border-border bg-accent/30">
                <h4 className="font-semibold text-sm mb-1">Writing exercise</h4>
                <p className="text-sm text-muted-foreground mb-3">{lesson.practice.prompt}</p>
                <Textarea
                  rows={6}
                  placeholder="Type your draft here. It saves locally as you type."
                  defaultValue={localStorage.getItem(`yk:writing:${lesson.id}`) || ""}
                  onChange={(e) => localStorage.setItem(`yk:writing:${lesson.id}`, e.target.value)}
                />
              </div>
            )}

            {lesson.practice?.kind === "spot-errors" && (
              <div className="mt-8 p-4 rounded-lg border border-dashed border-border bg-accent/30 space-y-3">
                <h4 className="font-semibold text-sm">Spot the errors</h4>
                <pre className="text-sm whitespace-pre-wrap font-sans bg-card p-3 rounded-md border border-border">{lesson.practice.text}</pre>
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">Show answer key</summary>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>"Hi sir" — pick one: "Hi <name>" or "Dear sir,".</li>
                    <li>"Kindly please be inform" → "Please be informed".</li>
                    <li>"is already done yesterday" → "was completed yesterday".</li>
                    <li>"revert back" → "revert" or "get back".</li>
                    <li>"result of testings" → "test results".</li>
                    <li>Sign off with a name & role, not "The team".</li>
                  </ul>
                </details>
              </div>
            )}

            {lesson.practice?.kind === "flashcards" && lesson.practice.cards && (
              <div className="mt-8">
                <Flashcards cards={lesson.practice.cards} />
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <Checkbox checked={isDone} onCheckedChange={(v) => toggleLesson(lesson.id, !!v)} />
                <span className="text-sm font-medium">Mark this lesson as complete</span>
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={idx === 0}
                  onClick={() => setActiveId(mod.lessons[idx - 1].id)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  size="sm"
                  disabled={idx === mod.lessons.length - 1}
                  onClick={() => setActiveId(mod.lessons[idx + 1].id)}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>

          {lesson.quiz && (
            <Quiz
              key={lesson.id}
              questions={lesson.quiz}
              onComplete={(score, total) => recordQuiz(lesson.id, score, total)}
            />
          )}
        </article>
      </div>
    </div>
  );
}
