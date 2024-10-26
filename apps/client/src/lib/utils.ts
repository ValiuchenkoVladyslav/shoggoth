import { invoke } from "@tauri-apps/api/core";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** tailwind util to merge classes */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * create a new id
 * @param prefix prefix for the id
 */
export function newId(prefix = "") {
  return (
    prefix + String(Math.random()).slice(2) + String(Math.random()).slice(2)
  );
}

/** open url in browser */
export function browse(url: string) {
  invoke("browse", { url });
}
