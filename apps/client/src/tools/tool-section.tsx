"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import type { UseMutationResult } from "@tanstack/react-query";
import {
  CheckCheck,
  ChevronDown,
  CircleAlert,
  Download,
  ExternalLinkIcon,
  LoaderCircle,
} from "lucide-react";
import { ExternalLink } from "~/components/links";
import { Button } from "~/components/ui/button";

export function ToolSection(
  props: React.PropsWithChildren<{
    link: string;
    title: string;
    downloadMut: UseMutationResult<unknown, Error, void>;
    installed: boolean;
  }>,
) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-lg overflow-hidden">
        <AccordionTrigger className="layer-dark w-full flex gap-3 items-center p-4 transition-all [&[data-state=open]>svg]:rotate-180">
          <ChevronDown
            strokeWidth="3px"
            className="w-6 transition-transform duration-200"
          />

          <div className="flex items-center justify-between w-full">
            <section className="flex gap-2 items-center text-xl font-bold">
              {props.title}

              <ExternalLink
                href={props.link}
                className="opacity-75 hover:opacity-100"
              >
                <ExternalLinkIcon />
              </ExternalLink>
            </section>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                props.downloadMut.mutate();
              }}
              disabled={props.installed}
            >
              {props.downloadMut?.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : props.installed ? (
                <CheckCheck />
              ) : (
                <Download />
              )}
              {props.installed ? "Installed" : "Install"}
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent className="rounded-b-lg layer-dark transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="px-4 pb-4">{props.children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function PythonWarning() {
  return (
    <div className="flex items-center text-yellow-600 gap-2">
      <CircleAlert />
      <p className="text-base font-semibold">
        It's a python tool so you need python installed in order to use it!
      </p>
    </div>
  );
}
