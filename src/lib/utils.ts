import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes conditionally.
 * Combines clsx + tailwind-merge.
 * @example cn('px-2', isActive && 'bg-red-500')
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalize the first letter of a string
 * @example capitalize('hello') => 'Hello'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format a Date object to a readable string
 * @example formatDate(new Date()) => 'Jun 17, 2025'
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Convert a string into a slug (URL-friendly)
 * @example slugify('My Task Title') => 'my-task-title'
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Generate a random alphanumeric ID
 * @example randomId() => 'g5k39z'
 */
export function randomId(length: number = 6): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
