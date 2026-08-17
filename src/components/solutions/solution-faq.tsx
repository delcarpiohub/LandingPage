import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SolutionFaqItem } from "@/content/solution-content";

export function SolutionFaq({ items }: { items: SolutionFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <Accordion className="mt-10" collapsible type="single">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
