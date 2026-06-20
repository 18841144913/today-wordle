"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Board } from "./components/Board";
import { Header } from "./components/Header";
import { Keyboard } from "./components/Keyboard";
import { Toast } from "./components/Toast";
import { HowToPlayModal } from "./components/modals/HowToPlayModal";
import { StatsModal } from "./components/modals/StatsModal";
import { WordFactsModal } from "./components/modals/WordFactsModal";
import { WORD_LENGTH } from "./types";
import { useGame } from "./hooks/useGame";
import { useTheme } from "./hooks/useTheme";

const FLIP_DURATION = WORD_LENGTH * 160 + 650;

export function MinecraftWordleGame({ children }: { children?: ReactNode }) {
  const { state, stats, toast, justFinished, shakeKey, dispatch, keyStatuses, clearJustFinished } =
    useGame();
  const { theme, toggle } = useTheme();

  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<number | undefined>(undefined);
  const openedOnLoad = useRef(false);

  const showNotice = useCallback((msg: string) => {
    setNotice(msg);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 1600);
  }, []);

  // First-time visitors see the instructions.
  useEffect(() => {
    if (!localStorage.getItem("mcdle:seen-help")) {
      setShowHelp(true);
      localStorage.setItem("mcdle:seen-help", "1");
    }
  }, []);

  // Reveal the facts modal after the winning/losing row finishes flipping.
  useEffect(() => {
    if (!justFinished) return;
    const t = window.setTimeout(() => {
      setShowFacts(true);
      clearJustFinished();
    }, FLIP_DURATION);
    return () => window.clearTimeout(t);
  }, [justFinished, clearJustFinished]);

  // Returning visitor who already finished today: show their result once.
  useEffect(() => {
    if (!openedOnLoad.current && state.status !== "playing") {
      openedOnLoad.current = true;
      setShowFacts(true);
    }
  }, [state.status]);

  return (
    <div className="mcdle-root" data-theme={theme}>
      <div className="mcdle-app">
        <Header
          theme={theme}
          onToggleTheme={toggle}
          onHelp={() => setShowHelp(true)}
          onStats={() => setShowStats(true)}
        />

        <main className="app-main">
          <Board state={state} shakeKey={shakeKey} />
        </main>

        <Keyboard statuses={keyStatuses} onKey={dispatch} />

        {children}
      </div>

      <Toast message={notice ?? toast} />

      <HowToPlayModal open={showHelp} onClose={() => setShowHelp(false)} />
      <StatsModal open={showStats} onClose={() => setShowStats(false)} stats={stats} />
      <WordFactsModal
        open={showFacts}
        onClose={() => setShowFacts(false)}
        state={state}
        currentStreak={stats.currentStreak}
        onNotice={showNotice}
      />
    </div>
  );
}
