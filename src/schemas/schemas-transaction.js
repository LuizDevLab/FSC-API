import { z } from "zod";
import validator from "validator";

export const createTransactionSchema = z.object({
  user_id: z.uuid(),
  name: z.string().trim().min(1, {
    message: "name is required",
  }),
  date: z.coerce.date(),
  type: z.enum(["EXPENSE", "EARNING", "INVESTMENT"], {
    message: "the type must be EXPENSE, EARNING or INVESTMENT"
  }),
  amount: z
    .number({
      message: 'Amount must be a number'
    })
    .min(1, {
      message: "amount must be greater than 0",
    })
    .refine((value) =>
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
      })
    ),
});
