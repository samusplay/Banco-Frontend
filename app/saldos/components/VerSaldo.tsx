"use client";

import { useCuentaStore } from "@/app/lib/useCuentaStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { obtenerSaldoAction } from "../../actions/saldo.action";
import { SaldoFormInput, saldoFormSchema, SaldoResponse } from "../../schemas/saldo.schema";

export default function VerSaldoCard() {
 //zutand para llamar la variable global
  const { numeroCuenta } = useCuentaStore();

  const [saldoData, setSaldoData] = useState<SaldoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SaldoFormInput>({
    resolver: zodResolver(saldoFormSchema),
    defaultValues: {
      numeroCuenta: numeroCuenta ? String(numeroCuenta) : "",
    },
  });

  // Tipado correcto para onSubmit
  const onSubmit: SubmitHandler<SaldoFormInput> = async (data) => {
    setSaldoData(null);
    setError(null);

    // Convertimos el string a number justo antes de mandarlo al Action
    const res = await obtenerSaldoAction(Number(data.numeroCuenta));

    if (res.ok && res.data) {
      setSaldoData(res.data);
    } else {
      setError(res.error ?? "Error desconocido al obtener el saldo");
    }
  };

  // Función para formatear el número como dinero (ej: $ 64.000)
  const formatearDinero = (monto: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(monto);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Encabezado de la Card */}
      <div className="bg-slate-50 border-b border-gray-100 px-6 py-4">
        <h2 className="text-xl font-bold text-slate-800">Consultar Saldo</h2>
        <p className="text-sm text-slate-500 mt-1">
          Ingresa el número de cuenta para verificar los fondos disponibles.
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Input de Número de Cuenta */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Número de Cuenta
            </label>
            <input
              type="number"
              readOnly={!!numeroCuenta}
              placeholder="Ej: 10243670"
              {...register("numeroCuenta")}
              className={`border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.numeroCuenta
                  ? "border-red-300 focus:ring-red-400 bg-red-50"
                  : "border-slate-200 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 hover:bg-white"
              }`}
            />
            {errors.numeroCuenta && (
              <span className="text-xs font-medium text-red-500 mt-1">
                {errors.numeroCuenta.message}
              </span>
            )}
          </div>

          {/* Botón de Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl py-3 font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Consultando...
              </>
            ) : (
              "Ver saldo actual"
            )}
          </button>
        </form>

        {/* Mensaje de Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        {/* Tarjeta de Resultado Exitoso (Solo se muestra si hay datos) */}
        {saldoData && !error && (
          <div className="mt-6 p-5 bg-linear-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-xl shadow-inner text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm font-medium text-emerald-700 mb-1">
              Saldo Disponible
            </p>
            <h3 className="text-3xl font-extrabold text-emerald-900 tracking-tight">
              {formatearDinero(saldoData.saldo)}
            </h3>
            <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 shadow-sm border border-emerald-100">
              Cuenta: {saldoData.numero_cuenta}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}