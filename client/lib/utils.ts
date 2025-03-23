import { clsx, type ClassValue } from "clsx"
import secureLocalStorage from "react-secure-storage";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSession = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return secureLocalStorage.getItem("token") as string;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export const removeSession = () => {
  if (typeof window === "undefined") return null;
  try {
    secureLocalStorage.removeItem("token");
  } catch (error) {
    console.error('Error removing session:', error);
    return null;
  }
}


