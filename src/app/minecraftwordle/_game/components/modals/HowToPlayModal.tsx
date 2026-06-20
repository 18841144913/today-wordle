import { Modal } from "../ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ open, onClose }: Props) {
  return (
    <Modal open={open} title="How To Play" onClose={onClose}>
      <p>Guess the Minecraft word in 6 tries.</p>
      <p>Each guess must be a valid 5-letter word. Use the keyboard to enter letters.</p>
      <p>The color of the tiles shows how close your guess was:</p>

      <div className="legend">
        <div className="legend__row">
          <span className="mini-tile" data-status="correct">
            G
          </span>
          <span>Right letter, right spot.</span>
        </div>
        <div className="legend__row">
          <span className="mini-tile" data-status="present">
            R
          </span>
          <span>In the word, wrong spot.</span>
        </div>
        <div className="legend__row">
          <span className="mini-tile" data-status="absent">
            A
          </span>
          <span>Not in the word.</span>
        </div>
      </div>

      <p className="hint">For example, if the word was SWORD and you guessed SLOWS:</p>
      <div className="legend__example">
        {[
          { l: "S", s: "correct" },
          { l: "L", s: "absent" },
          { l: "O", s: "present" },
          { l: "W", s: "present" },
          { l: "S", s: "absent" },
        ].map((t, i) => (
          <span className="mini-tile" data-status={t.s} key={i}>
            {t.l}
          </span>
        ))}
      </div>

      <p className="hint">A new word appears every day. Keep your streak going!</p>
    </Modal>
  );
}
