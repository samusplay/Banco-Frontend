// transaction.schema.ts
import { z } from "zod";

const TIPOS_TRANSACCION = ["depositar", "retirar"] as const;

// ✅ Schema del FORM — monto como string, sin coerce
export const transactionFormSchema = z.object({
  tipo_operacion: z.enum(TIPOS_TRANSACCION),
  monto: z
    .string()
    .min(1, "El monto es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El monto debe ser mayor a cero",
    })
    .refine((val) => Number(val) <= 10000000, {
      message: "Monto excede el límite permitido",
    }),
});

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;

// Tipo para los actions (monto ya como number)
export type TransactionInput = {
  tipo_operacion: "depositar" | "retirar";
  monto: number;
};