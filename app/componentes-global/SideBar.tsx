'use client'

import { ArrowLeftRight, LayoutDashboard, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    name: "Cuentas",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    name: "Transacciones",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Saldos",
    href: "/saldos",
    icon: Wallet,
  },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-red-50 text-[#af101a] font-bold border-r-4 border-[#af101a]"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-[#af101a]"
            }`}
          >
            <Icon 
              size={20} 
              className={isActive ? "text-[#af101a]" : "text-zinc-400 group-hover:text-[#af101a]"} 
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}