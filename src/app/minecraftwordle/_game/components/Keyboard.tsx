import type { Key } from "../controllers/inputController";
import type { LetterStatus } from "../types";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

interface Props {
  statuses: Record<string, LetterStatus>;
  onKey: (key: Key) => void;
}

export function Keyboard({ statuses, onKey }: Props) {
  return (
    <div className="keyboard">
      {ROWS.map((row, r) => (
        <div className="keyboard__row" key={r}>
          {r === 2 && (
            <button className="key key--wide" onClick={() => onKey("ENTER")}>
              ENTER
            </button>
          )}
          {row.split("").map((letter) => (
            <button
              key={letter}
              className="key"
              data-status={statuses[letter.toLowerCase()] ?? "empty"}
              onClick={() => onKey(letter)}
            >
              {letter}
            </button>
          ))}
          {r === 2 && (
            <button
              className="key key--wide key--icon"
              onClick={() => onKey("BACKSPACE")}
              aria-label="Backspace"
            >
              <svg viewBox="0 0 24 18" className="key__svg" aria-hidden="true">
                <path
                  d="M22 2H8L1 9l7 7h14z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6l6 6M18 6l-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
