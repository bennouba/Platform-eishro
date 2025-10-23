import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({ open, onOpenChange, children }) => {
  const [internal, setInternal] = React.useState(false);
  const isOpen = open ?? internal;
  const setOpen = (v: boolean) => {
    onOpenChange ? onOpenChange(v) : setInternal(v);
  };
  return <PopoverContext.Provider value={{ open: isOpen, setOpen }}>{children}</PopoverContext.Provider>;
};

export const PopoverTrigger: React.FC<{ asChild?: boolean } & React.HTMLAttributes<HTMLButtonElement>> = ({ asChild, children, className, ...props }) => {
  const ctx = React.useContext(PopoverContext)!;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      onClick: (e: any) => {
        (children as any).props?.onClick?.(e);
        ctx.setOpen(!ctx.open);
      },
    });
  }
  return (
    <button className={cn(className)} onClick={() => ctx.setOpen(!ctx.open)} {...props}>
      {children}
    </button>
  );
};

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({ className, style, align = "center", side = "bottom", sideOffset = 8, children, ...props }) => {
  const ctx = React.useContext(PopoverContext)!;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && ctx.setOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [ctx]);

  if (!ctx.open) return null;

  const basePos: React.CSSProperties = {
    position: 'absolute',
    zIndex: 50,
  };

  return (
    <div className="relative inline-block">
      <div
        ref={ref}
        className={cn("rounded-md border bg-white shadow-md", className)}
        style={{ ...basePos, marginTop: side === 'bottom' ? sideOffset : 0, ...style }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
