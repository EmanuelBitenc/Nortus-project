interface HeaderPagesProps {
  TitlePage: string;
}

export default function HeaderPages({ TitlePage }: HeaderPagesProps) {
  return (
    <div className="w-full text-white">
      <div className="mb-8 bg-gray-900">
        <h1 className="py-4 pl-20 text-2xl font-bold text-white">
          {TitlePage}
        </h1>
      </div>
    </div>
  );
}
