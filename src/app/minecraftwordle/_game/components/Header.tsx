interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onHelp: () => void;
  onStats: () => void;
}

export function Header({ theme, onToggleTheme, onHelp, onStats }: Props) {
  return (
    <header className="app-header">
      <button className="icon-btn" onClick={onHelp} aria-label="How to play" title="How to play">
        ?
      </button>
      <h1 className="app-title">Minecraft Wordle</h1>
      <div className="header-actions">
        <button className="icon-btn" onClick={onStats} aria-label="Stats" title="Stats">
          #
        </button>
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? "\u2600" : "\u263E"}
        </button>
      </div>
    </header>
  );
}
