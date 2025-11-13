"use client";
import "./style.css";
import Image from "next/image";
import NortusTextLogo from "../../../public/imgs/NortusTextLogo.svg";
import { Eye, EyeOff } from "@deemlol/next-icons";
import { useState } from "react";
import AsideImg from "./components/aside-img";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="min-h-screen bg-[#071225] text-slate-200 flex items-center justify-center px-6 py-7 2xl:py-10">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-10 items-start">
        <section className="flex-1 pl-6 lg:pl-12">
          <div className="mb-10">
            <Image
              src={NortusTextLogo}
              alt="Nortus"
              width={180}
              height={48}
              priority
            />
          </div>

          <div className="max-w-[680px]">
            <h1 className="text-4xl text-sky-300 mb-3 font-display">Login</h1>
            <p className="text-slate-400 mb-8">
              Entre com suas credenciais para acessar a sua conta.
            </p>

            <form className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  placeholder="Usuário*"
                  className="w-full rounded-2xl border-2 border-gray-500 bg-transparent px-5 py-4 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <span className="pl-5 text-sm text-gray-300">
                  Insira o seu e-mail, CPF ou passaporte.
                </span>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha*"
                    className="w-full rounded-2xl border-2 border-gray-500 bg-transparent px-5 py-4 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 pr-12"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff size={24} color="var(--white)" />
                    ) : (
                      <Eye size={24} color="var(--white)" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-500 bg-transparent"
                  />
                  <span className="text-slate-300">Lembrar meu usuário</span>
                </label>
                <a href="#" className="text-sky-400 hover:underline ">
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-sky-500 hover:bg-sky-600 py-3 text-white font-medium"
              >
                Entrar
              </button>
            </form>
          </div>
        </section>

        <aside className="  hidden lg:block lg:w-[620px] shrink-0 relative">
          <AsideImg />
        </aside>
      </div>
    </main>
  );
}
