interface HeaderPagesProps {
  TitlePage: string;
}

export default function HeaderPages({ TitlePage }: HeaderPagesProps) {
  return (
    <div className="text-white w-full">
      <div className="mb-8 bg-gray-900">
        <h1 className="text-2xl font-bold text-white pl-20 py-4">
          {TitlePage}
        </h1>
      </div>
    </div>
  );
}
