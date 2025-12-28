"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { scrollToSection } from "@/src/utilities/scroll-handler";

export default function InteractiveButton({
  children,
  href,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    withArrow?: boolean;
    href?: string;
  }) {
  return (
    <Button {...props} onClick={() => scrollToSection(href)}>
      {children}
    </Button>
  );
}
