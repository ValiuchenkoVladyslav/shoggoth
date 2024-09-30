"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink(
  props: Omit<React.ComponentProps<typeof Link>, "aria-current"> & {
    aliases?: string[];
  },
) {
  const pathname = usePathname();
  const propsPath = (
    typeof props.href === "string" ? props.href : props.href.pathname
  )?.split("?")[0];

  const isActive = [propsPath, ...(props.aliases ?? [])].includes(pathname);

  return <Link aria-current={isActive && "page"} {...props} />;
}
