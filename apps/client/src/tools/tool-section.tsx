"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/utils";

/** config section for tool in /tools page */
export function ToolSection(
  props: React.PropsWithChildren<{
    headingLeft: React.ReactNode;
    headingRight: React.ReactNode;
  }>,
) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Accordion type="single" collapsible onValueChange={() => setOpen(!isOpen)}>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className={cn(
            "layer-dark px-4 text-xl font-bold rounded-lg",
            isOpen ? "rounded-b-none" : "duration-500",
          )}
        >
          <div className="flex items-center justify-between w-full">
            {props.headingLeft}

            {props.headingRight}
          </div>
        </AccordionTrigger>
        <AccordionContent className="layer-dark rounded-b-lg px-4">
          {props.children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
