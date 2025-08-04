function Tag({ tagName }: { tagName: string }) {
  return (
    <li className="border-[#3B3A3F] border rounded-3xl flex justify-center items-center  py-0.5 px-2">
      <p className="font-light text-xs">{tagName}</p>
    </li>
  );
}

export default Tag;
