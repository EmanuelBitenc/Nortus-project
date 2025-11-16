"use client";
import "./style.css";
import Image from "next/image";
import NortusTextLogo from "../../../public/imgs/NortusTextLogo.svg";
import { Eye, EyeOff } from "@deemlol/next-icons";
import { useState, useEffect } from "react";
import AsideImg from "./components/aside-img";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../utils/schemaLogin";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });


  useEffect(() => {
    const emailSalvo = localStorage.getItem("lembrarEmail");
    if (emailSalvo) {
      setValue("email", emailSalvo);
      setLembrarUsuario(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError("");
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setGeneralError("Credenciais inválidas");
      } else if (result?.ok) {

        if (lembrarUsuario) {
          localStorage.setItem("lembrarEmail", data.email);
        } else {
          localStorage.removeItem("lembrarEmail");
        }
        router.push("/");
      }
    } catch {
      setGeneralError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071225] px-6 py-7 text-slate-200 2xl:py-10">
      <div className="flex w-full max-w-[1200px] items-start gap-10 ">
        <section className="flex-1  mx-auto lg:mx-0 max-w-[680px] ">
          <div className="mb-10">
            <Image
              src={NortusTextLogo}
              alt="Nortus"
              width={180}
              height={48}
              priority
            />
          </div>

          <div className="">
            <h1 className="font-display mb-3 text-4xl text-sky-300">Login</h1>
            <p className="mb-8 text-(--text-secondary-color)">
              Entre com suas credenciais para acessar a sua conta.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {generalError && (
                <div className="rounded-lg border border-(--danger-color)/50 bg-red-500/10 px-4 py-3 text-(--danger-color)">
                  {generalError}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <input
                  type="email"
                  placeholder="Usuário*"
                  {...register("email")}
                  className={`w-full rounded-2xl border-2 ${errors.email ? "border-(--danger-color)" : "border-gray-500"
                    } bg-transparent px-5 py-4 placeholder-gray-200 focus:ring-2 focus:outline-none ${errors.email ? "focus:ring-red-500" : "focus:ring-sky-500"
                    }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="pl-5 text-sm text-(--danger-color)">
                    {errors.email.message}
                  </span>
                )}
                {!errors.email && (
                  <span className="pl-5 text-sm text-gray-300">
                    Insira o seu e-mail, CPF ou passaporte.
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha*"
                    {...register("password")}
                    className={`w-full rounded-2xl border-2 ${errors.password ? "border-(--danger-color)" : "border-gray-500"
                      } bg-transparent px-5 py-4 placeholder-gray-200 focus:ring-2 focus:outline-none ${errors.password
                        ? "focus:ring-red-500"
                        : "focus:ring-sky-500"
                      } pr-12`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl text-slate-300 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff size={24} color="var(--white)" />
                    ) : (
                      <Eye size={24} color="var(--white)" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="pl-5 text-sm text-(--danger-color)">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={lembrarUsuario}
                    onChange={(e) => setLembrarUsuario(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="text-slate-300">Lembrar meu usuário</span>
                </label>
                <a href="#" className="text-sky-400 hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full rounded-full bg-sky-500 py-3 font-medium text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </section>

        <aside className="relative hidden shrink-0 lg:block  lg:w-[620px]">
          <AsideImg />
        </aside>
      </div>
    </main>
  );
}
