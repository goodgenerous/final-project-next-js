import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex gap-3 text-sky-600 font-bold text-xl ">
      <Link href="/" className="hover:font-extrabold">
        Humanation
      </Link>
    </div>
  );
}
