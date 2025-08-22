import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

// Updated button variants with gradient accent and glow effect
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "btn btn-primary",
        accent:
          "bg-gradient-to-r from-secondary via-secondary/80 to-primary text-white hover:from-secondary/90 hover:via-secondary/80 hover:to-primary/90 transition-all duration-300 ease-in-out",
        destructive:
          "bg-destructive text-destructive-content hover:bg-destructive/90",
        outline:
          "border border-base-300 bg-transparent text-base-content hover:bg-base-200",
        secondary:
          "bg-secondary text-secondary-content hover:bg-secondary/80",
        ghost: "hover:bg-base-200 hover:text-base-content",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
      loading: {
        true: "opacity-70 cursor-wait",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled,
      children,
      type,
      ...props
    },
    ref
  ) => {
    const Comp: React.ElementType = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading: isLoading }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        data-loading={isLoading ? "true" : undefined}
        aria-busy={isLoading || undefined}
        type={type ?? (asChild ? undefined : "button")}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// GetStartedButton with clean design and smooth animations
const GetStartedButton = React.forwardRef<HTMLButtonElement, ButtonProps & { iconSize?: number; iconStrokeWidth?: number }>(
  (
    { className, children = "Get Started", iconSize = 16, iconStrokeWidth = 2, ...props },
    ref
  ) => (
    <Button
      ref={ref}
      variant="default"
      size="default"
      className={cn(
        "btn h-12 px-6 py-3 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <span className="flex-1 text-center transition-all duration-300 group-hover:opacity-0 pr-8">{children}</span>
      <span
        className="absolute right-2 top-2 bottom-2 rounded-md z-10 flex items-center justify-center w-6 sm:w-8 transition-all duration-300 bg-secondary/20 group-hover:w-[calc(100%-1rem)] group-hover:bg-secondary/30 group-active:scale-95"
        aria-hidden="true"
      >
        <ChevronRight
          size={iconSize}
          strokeWidth={3}
          className="text-black transition-colors duration-300"
        />
      </span>
    </Button>
  )
)

GetStartedButton.displayName = "GetStartedButton"

export { Button, buttonVariants, GetStartedButton }
