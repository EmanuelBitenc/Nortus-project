import { SetStateAction } from "react";

interface SelectMapProps {
    value: string;
    change: (value: SetStateAction<string>) => void;
    datas: string[];
    categoryNames?: Record<string, string>;
}


export default function SelectMap({ value, change, datas, categoryNames = {} }: SelectMapProps) {
    return(<select
            value={value}
            onChange={(e) => change(e.target.value)}
            className="rounded-2xl border border-slate-600 bg-(--background) px-2 py-1 text-xs text-slate-300 sm:px-3 sm:text-sm"
          >
            <option value="all">Todos os tipos</option>
            {datas.map((data) => (
              <option key={data} value={data}>
                {categoryNames[data] || data}
              </option>
            ))}
          </select>)
}