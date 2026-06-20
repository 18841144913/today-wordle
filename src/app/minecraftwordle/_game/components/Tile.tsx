import type { LetterStatus } from "../types";

interface Props {
  letter: string;
  status: LetterStatus;
  index: number;
  revealed: boolean;
}

export function Tile({ letter, status, index, revealed }: Props) {
  const filled = letter !== "";
  const cls = [
    "tile",
    revealed ? "tile--revealed" : "",
    filled && !revealed ? "tile--pop" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cls}
      data-status={status}
      style={revealed ? { animationDelay: `${index * 160}ms` } : undefined}
    >
      {letter.toUpperCase()}
    </div>
  );
}
