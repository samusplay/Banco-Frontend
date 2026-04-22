import { ShieldCheck } from "lucide-react";

export default function Footer() {
    return(
         <footer className="p-8 border-t bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span>Sesión protegida por encriptación de 256 bits</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    © 2026 HBC Bank Colombia
                  </p>
                </div>
              </footer>

    )
}