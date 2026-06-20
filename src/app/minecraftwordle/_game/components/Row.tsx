import { WORD_LENGTH, type LetterStatus } from "../types";
import { Tile } from "./Tile";

interface Props {
  letters: string;
  evaluation?: LetterStatus[];
  revealed: boolean;
  shake: boolean;
}

export function Row({ letters, evaluation, revealed, shake }: Props) {
  const cells = Array.from({ length: WORD_LENGTH }, (_, i) => {
    const letter = letters[i] ?? "";
    let status: LetterStatus = "empty";
    if (evaluation) status = evaluation[i];
    else if (letter) status = "tbd";
    return { letter, status };
  });

  return (
    <div className={`row ${shake ? "row--shake" : ""}`}>
      {cells.map((c, i) => (
        <Tile key={i} letter={c.letter} status={c.status} index={i} revealed={revealed} />
      ))}
    </div>
  );
}
