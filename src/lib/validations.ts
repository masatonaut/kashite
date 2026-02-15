import { z } from "zod";
import DOMPurify from "dompurify";

// Sanitize function for server-side
export function sanitize(input: string): string {
  if (typeof window === "undefined") {
    // Server-side: basic sanitization
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .trim();
  }
  // Client-side: use DOMPurify
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}

// Custom zod refinement for sanitization
const sanitizedString = (maxLength: number) =>
  z
    .string()
    .max(maxLength)
    .transform((val) => sanitize(val));

// Loan schemas
export const createLoanSchema = z.object({
  item_name: sanitizedString(100).refine((val) => val.length > 0, {
    message: "アイテム名を入力してください",
  }),
  borrower_name: sanitizedString(50).refine((val) => val.length > 0, {
    message: "相手の名前を入力してください",
  }),
  memo: sanitizedString(500).optional().default(""),
  lent_at: z.coerce.date().default(() => new Date()),
});

export const updateLoanSchema = z.object({
  id: z.string().uuid(),
  item_name: sanitizedString(100).optional(),
  borrower_name: sanitizedString(50).optional(),
  memo: sanitizedString(500).optional(),
  lent_at: z.coerce.date().optional(),
  returned_at: z.coerce.date().nullable().optional(),
  status: z.enum(["active", "returned"]).optional(),
});

export const returnLoanSchema = z.object({
  id: z.string().uuid(),
  returned_at: z.coerce.date().default(() => new Date()),
});

export const deleteLoanSchema = z.object({
  id: z.string().uuid(),
});

// Share token validation
export const shareTokenSchema = z.object({
  token: z.string().uuid(),
});

// Type exports
export type CreateLoanInput = z.infer<typeof createLoanSchema>;
export type UpdateLoanInput = z.infer<typeof updateLoanSchema>;
export type ReturnLoanInput = z.infer<typeof returnLoanSchema>;
export type DeleteLoanInput = z.infer<typeof deleteLoanSchema>;
