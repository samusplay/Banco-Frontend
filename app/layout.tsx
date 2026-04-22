import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Footer from "./componentes-global/Footer";
import Navbar from "./componentes-global/Navbar";
import SideBar from "./componentes-global/SideBar";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "HBC Bank | Seguridad y Confianza",
  description: "Plataforma bancaria de alto rendimiento",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable} h-full`}>
      <body className="h-full bg-[#f9f9f9] text-[#1a1c1c] antialiased">
        <Providers>
          <div className="flex min-h-screen">
            
            {/* --- SIDEBAR (Web) --- */}
            <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 border-r bg-white shadow-sm z-50">
              <div className="h-20 flex items-center px-8">
                <span className="text-2xl font-black tracking-tighter text-[#af101a]">
                  HBC <span className="font-light text-zinc-400">Bank</span>
                </span>
              </div>
              
             <SideBar />

              {/* Usuario en Sidebar */}
             
            </aside>

            {/* --- ÁREA PRINCIPAL --- */}
            <div className="flex-1 lg:pl-72 flex flex-col">
              
              {/* Navbar Superior */}
              <Navbar />

              {/* Contenido de las Páginas */}
              <main className="flex-1 p-8 max-w-350 mx-auto w-full">
                {children}
              </main>

              {/* Footer de Seguridad (Limpio) */}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}