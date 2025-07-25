function Tag({ tagName }: { tagName: string }) {
  return (
    <li className="border-[#3B3A3F] border rounded-3xl flex justify-center items-center w-full max-w-[100px] h-[22px]">
      <p className="font-medium text-[12px] px-2">{tagName}</p>
    </li>
  );
}

export default Tag;
