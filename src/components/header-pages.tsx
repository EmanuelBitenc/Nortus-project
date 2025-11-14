import { Children } from "react";

interface HeaderPagesProps {
  TitlePage: string;
  children?: React.ReactNode;
}

export default function HeaderPages({ TitlePage, children }: HeaderPagesProps) {
  return (
    <div className="w-full text-white">
      <div className="mb-8 px-20 bg-gray-900 flex items-center justify-between">
        <h1 className="py-4  text-2xl font-bold text-white">
          {TitlePage}
        </h1>{children}
      </div>
    </div>
  );
}
