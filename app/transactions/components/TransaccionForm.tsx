
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { depositarAction, retirarAction } from "../../actions/transaccion.action";
import { useCuentaStore } from "../../lib/useCuentaStore";
import { TransactionFormInput, transactionFormSchema } from "../../schemas/transaction.schema";

type Props = {
  tipo: "retirar" | "depositar";
};

export default function TransaccionForm({ tipo }: Props) {
  const { numeroCuenta } = useCuentaStore();
  const [resultado, setResultado] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<TransactionFormInput>({   
  resolver: zodResolver(transactionFormSchema),
  defaultValues: { tipo_operacion: tipo, monto: "" },
});

  const onSubmit: SubmitHandler<TransactionFormInput> = async (data) => {
  if (!numeroCuenta) {
    setError("No hay cuenta seleccionada");
    return;
  }

  setResultado(null);
  setError(null);

  const action = tipo === "retirar" ? retirarAction : depositarAction;
  
  // data.monto aquí es garantizado como string por Zod
  const res = await action(numeroCuenta, Number(data.monto));

  if (res.ok) {
    setResultado(`${res.message} • Nuevo saldo: $${res.nuevo_saldo}`);
    reset();
  } else {
    setError(res.error ?? "Error desconocido");
  }
};

  const esRetiro = tipo === "retirar";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Campo oculto — Zod lo valida igual */}
      <input type="hidden" {...register("tipo_operacion")} value={tipo} />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Monto</label>
        <input
          type="number"
          step="0.01"
          placeholder="Ej: 500000"
          {...register("monto")}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        {errors.monto && (
          <span className="text-xs text-red-500">{errors.monto.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !numeroCuenta}
        className={`rounded-lg py-2 text-white font-semibold transition
          ${esRetiro
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"}
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting
          ? "Procesando..."
          : esRetiro ? "Retirar" : "Depositar"}
      </button>

      {resultado && (
        <p className="text-sm text-green-600 font-medium">{resultado}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </form>
  );
}