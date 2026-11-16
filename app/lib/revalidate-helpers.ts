import { revalidatePath } from "next/cache";

/**
 * Safely triggers on-demand ISR revalidation for public routes after admin mutations.
 * No-ops gracefully when executed inside standalone Vitest unit tests.
 */
export function safeRevalidatePaths(paths: string[]): void {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // Safe no-op outside Next.js server request lifecycle (e.g., Vitest)
    }
  }
}
