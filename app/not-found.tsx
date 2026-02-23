import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
      style={{ paddingTop: "80px" }}
    >
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="text-lg text-white/70">
        Esta página não foi encontrada.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#00b749] rounded-[999px] border border-[#54db8a] text-white text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
