import Link from "next/link";

const features = [
  { href: "/translator", label: "Translator", desc: "Tłumaczy kod na prosty język polski", ready: true },
  { href: "/line-tooltip", label: "Opis linii", desc: "Wyjaśnienie każdej linii z osobna", ready: false },
  { href: "/dead-code", label: "Martwy kod", desc: "Wykrywa kod który nigdy się nie wykonuje", ready: false },
  { href: "/bad-patterns", label: "Złe wzorce", desc: "Wskazuje błędy i antywzorce", ready: false },
  { href: "/text-to-code", label: "Tekst → Kod", desc: "Opisz co chcesz, dostaniesz kod", ready: false },
  { href: "/learn-mode", label: "Tryb nauki", desc: "Najprostszy możliwy zapis kodu", ready: false },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 w-full">
      <h1 className="text-3xl font-semibold mb-2">Witaj w Checki</h1>
      <p className="text-zinc-400 mb-12">Wybierz narzędzie które chcesz użyć.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.ready ? f.href : "#"}
            className={`rounded-xl border p-5 transition-colors ${
              f.ready
                ? "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 cursor-pointer"
                : "border-zinc-800 opacity-40 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{f.label}</span>
              {f.ready && (
                <span className="text-xs bg-emerald-900 text-emerald-400 px-2 py-0.5 rounded-full">gotowe</span>
              )}
            </div>
            <p className="text-sm text-zinc-400">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
