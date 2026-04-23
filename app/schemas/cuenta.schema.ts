// app/schemas/cuenta.schema.ts
import { z } from "zod";

const TIPOS_CUENTA = ["ahorros", "corriente"] as const;

const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

export const createCuentaSchema = z.object({
  numero_cuenta: z.number().min(1, "Número de cuenta requerido"),
  nombre_cliente: z
  .string()
  .min(3, "Mínimo 3 caracteres")
  .regex(soloLetrasRegex,{
    message: "El nombre solo puede contener letras y espacios"
  }),
  saldo: z.number().min(0, "El saldo no puede ser negativo"),
  tipo_cuenta: z.enum(TIPOS_CUENTA),
});

export type CreateCuentaInput = z.infer<typeof createCuentaSchema>;