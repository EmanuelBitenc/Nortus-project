export default function Th({ label }: { label: string }) {
    return (<th className="pb-3 text-left text-xs font-medium tracking-wider text-(--text-secondary-color)">
        {label}
    </th>)
}