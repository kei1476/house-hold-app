import { z } from "zod";

export const TransactionFormSchema = z.object({
  id: z.number().optional(),
  type: z.enum(['expense', 'income']),
  date: z.string()
    .min(1, {
      message: "日付は必須です。"
    }),
  amount: z.number()
    .min(1, {
      message: "金額は必須です。"
    }),
  content: z.string()
    .max(50, { 
      message: '50文字以内で記入してください' 
    })
    .optional(),
  category_id: z.number()
    .min(1, {
      message: "カテゴリは必須です。"
    }),
})

export type TransactionFormSchemaType = z.infer<typeof TransactionFormSchema>