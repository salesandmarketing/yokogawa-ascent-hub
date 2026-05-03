import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/data/curriculum";
import { cn } from "@/lib/utils";

type Props = {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
};

export function Quiz({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce((s, a, i) => (a === questions[i].answer ? s + 1 : s), 0);

  const submit = () => {
    setSubmitted(true);
    onComplete?.(score, questions.length);
  };
  const reset = () => {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <Card className="p-5 sm:p-6 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-semibold">Knowledge Check</h3>
        {submitted && (
          <span className="text-sm font-medium px-2.5 py-1 rounded-md bg-accent text-accent-foreground">
            Score: {score}/{questions.length}
          </span>
        )}
      </div>

      <ol className="space-y-6">
        {questions.map((q, qi) => (
          <li key={qi} className="space-y-2">
            <p className="font-medium text-sm">
              <span className="text-muted-foreground mr-1">{qi + 1}.</span>
              {q.q}
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const picked = answers[qi] === oi;
                const correct = q.answer === oi;
                const showState = submitted;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                    className={cn(
                      "text-left text-sm px-3 py-2 rounded-md border transition-colors flex items-center gap-2",
                      !showState && picked && "border-primary bg-accent",
                      !showState && !picked && "border-border hover:border-primary/50 hover:bg-accent/50",
                      showState && correct && "border-success bg-success/10 text-foreground",
                      showState && picked && !correct && "border-destructive bg-destructive/10",
                      showState && !picked && !correct && "border-border opacity-70",
                    )}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showState && correct && <Check className="h-4 w-4 text-success" />}
                    {showState && picked && !correct && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex gap-2">
        {!submitted ? (
          <Button onClick={submit} disabled={!allAnswered}>Submit answers</Button>
        ) : (
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Try again
          </Button>
        )}
      </div>
    </Card>
  );
}
