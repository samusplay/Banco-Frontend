// app/actions/cuenta.actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../lib/apiclient";
import { CreateCuentaInput, createCuentaSchema } from "../schemas/cuenta.schema";

type CuentaResponse = {
  message: string;
  data: {
    id: number;
    numero_cuenta: number;
    nombre_cliente: string;
    saldo: number;
    tipo_cuenta: string;
    created_at: string;
    updated_at: string;
  };
};

export async function crearCuentaAction(data: CreateCuentaInput) {
  // 1. Validar con Zod antes de enviar
  const parsed = createCuentaSchema.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message
    };
  }

  try {
    // 2. Llamar al backend con apiClient
    const response = await apiClient<CuentaResponse>("/cuentas", {
      method: "POST",
      body: parsed.data,
    });

    // 3. Revalidar la página de account para reflejar los cambios
    revalidatePath("/account");

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}