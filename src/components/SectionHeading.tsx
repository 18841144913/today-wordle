import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  icon: Icon,
  children,
  as: Tag = "h2",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <Tag className="flex items-center gap-2.5 text-lg font-bold">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-correct/10 text-correct">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span>{children}</span>
    </Tag>
  );
}
