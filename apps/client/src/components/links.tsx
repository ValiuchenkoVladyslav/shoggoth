"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { browse } from "~/utils";

/** navigation link which gives ability to track it's state via aria-current */
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

/** external link to open in default browser  */
export function ExternalLink(
  props: Omit<
    React.LinkHTMLAttributes<HTMLAnchorElement>,
    "target" | "rel" | "onClick"
  >,
) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      // biome-ignore lint/a11y/useValidAnchor: this is a link to external resource
      onClick={(e) => {
        e.preventDefault();
        if (props.href) browse(props.href);
      }}
      {...props}
    />
  );
}
