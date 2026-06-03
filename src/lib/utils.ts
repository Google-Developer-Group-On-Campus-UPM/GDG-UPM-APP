import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGoogleDriveDirectLink(url: string): string {
  if (!url) return "";

  // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileDRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const fileDMatch = url.match(fileDRegex);
  if (fileDMatch && fileDMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileDMatch[1]}`;
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID or drive.google.com/uc?id=FILE_ID
  const idRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
  const idMatch = url.match(idRegex);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }

  return url;
}
