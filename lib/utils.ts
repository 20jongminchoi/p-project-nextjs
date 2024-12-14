import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNow() {
  const now = new Date();
  const options = { timeZone: "Asia/Seoul", hour12: false };
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  }).format(now);

  return formattedDate;
}

export const receiverBodySchema = z.union([
  z.object({
    image_url: z.string(),
  }),
  z.object({
    refresh: z.literal(true),
  }),
]);

export type ReceiverBody = z.infer<typeof receiverBodySchema>;
