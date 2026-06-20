import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "primary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function PixelButton({ variant = "default", className = "", ...rest }: Props) {
  return <button className={`pixel-btn pixel-btn--${variant} ${className}`} {...rest} />;
}
