// app/transactions/page.tsx
import TransaccionForm from "./components/TransaccionForm";

export default function TransactionsPage() {
  return (
    <div className="flex gap-8 p-8">
      <div className="flex-1 border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Retirar</h2>
        <TransaccionForm tipo="retirar" />
      </div>

      <div className="flex-1 border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Depositar</h2>
        <TransaccionForm tipo="depositar" />
      </div>
    </div>
  );
}