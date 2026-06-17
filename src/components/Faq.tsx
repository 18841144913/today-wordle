import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";

export interface FaqItem {
  question: string;
  answer: string;
}

export function Faq({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-label="Frequently asked questions" className="space-y-3">
      <SectionHeading icon={MessageCircleQuestion}>Wordle FAQ</SectionHeading>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 open:bg-muted/60"
          >
            <summary className="flex items-center justify-between gap-3 font-semibold">
              <span>{item.question}</span>
              <ChevronDown className="chevron h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
            </summary>
            <p className="mt-2 text-zinc-700">{item.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={schema} />
    </section>
  );
}
