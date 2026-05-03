import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles, Calendar, Trophy } from "lucide-react";
import { modules, monthPlan } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const dotColor = (p: number) =>
  p === 1 ? "bg-primary" : "bg-warning";

export default function Dashboard() {
  const { overallPct, modulePct, completed, totalQuizScore, totalQuizMax } = useProgress();

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-hero text-white p-8 sm:p-10 shadow-elevated relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold bg-white/15 rounded-full px-3 py-1 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Yokogawa Readiness
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            Your Yokogawa Readiness Tracker
          </h1>
          <p className="mt-2 text-white/80 max-w-2xl">
            A focused study path covering CENTUM VP, Safety Instrumented Systems,
            engineering English, and the integration tools Yokogawa engineers use every day.
          </p>

          <div className="mt-8 max-w-xl">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-medium">Overall progress</span>
              <span className="font-display text-3xl font-bold">{overallPct}%</span>
            </div>
            <Progress value={overallPct} className="h-2 bg-white/20" />
            <p className="mt-2 text-xs text-white/70">
              {completed.length} lessons completed · You are {overallPct}% Yokogawa-ready
            </p>
          </div>
        </div>
      </section>

      {/* Priority cards */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-semibold">Priority Modules</h2>
            <p className="text-sm text-muted-foreground">Tackle Priority 1 first — it carries the most weight in your interview.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((m) => {
            const p = modulePct(m.id);
            const Icon = m.icon;
            return (
              <Card key={m.id} className="p-5 shadow-card flex flex-col gap-4 hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className={cn("h-2.5 w-2.5 rounded-full", dotColor(m.priority))} />
                    {m.priorityLabel}
                  </div>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold leading-tight">{m.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{m.lessons.length} lessons</p>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-semibold">{p.pct}%</span>
                  </div>
                  <Progress value={p.pct} className="h-1.5" />
                </div>
                <Button asChild size="sm" className="mt-auto w-full">
                  <Link to={`/module/${m.slug}`}>
                    {p.done > 0 ? "Continue" : "Start"} <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Timeline + stats */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="font-display font-semibold">Study Timeline</h3>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/timeline">Open <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
            </Button>
          </div>
          <ol className="relative border-l border-border ml-2 space-y-5">
            {monthPlan.map((mo, idx) => (
              <li key={mo.month} className="ml-5">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{mo.month}</span>
                  <h4 className="font-display font-semibold">{mo.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{mo.goals.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-primary" />
            <h3 className="font-display font-semibold">Quiz Performance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="font-display text-3xl font-bold">{totalQuizScore}<span className="text-lg text-muted-foreground"> / {totalQuizMax || "—"}</span></div>
              <p className="text-xs text-muted-foreground mt-0.5">Best scores recorded across all lessons</p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/badges">View badges</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
