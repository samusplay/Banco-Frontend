

import { z } from "zod";

export const saldoFormSchema = z.object({
  numeroCuenta: z
    .string()
    .min(1, "El número de cuenta es requerido")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Debe ser un número de cuenta válido",
    }),
});

export type SaldoFormInput = z.infer<typeof saldoFormSchema>;

// Tipo para lo que responde Laravel según tu captura de Postman
export type SaldoResponse = {
  numero_cuenta: number;
  saldo: number;
};