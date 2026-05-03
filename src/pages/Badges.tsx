import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/lib/progress";
import { modules } from "@/data/curriculum";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const tierStyles = {
  bronze: "from-amber-700/30 to-amber-500/10 text-amber-600 ring-amber-600/30",
  silver: "from-slate-400/30 to-slate-200/10 text-slate-500 ring-slate-400/30",
  gold:   "from-yellow-400/30 to-amber-300/10 text-yellow-600 ring-yellow-500/40",
};

export default function Badges() {
  const { modulePct, completed, overallPct, quizScores, totalQuizScore, totalQuizMax } = useProgress();

  const earned = modules.map((m) => ({
    module: m,
    earned: modulePct(m.id).pct === 100,
    pct: modulePct(m.id).pct,
  }));

  const allDone = earned.every((e) => e.earned);

  return (
    <div className="space-y-6 max-w-5xl">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Achievements</p>
        <h1 className="font-display text-3xl font-bold">Progress & Badges</h1>
        <p className="text-muted-foreground mt-1">Complete every lesson in a module to earn its badge.</p>
      </header>

      <Card className="p-6 shadow-card">
        <div className="flex flex-wrap gap-6 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Yokogawa Readiness</p>
            <div className="font-display text-5xl font-bold">{overallPct}%</div>
            <p className="text-xs text-muted-foreground mt-1">{completed.length} lessons completed</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Progress value={overallPct} className="h-3" />
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Quiz score</p>
            <div className="font-display text-3xl font-bold">{totalQuizScore} / {totalQuizMax || "—"}</div>
            <p className="text-xs text-muted-foreground mt-1">{Object.keys(quizScores).length} quizzes taken</p>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="font-display text-lg font-semibold mb-3">Module badges</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {earned.map(({ module, earned, pct }) => (
            <Card key={module.id} className={cn(
              "p-5 shadow-card text-center relative overflow-hidden",
              !earned && "opacity-80"
            )}>
              <div className={cn(
                "mx-auto h-20 w-20 rounded-full bg-gradient-to-br ring-4 flex items-center justify-center mb-3",
                tierStyles[module.badge.tier]
              )}>
                {earned ? <Award className="h-10 w-10" /> : <Lock className="h-8 w-8" />}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{module.badge.tier} badge</p>
              <h3 className="font-display font-semibold leading-tight">{module.badge.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Module {module.number}</p>
              <div className="mt-3">
                <Progress value={pct} className="h-1.5" />
                <p className="text-[11px] text-muted-foreground mt-1">{pct}% complete</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card className={cn(
        "p-6 shadow-card text-center",
        allDone ? "bg-gradient-hero text-white" : ""
      )}>
        <div className="mx-auto h-16 w-16 rounded-full bg-white/15 ring-4 ring-white/20 flex items-center justify-center mb-3">
          {allDone ? <Award className="h-8 w-8" /> : <Lock className="h-7 w-7 text-muted-foreground" />}
        </div>
        <p className="text-[10px] uppercase tracking-widest opacity-80">Master badge</p>
        <h3 className="font-display text-xl font-bold">🥇 Yokogawa Ready</h3>
        <p className={cn("text-sm mt-1", allDone ? "text-white/80" : "text-muted-foreground")}>
          {allDone ? "You've completed every module. Time to apply." : "Complete all four modules to unlock."}
        </p>
      </Card>
    </div>
  );
}
