import { FieldValues, Path, UseFormRegister } from "react-hook-form";


interface InputModalProps<T extends FieldValues> {
    label: string;
    type: string;
    name: Path<T>;
    placeholder: string;
    register: UseFormRegister<T>;
    errorMessage?: string;
}

export default function InputModal<T extends FieldValues>({ label, type, name, placeholder, register, errorMessage }: InputModalProps<T>) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 ml-3 block text-sm font-medium text-white)"
            >
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={name}
                    {...register(name)}
                    placeholder={placeholder}
                    className={`w-full rounded-3xl border ${errorMessage ? "border-(--danger-color)" : "border-slate-600"} bg-(--background-secondary) px-6 py-6 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500`}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    {...register(name)}
                    placeholder={placeholder}
                    className={`w-full rounded-3xl border ${errorMessage ? "border-(--danger-color)" : "border-slate-600"} bg-(--background-secondary) px-6 py-6 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500`}
                />)}
            {errorMessage && (
                <p className="mt-1 text-xs text-(--danger-color)">{errorMessage}</p>
            )}
        </div>
    )
}