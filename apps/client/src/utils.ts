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

/** zustand type helper for store creation */
export type InferParams<T extends { setState: unknown; getState: unknown }> = [
  T["setState"],
  T["getState"],
  T,
];

/** check if the code is running in the browser */
export const isBrowser = typeof window !== "undefined";
