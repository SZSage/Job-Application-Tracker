import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        animated: "group relative bg-background text-foreground hover:text-sky-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
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
  asChild?: boolean,
  text?: string,
  icon?: React.ReactNode,
  onClick?: () => void
}

// Separate stylesheet for the animation
const BorderAnimationStyles = () => {
  return (
    <style>{`
      .animated-border {
        position: relative;
      }
      
      .animated-border::before,
      .animated-border::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 2px solid transparent;
        border-radius: 4px;
      }
      
      .animated-border::before {
        top: 0;
        left: 0;
      }
      
      .animated-border::after {
        bottom: 0;
        right: 0;
      }
      
      .animated-border:hover::before {
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        border-top-color: #0284c7;
        border-right-color: #0284c7;
        transition: width 0.25s linear, height 0.25s linear 0.25s;
      }
      
      .animated-border:hover::after {
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        border-bottom-color: #0284c7;
        border-left-color: #0284c7;
        transition: width 0.25s linear, height 0.25s linear 0.25s;
      }
    `}</style>
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, text, icon, children,...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const buttonClasses = cn(
      buttonVariants({ variant, size, className }),
      variant === "animated" ? "animated-border" : ""
    );
    
    return (
      <>
        {variant === "animated" && <BorderAnimationStyles />}
        <Comp
          className={buttonClasses}
          ref={ref}
          {...props}
        >
          {icon && <span className="button-icon">{icon}</span>}
          {text || children}
        </Comp>
      </>
    );
  }
);

Button.displayName = "Button"
export { Button, buttonVariants }
