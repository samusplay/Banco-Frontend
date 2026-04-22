'use client'

import { crearCuentaAction } from "@/app/actions/cuenta.action";
import { CreateCuentaInput, createCuentaSchema } from "@/app/schemas/cuenta.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, CheckCircle2, Hash, Loader2, Plus, User, Wallet } from "lucide-react";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// Tipo de la data que regresa el backend (basado en tu API de Laravel)
type CuentaCreadaData = {
  id: number;
  numero_cuenta: number;
  nombre_cliente: string;
  saldo: number;
  tipo_cuenta: string;
  created_at: string;
};

export default function CrearCuentaForm() {
  const [isPending, startTransition] = useTransition();
  const [cuentaCreada, setCuentaCreada] = useState<CuentaCreadaData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCuentaInput>({
    resolver: zodResolver(createCuentaSchema),
    defaultValues: {
      nombre_cliente: "",
      // Usamos strings vacíos para que el usuario deba escribir el número
      // Zod.coerce se encargará de volverlos números
      numero_cuenta: undefined, 
      saldo: 0,
      tipo_cuenta: "ahorros",
    },
  });

  const onSubmit: SubmitHandler<CreateCuentaInput> = (data) => {
    startTransition(async () => {
      const result = await crearCuentaAction(data);
      
      if (result.ok && result.data) {
        toast.success("¡Cuenta aperturada con éxito!");
        // Casteamos la data para asegurar que TypeScript no moleste
        setCuentaCreada(result.data as CuentaCreadaData); 
        reset();
      } else {
        toast.error(result.error || "Error al conectar con el banco");
      }
    });
  };

  // --- VISTA DE ÉXITO (CONFIRMACIÓN) ---
  if (cuentaCreada) {
    return (
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl shadow-red-100/50 p-10 max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-green-50 p-4 rounded-full mb-4">
            <CheckCircle2 className="text-green-600" size={48} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-zinc-900">¡Apertura Exitosa!</h2>
          <p className="text-zinc-500 font-medium mt-1">El producto ha sido activado y está listo para operar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Titular</p>
            <p className="font-black text-zinc-900 text-lg">{cuentaCreada.nombre_cliente}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Número de Cuenta</p>
            <p className="font-black text-[#af101a] text-lg tracking-widest">{cuentaCreada.numero_cuenta}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Saldo Inicial</p>
            <p className="font-black text-zinc-900 text-xl">
              {new Intl.NumberFormat("es-CO", { 
                style: "currency", 
                currency: "COP",
                maximumFractionDigits: 0 
              }).format(cuentaCreada.saldo)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Tipo de Producto</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <p className="font-black text-zinc-900 text-lg capitalize">{cuentaCreada.tipo_cuenta}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
            <button
              onClick={() => setCuentaCreada(null)}
              className="w-full bg-[#af101a] text-white py-5 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-red-800 transition-all shadow-xl shadow-red-200"
            >
              <Plus size={20} strokeWidth={3} />
              Aperturar otra cuenta
            </button>
            <button className="w-full text-zinc-400 py-2 text-xs font-bold uppercase tracking-widest hover:text-zinc-600 transition-colors">
                Descargar comprobante (PDF)
            </button>
        </div>
      </div>
    );
  }

  // --- VISTA DEL FORMULARIO ---
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white p-10 rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/50 space-y-10 max-w-2xl mx-auto"
    >
      <div className="border-b border-zinc-100 pb-8">
        <h2 className="text-4xl font-black text-zinc-900 tracking-tighter">Nueva Cuenta</h2>
        <p className="text-zinc-500 font-medium mt-2">Diligencie la información básica para el registro de cliente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {/* Titular */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em]">
            <User size={14} className="text-[#af101a]" /> Nombre Completo
          </label>
          <input
            {...register("nombre_cliente")}
            className={`w-full p-4 rounded-2xl border bg-zinc-50 transition-all outline-none font-bold text-zinc-700 ${
              errors.nombre_cliente ? "border-red-500 ring-4 ring-red-50" : "border-zinc-200 focus:border-[#af101a] focus:bg-white focus:ring-4 focus:ring-red-50"
            }`}
            placeholder="Nombre del cliente"
          />
          {errors.nombre_cliente && <p className="text-[10px] text-red-600 font-black uppercase italic">{errors.nombre_cliente.message}</p>}
        </div>

        {/* Número de Cuenta */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em]">
            <Hash size={14} className="text-[#af101a]" /> Número de Producto
          </label>
          <input
            type="number"
            {...register("numero_cuenta", { valueAsNumber: true })}
            className={`w-full p-4 rounded-2xl border bg-zinc-50 transition-all outline-none font-mono font-bold ${
              errors.numero_cuenta ? "border-red-500 ring-4 ring-red-50" : "border-zinc-200 focus:border-[#af101a] focus:bg-white focus:ring-4 focus:ring-red-50"
            }`}
            placeholder="Ej: 809010"
          />
          {errors.numero_cuenta && <p className="text-[10px] text-red-600 font-black uppercase italic">{errors.numero_cuenta.message}</p>}
        </div>

        {/* Saldo */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em]">
            <Banknote size={14} className="text-[#af101a]" /> Monto de Apertura
          </label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
             <input
                type="number"
                {...register("saldo", { valueAsNumber: true })}
                className={`w-full p-4 pl-8 rounded-2xl border bg-zinc-50 transition-all outline-none font-bold ${
                errors.saldo ? "border-red-500 ring-4 ring-red-50" : "border-zinc-200 focus:border-[#af101a] focus:bg-white focus:ring-4 focus:ring-red-50"
                }`}
                placeholder="0"
            />
          </div>
          {errors.saldo && <p className="text-[10px] text-red-600 font-black uppercase italic">{errors.saldo.message}</p>}
        </div>

        {/* Tipo de Cuenta */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em]">
            <Wallet size={14} className="text-[#af101a]" /> Tipo de Cuenta
          </label>
          <div className="relative">
              <select
                {...register("tipo_cuenta")}
                className="w-full p-4 rounded-2xl border border-zinc-200 bg-zinc-50 outline-none focus:border-[#af101a] focus:bg-white focus:ring-4 focus:ring-red-50 appearance-none cursor-pointer font-bold text-zinc-700"
              >
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                  <Plus size={16} className="rotate-45" />
              </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#af101a] text-white py-6 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-red-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-red-200"
      >
        {isPending ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          <>
            <CheckCircle2 size={22} strokeWidth={2.5} />
            Confirmar Apertura
          </>
        )}
      </button>
    </form>
  );
}