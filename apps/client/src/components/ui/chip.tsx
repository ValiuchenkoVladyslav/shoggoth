import { cn } from "~/utils";

export function Chip(props: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "bg-white text-black rounded-lg py-[0.5px] px-2 font-medium",
        props.className,
      )}
    />
  );
}
