import { Bell, LogOut } from "lucide-react";

export default function Navbar(){
    return(
        <header className="h-20 bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-8 flex items-center justify-between">
                <div className="lg:hidden text-2xl font-black text-[#af101a]">HBC</div>
                
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-zinc-500">
                    Sede Virtual • <span className="text-emerald-600 font-bold">En línea</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2.5 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <button className="p-2.5 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </header>
    )
}