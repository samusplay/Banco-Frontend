"use server";

import { apiClient } from "../lib/apiclient";
import { SaldoResponse } from "../schemas/saldo.schema";

export async function obtenerSaldoAction(numeroCuenta: number) {
  // Validación básica de entrada
  if (!numeroCuenta || numeroCuenta <= 0) {
    return { 
      ok: false, 
      error: "Número de cuenta inválido" 
    };
  }

  try {
    // 1. Llamamos al endpoint GET /api/cuentas/{numero_cuenta}/saldo
    // Usamos el tipo SaldoResponse que definimos en el schema
    const response = await apiClient<SaldoResponse>(
      `/cuentas/${numeroCuenta}/saldo`,
      {
        method: "GET",
      }
    );

    // 2. Retornamos los datos limpios
    return {
      ok: true,
      data: response, // { numero_cuenta: 10243670, saldo: 64000 }
    };
    
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "No se pudo obtener el saldo",
    };
  }
}