import { MAX_GUESSES, type GameState } from "../types";
import { Row } from "./Row";

interface Props {
  state: GameState;
  shakeKey: number;
}

export function Board({ state, shakeKey }: Props) {
  const currentRow = state.status === "playing" ? state.guesses.length : -1;

  return (
    <div className="board">
      {Array.from({ length: MAX_GUESSES }, (_, row) => {
        const isSubmitted = row < state.guesses.length;
        const isCurrent = row === currentRow;
        const letters = isSubmitted ? state.guesses[row] : isCurrent ? state.current : "";
        return (
          <Row
            key={`${row}-${isCurrent ? shakeKey : "s"}`}
            letters={letters}
            evaluation={isSubmitted ? state.evaluations[row] : undefined}
            revealed={isSubmitted}
            shake={isCurrent && shakeKey > 0}
          />
        );
      })}
    </div>
  );
}
