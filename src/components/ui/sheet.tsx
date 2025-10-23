import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const SheetContext = React.createContext<SheetContextValue | null>(null);

export const Sheet: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
};

export const SheetTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  const ctx = React.useContext(SheetContext)!;
  return (
    <button className={cn("inline-flex items-center gap-2", className)} onClick={() => ctx.setOpen(true)} {...props}>
      {children}
    </button>
  );
};

export const SheetContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  const ctx = React.useContext(SheetContext)!;
  if (!ctx.open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => ctx.setOpen(false)} />
      <div className={cn("absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-4", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
