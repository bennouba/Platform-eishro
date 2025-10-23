import * as React from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange, placeholder, className }) => {
  const [value, setValue] = React.useState<string>(date ? toInputValue(date) : "");

  React.useEffect(() => {
    if (date) setValue(toInputValue(date));
  }, [date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onDateChange) {
      onDateChange(e.target.value ? new Date(e.target.value) : undefined);
    }
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        className
      )}
    />
  );
};

function toInputValue(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
