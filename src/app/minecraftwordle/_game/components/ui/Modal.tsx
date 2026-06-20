import type { ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            X
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
