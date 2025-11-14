"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import NortusLogo from "../../public/imgs/NortusLogo.svg";
import DashboardIcon from "../../public/icons/dashboardIcon.svg";
import GestaoIcon from "../../public/icons/gestaoIcon.svg";
import ChatIcon from "../../public/icons/chatIcon.svg";
import VisaoIcon from "../../public/icons/visaoIcon.svg";
import SimuladorIcon from "../../public/icons/simuladorPlanosIcon.svg";

interface MenuItem {
  name: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Gestão de Tickets", href: "/gestaoTickets", icon: GestaoIcon },
  {
    name: "Chat & Assistente Virtual",
    href: "/assistenteVirtual",
    icon: ChatIcon,
  },
  { name: "Visão 360º", href: "/visao", icon: VisaoIcon },
  {
    name: "Simulador de Planos",
    href: "/simulacaoPlanos",
    icon: SimuladorIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const initials = getInitials(session?.user?.name);

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-(--secondary-color) border-r border-slate-700 flex flex-col items-center py-6 z-50">
      <div className="mb-8">
        <Link href="/">
          <Image src={NortusLogo} alt="Nortus" width={40} height={40} />
        </Link>
      </div>

      <nav className="flex-1 flex flex-col gap-8 w-full items-center justify-center mb-0 2xl:mb-52 ">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                transition-all duration-200 relative group
                ${
                  isActive
                    ? "bg-(--highlight-color) shadow-lg shadow-sky-500/30"
                    : "bg-transparent hover:bg-slate-700/50"
                }
              `}
              title={item.name}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                className={`${isActive ? "brightness-0 invert" : "opacity-70"}`}
              />

              <span className="absolute left-full ml-4 px-3 py-2 bg-(--secondary-color) text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg border border-slate-700">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto relative">
        <div
          className="w-12 h-12 rounded-full bg-(--highlight-color) flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-sky-600 transition-colors"
          title={session?.user?.name || "Usuário"}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {initials}
        </div>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <>
            {/* Overlay para fechar ao clicar fora */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowUserMenu(false)}
            />

            <div className="absolute bottom-0 left-full ml-4 bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-3 min-w-[200px] z-50">
              <div className="mb-3 pb-3 border-b border-slate-700">
                <p className="text-white font-medium text-sm">
                  {session?.user?.name || "Usuário"}
                </p>
                <p className="text-slate-400 text-xs truncate">
                  {session?.user?.email}
                </p>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/loginPage" })}
                className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors text-white text-sm"
              >
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
