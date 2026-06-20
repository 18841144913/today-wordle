// View-layer glue: holds React state and wires View events to the
// Controller/Service/Data layers. Contains no business rules itself.
import { useCallback, useEffect, useRef, useState } from "react";
import { handleKey, normalizeKey, type Key } from "../controllers/inputController";
import { createGame, getKeyboardStatuses } from "../services/gameService";
import { emptyStats, recordResult } from "../services/statsService";
import { dayIndexFor } from "../utils/dateUtils";
import {
  loadGame,
  loadStats,
  saveGame,
  saveStats,
} from "../repositories/storageRepository";
import type { GameState, GameStats } from "../types";

export function useGame() {
  // Initial render is deterministic (a fresh board) so the server-rendered HTML
  // and the client's first render match for hydration. Persisted progress is
  // restored from localStorage right after mount, below.
  const [state, setState] = useState<GameState>(() => createGame(dayIndexFor()));
  const [stats, setStats] = useState<GameStats>(emptyStats);
  const [toast, setToast] = useState<string | null>(null);
  const [justFinished, setJustFinished] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const stateRef = useRef(state);
  stateRef.current = state;
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const dayIndex = dayIndexFor();
    const savedGame = loadGame(dayIndex);
    if (savedGame) {
      stateRef.current = savedGame;
      setState(savedGame);
    }
    const savedStats = loadStats();
    if (savedStats) setStats(savedStats);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1600);
  }, []);

  const dispatch = useCallback(
    (key: Key) => {
      const result = handleKey(stateRef.current, key);
      if (result.toast) {
        showToast(result.toast);
        setShakeKey((k) => k + 1);
      }

      if (result.justFinished) {
        setStats((prev) => {
          const updated = recordResult(prev, result.state);
          saveStats(updated);
          return updated;
        });
        setJustFinished(true);
      }

      saveGame(result.state);
      stateRef.current = result.state;
      setState(result.state);
    },
    [showToast],
  );

  // Physical keyboard.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = normalizeKey(e.key);
      if (key) {
        e.preventDefault();
        dispatch(key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  const keyStatuses = getKeyboardStatuses(state);
  const clearJustFinished = useCallback(() => setJustFinished(false), []);

  return {
    state,
    stats,
    toast,
    justFinished,
    shakeKey,
    dispatch,
    keyStatuses,
    clearJustFinished,
  };
}
