"use client";
import "./style.css";
import Image from "next/image";
import NortusTextLogo from "../../../public/imgs/NortusTextLogo.svg";
import { Eye, EyeOff } from "@deemlol/next-icons";
import { useState, FormEvent } from "react";
import AsideImg from "./components/aside-img";
import { loginSchema, type LoginFormData } from "@/utils/validation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));

    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));

    // Clear error when user starts typing
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleEmailBlur = () => {
    if (!formData.email) return;

    try {
      loginSchema.shape.email.parse(formData.email);
      setErrors((prev) => ({ ...prev, email: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, email: error.issues[0].message }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validate with Zod
    try {
      loginSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0] as "email" | "password";
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: "Credenciais inválidas" });
      } else if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Erro ao fazer login. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };
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

            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-3 text-red-400">
                  {errors.general}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <input
                  type="email"
                  placeholder="Usuário*"
                  value={formData.email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={`w-full rounded-2xl border-2 ${
                    errors.email ? "border-red-500" : "border-gray-500"
                  } bg-transparent px-5 py-4 placeholder-gray-200 focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-sky-500"
                  }`}
                  disabled={isLoading}
                />
                {errors.email ? (
                  <span className="pl-5 text-sm text-red-400">
                    {errors.email}
                  </span>
                ) : (
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
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className={`w-full rounded-2xl border-2 ${
                      errors.password ? "border-red-500" : "border-gray-500"
                    } bg-transparent px-5 py-4 placeholder-gray-200 focus:outline-none focus:ring-2 ${
                      errors.password
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-300 cursor-pointer disabled:opacity-50"
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
                  <span className="pl-5 text-sm text-red-400">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-500 bg-transparent"
                    disabled={isLoading}
                  />
                  <span className="text-slate-300">Lembrar meu usuário</span>
                </label>
                <a href="#" className="text-sky-400 hover:underline ">
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full rounded-full bg-sky-500 hover:bg-sky-600 py-3 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Entrando..." : "Entrar"}
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
