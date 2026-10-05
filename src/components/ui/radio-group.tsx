"use client";

import * as React from "react";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { Circle } from "lucide-react";

import { cn } from "cn";

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RadioGroup>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroup className={cn("grid gap-2", className)} {...props} ref={ref} />
  );
});
RadioGroupRoot.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Radio.Root>,
  React.ComponentPropsWithoutRef<typeof Radio.Root>
>(({ className, ...props }, ref) => {
  return (
    <Radio.Root
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </Radio.Indicator>
    </Radio.Root>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroupRoot as RadioGroup, RadioGroupItem };
