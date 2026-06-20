import {
  SITE_URL,
  blueskyUrl,
  buildShareText,
  canNativeShare,
  copyText,
  emailUrl,
  nativeShare,
  twitterUrl,
} from "../services/shareService";
import type { GameState } from "../types";

interface Props {
  state: GameState;
  onNotice: (msg: string) => void;
}

export function ShareBar({ state, onNotice }: Props) {
  const text = buildShareText(state);

  const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="share-bar">
      <button
        className="share-btn share-btn--primary"
        onClick={async () => onNotice((await copyText(text)) ? "Copied results!" : "Copy failed")}
      >
        Share Results
      </button>

      <div className="share-icons">
        {canNativeShare() && (
          <button className="share-btn" onClick={() => nativeShare(text)} title="Share">
            Share
          </button>
        )}
        <button className="share-btn" onClick={() => open(twitterUrl(text))} title="Twitter / X">
          X
        </button>
        <button className="share-btn" onClick={() => open(blueskyUrl(text))} title="Bluesky">
          Bsky
        </button>
        <button className="share-btn" onClick={() => open(emailUrl(text))} title="Email">
          Mail
        </button>
        <button
          className="share-btn"
          onClick={async () =>
            onNotice((await copyText(SITE_URL)) ? "Link copied!" : "Copy failed")
          }
          title="Copy link"
        >
          Link
        </button>
      </div>
    </div>
  );
}
