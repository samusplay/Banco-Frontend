"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../lib/apiclient";

type TransaccionResponse = {
  message: string;
  nuevo_saldo: number;
};

export async function retirarAction(numeroCuenta: number, monto: number) {
  // El form ya validó con Zod — aquí solo chequeamos que llegue bien
  if (!numeroCuenta || monto <= 0) {
    return { ok: false, error: "Datos inválidos" };
  }

  try {
    const response = await apiClient<TransaccionResponse>(
      `/cuentas/${numeroCuenta}/transaccion`,
      {
        method: "POST",
        body: { tipo_operacion: "retirar", monto },
      }
    );

    revalidatePath("/account");
    revalidatePath("/saldos");

    return {
      ok: true,
      message: response.message,
      nuevo_saldo: response.nuevo_saldo,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function depositarAction(numeroCuenta: number, monto: number) {
  if (!numeroCuenta || monto <= 0) {
    return { ok: false, error: "Datos inválidos" };
  }

  try {
    const response = await apiClient<TransaccionResponse>(
      `/cuentas/${numeroCuenta}/transaccion`,
      {
        method: "POST",
        body: { tipo_operacion: "depositar", monto },
      }
    );

    revalidatePath("/account");
    revalidatePath("/saldos");

    return {
      ok: true,
      message: response.message,
      nuevo_saldo: response.nuevo_saldo,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}