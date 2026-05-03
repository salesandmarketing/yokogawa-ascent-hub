import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

type FlashCard = { term: string; def: string; example: string };

export function Flashcards({ cards }: { cards: FlashCard[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = cards[i];
  const next = () => { setFlipped(false); setI((p) => (p + 1) % cards.length); };
  const prev = () => { setFlipped(false); setI((p) => (p - 1 + cards.length) % cards.length); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {i + 1} of {cards.length}</span>
        <span>{flipped ? "Definition" : "Term"}</span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full text-left"
      >
        <Card className="min-h-[220px] p-8 flex items-center justify-center text-center shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
          {!flipped ? (
            <h3 className="font-display text-2xl sm:text-3xl font-semibold">{c.term}</h3>
          ) : (
            <div className="space-y-3">
              <p className="text-base">{c.def}</p>
              <p className="text-sm italic text-muted-foreground">"{c.example}"</p>
            </div>
          )}
        </Card>
      </button>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" size="sm" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
        <Button variant="outline" size="sm" onClick={() => setFlipped((f) => !f)}>
          <RotateCw className="h-4 w-4 mr-1.5" /> Flip
        </Button>
        <Button variant="outline" size="sm" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
