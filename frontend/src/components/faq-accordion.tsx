"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { CaretDown } from "@phosphor-icons/react";
import { faqItems } from "@/content/site";

export function FaqAccordion() {
  return (
    <Accordion.Root className="faq-accordion" type="single" collapsible>
      {faqItems.map((item) => (
        <Accordion.Item className="faq-item" key={item.question} value={item.question}>
          <Accordion.Header>
            <Accordion.Trigger className="faq-trigger">
              <span>{item.question}</span>
              <CaretDown className="faq-chevron" size={21} weight="bold" aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <div>{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
