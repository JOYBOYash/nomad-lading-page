import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatImageUrl(url?: string): string {
  if (!url) return '';
  // Convert Dropbox standard links to direct raw image links
  if (url.includes('dropbox.com') && !url.includes('raw=1')) {
    // Remove existing dl parameter if any
    const cleanUrl = url.replace(/([?&])dl=0/g, '');
    // Append raw=1
    return cleanUrl + (cleanUrl.includes('?') ? '&raw=1' : '?raw=1');
  }
  return url;
}
