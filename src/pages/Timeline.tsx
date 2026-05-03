import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { monthPlan, modules } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

function lessonRef(id: string) {
  for (const m of modules) {
    const l = m.lessons.find((x) => x.id === id);
    if (l) return { module: m, lesson: l };
  }
  return null;
}

export default function Timeline() {
  const [active, setActive] = useState(monthPlan[0].month);
  const { completed, toggleLesson } = useProgress();
  const current = monthPlan.find((m) => m.month === active)!;

  const monthDone = current.lessonIds.filter((id) => completed.includes(id)).length;
  const monthPct = Math.round((monthDone / current.lessonIds.length) * 100);

  return (
    <div className="space-y-6 max-w-5xl">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Roadmap</p>
        <h1 className="font-display text-3xl font-bold">Study Timeline</h1>
        <p className="text-muted-foreground mt-1">Click a month to see recommended lessons and check them off as you go.</p>
      </header>

      <div className="grid gap-2 sm:grid-cols-4">
        {monthPlan.map((m) => {
          const done = m.lessonIds.filter((id) => completed.includes(id)).length;
          const pct = Math.round((done / m.lessonIds.length) * 100);
          const isActive = m.month === active;
          return (
            <button
              key={m.month}
              type="button"
              onClick={() => setActive(m.month)}
              className={cn(
                "text-left p-4 rounded-lg border transition-all",
                isActive ? "border-primary bg-accent shadow-elevated" : "border-border bg-card hover:border-primary/50"
              )}
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.month}</p>
              <p className="font-display font-semibold mt-0.5">{m.title}</p>
              <div className="mt-3">
                <Progress value={pct} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">{done}/{m.lessonIds.length} lessons</p>
              </div>
            </button>
          );
        })}
      </div>

      <Card className="p-6 shadow-card">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{current.month}</p>
            <h2 className="font-display text-2xl font-bold">{current.title}</h2>
          </div>
          <span className="text-sm font-semibold">{monthPct}% complete</span>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Goals</h3>
          <ul className="space-y-1 text-sm">
            {current.goals.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Recommended lessons</h3>
          <ul className="divide-y divide-border border border-border rounded-lg overflow-hidden">
            {current.lessonIds.map((id) => {
              const ref = lessonRef(id);
              if (!ref) return null;
              const done = completed.includes(id);
              return (
                <li key={id} className="flex items-center gap-3 p-3 bg-card hover:bg-accent/40 transition-colors">
                  <Checkbox checked={done} onCheckedChange={(v) => toggleLesson(id, !!v)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ref.lesson.title}</p>
                    <p className="text-xs text-muted-foreground">Module {ref.module.number} · {ref.module.short}</p>
                  </div>
                  <Link
                    to={`/module/${ref.module.slug}`}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Open <ArrowRight className="h-3 w-3" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </div>
  );
}
