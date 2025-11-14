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
    <aside className="fixed top-0 left-0 z-50 flex h-screen w-20 flex-col items-center border-r border-slate-700 bg-(--secondary-color) py-6">
      <div className="mb-8">
        <Link href="/">
          <Image src={NortusLogo} alt="Nortus" width={40} height={40} />
        </Link>
      </div>

      <nav className="mb-0 flex w-full flex-1 flex-col items-center justify-center gap-8 2xl:mb-52">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${isActive
                  ? "button-shiny bg-(--highlight-color) shadow-lg shadow-sky-500/30"
                  : "bg-transparent hover:bg-slate-700/50"
                } `}
              title={item.name}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                className={`${isActive ? "brightness-0 invert" : "opacity-70"}`}
              />

              <span className="invisible absolute left-full ml-4 rounded-lg border border-slate-700 bg-(--secondary-color) px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="relative mt-auto">
        <div
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-(--highlight-color) text-sm font-bold text-white transition-colors hover:bg-sky-600"
          title={session?.user?.name || "Usuário"}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {initials}
        </div>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowUserMenu(false)}
            />

            <div className="absolute bottom-0 left-full z-50 ml-4 min-w-[200px] rounded-lg border border-slate-700 bg-slate-800 p-3 shadow-lg">
              <div className="mb-3 border-b border-slate-700 pb-3">
                <p className="text-sm font-medium text-white">
                  {session?.user?.name || "Usuário"}
                </p>
                <p className="truncate text-xs text-(--text-secondary-color)">
                  {session?.user?.email}
                </p>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/loginPage" })}
                className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
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
