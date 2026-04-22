// app/account/page.tsx
import CrearCuentaForm from "./components/CrearCuentaForm";

export default function AccountPage() {
  return (
    <section className="space-y-8">
      
      {/* Header de la página */}
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-zinc-900">
          Cuentas Bancarias
        </h1>
        <p className="text-zinc-500 font-medium mt-1">
          Gestiona y apertura productos financieros para tus clientes.
        </p>
      </div>

      {/* Formulario */}
      <CrearCuentaForm />

    </section>
  );
}