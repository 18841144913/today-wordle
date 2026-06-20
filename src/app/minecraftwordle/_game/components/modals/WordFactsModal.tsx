import { getWordInfo } from "../../controllers/wordController";
import type { GameState } from "../../types";
import { Modal } from "../ui/Modal";
import { ShareBar } from "../ShareBar";

interface Props {
  open: boolean;
  onClose: () => void;
  state: GameState;
  currentStreak: number;
  onNotice: (msg: string) => void;
}

export function WordFactsModal({ open, onClose, state, currentStreak, onNotice }: Props) {
  const info = getWordInfo(state.dayIndex);
  const won = state.status === "won";

  return (
    <Modal open={open} title={won ? "You got it!" : "So close!"} onClose={onClose}>
      <p className="result-line">
        {won ? "Solved in " : "The word was "}
        {won ? `${state.guesses.length}/6` : ""}
        <span className="result-word">{info.word.toUpperCase()}</span>
      </p>

      <p className="streak-line">Current streak: {currentStreak}</p>

      <h3 className="facts-title">Facts about your word</h3>
      <p className="facts-about">{info.about}</p>
      {info.wiki && (
        <a className="wiki-link" href={info.wiki} target="_blank" rel="noopener noreferrer">
          Minecraft wiki page about today&apos;s word
        </a>
      )}

      <ShareBar state={state} onNotice={onNotice} />
    </Modal>
  );
}
