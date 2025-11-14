
interface SelectProps {
    value: string;
    change: (value: string) => void;
    datas: string[];
    categoryNames?: Record<string, string>;
    label: string;
}


export default function Select({ value, change, datas, categoryNames = {}, label }: SelectProps) {
    return(<select
            value={value}
            onChange={(e) => change(e.target.value)}
            className="rounded-2xl border border-slate-600 bg-(--background) px-2 py-1 text-xs text-slate-300 sm:px-3 sm:text-sm"
          >
            <option value="all">{label}</option>
            {datas.map((data) => (
              <option key={data} value={data}>
                {categoryNames[data] || data}
              </option>
            ))}
          </select>)
}