type Variant = "correct" | "masked";

const VARIANTS: Record<Variant, string> = {
  correct: "bg-correct text-white border-correct",
  masked: "bg-white text-zinc-400 border-zinc-300",
};

export function Tile({
  char,
  variant = "correct",
  className = "",
}: {
  char: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded border-2 text-2xl font-extrabold uppercase sm:h-14 sm:w-14 ${VARIANTS[variant]} ${className}`}
    >
      {char}
    </span>
  );
}

/** A full row of green tiles spelling the answer. */
export function WordTiles({ word }: { word: string }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label={`Answer: ${word}`}>
      {word.toUpperCase().split("").map((char, i) => (
        <Tile key={i} char={char} variant="correct" />
      ))}
    </div>
  );
}
