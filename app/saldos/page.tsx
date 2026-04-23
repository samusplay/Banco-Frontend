import VerSaldoCard from "./components/VerSaldo";

export default function SaldosPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      {/* Encabezado de la página */}
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Consulta de Saldos
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Verifica el estado y los fondos disponibles de tus cuentas en tiempo real.
        </p>
      </div>

      {/* Aquí renderizamos nuestra Card */}
      <VerSaldoCard />
    </div>
  );
}