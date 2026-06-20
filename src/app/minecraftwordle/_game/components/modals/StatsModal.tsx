import { winPercentage } from "../../services/statsService";
import type { GameStats } from "../../types";
import { Modal } from "../ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  stats: GameStats;
}

export function StatsModal({ open, onClose, stats }: Props) {
  const max = Math.max(1, ...stats.guessDistribution);
  return (
    <Modal open={open} title="Statistics" onClose={onClose}>
      <div className="stats-grid">
        <Stat label="Played" value={stats.played} />
        <Stat label="Win %" value={winPercentage(stats)} />
        <Stat label="Streak" value={stats.currentStreak} />
        <Stat label="Max Streak" value={stats.maxStreak} />
      </div>

      <h3 className="dist-title">Guess Distribution</h3>
      <div className="dist">
        {stats.guessDistribution.map((count, i) => (
          <div className="dist__row" key={i}>
            <span className="dist__label">{i + 1}</span>
            <div className="dist__bar" style={{ width: `${(count / max) * 100}%` }}>
              <span>{count}</span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
