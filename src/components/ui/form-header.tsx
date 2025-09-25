import React from "react";
import { Info } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FormHeaderProps = {
  /**
   * The label text to display
   */
  label: string;
  /**
   * Optional tooltip content to show when hovering over the info icon
   */
  tooltip?: string;
  /**
   * Optional size variant for the info icon
   * @default "sm"
   */
  iconSize?: "sm" | "md";
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  /**
   * Whether this is required field (affects label styling)
   */
  required?: boolean;
};

/**
 * A reusable form header component that displays a label with an optional tooltip info icon.
 * Commonly used in form fields to provide additional context or help text.
 */
export function FormHeader({
  label,
  tooltip,
  iconSize = "sm",
  className = "",
  required = false,
}: FormHeaderProps) {
  const iconSizeClass = iconSize === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <div className={`flex items-center gap-2 pb-0.5 pl-2 ${className}`}>
      <FormLabel
        className={
          required
            ? "after:content-['*'] after:ml-0.5 after:text-destructive"
            : ""
        }
      >
        {label}
      </FormLabel>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Info
              className={`${iconSizeClass} text-muted-foreground cursor-help`}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
