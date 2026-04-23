// app/lib/useCuentaStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CuentaStore = {
  numeroCuenta: number | null;
  nombreCliente: string | null;
  saldo: number | null;
  setNumeroCuenta: (numero: number) => void;
  setCuentaActiva: (data: { numeroCuenta: number; nombreCliente: string; saldo: number }) => void;
  clearCuenta: () => void;
};

export const useCuentaStore = create<CuentaStore>()(
  // ✅ persist guarda en localStorage — sobrevive navegación y F5
  persist(
    (set) => ({
      numeroCuenta: null,
      nombreCliente: null,
      saldo: null,

      setNumeroCuenta: (numero) => set({ numeroCuenta: numero }),

      // Guarda toda la info de la cuenta activa de una vez
      setCuentaActiva: ({ numeroCuenta, nombreCliente, saldo }) =>
        set({ numeroCuenta, nombreCliente, saldo }),

      clearCuenta: () =>
        set({ numeroCuenta: null, nombreCliente: null, saldo: null }),
    }),
    {
      name: "cuenta-activa", // clave en localStorage
    }
  )
);