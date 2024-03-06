import Link from "next/link";

export default function Header() {
  return (
    <div className="h-full w-full py-4 px-10 bg-blue-800">
      <div className="max-w-screen-xl mx-auto">
        <Link
          href="/"
          className="text-white text-xl transition hover:text-[rgb(244,244,244)]"
        >
          Ilant Health Book Search
        </Link>
      </div>
    </div>
  );
}
