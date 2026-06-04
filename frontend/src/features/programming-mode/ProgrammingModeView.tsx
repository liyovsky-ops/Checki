"use client";

import { useState } from "react";
import { useMode, ProgrammingMode } from "./ModeContext";

const MODES: {
  id: ProgrammingMode;
  label: string;
  icon: string;
  desc: string;
  theme: {
    tile: string;
    tileBorder: string;
    tileSelected: string;
    badge: string;
  };
}[] = [
  {
    id: "eco",
    label: "Eco",
    icon: "🌿",
    desc: "Najprostszy kod, zero abstrakcji",
    theme: {
      tile: "hover:border-green-700 hover:bg-green-950/30",
      tileBorder: "border-zinc-700",
      tileSelected: "border-green-500 bg-green-950/50 ring-1 ring-green-500",
      badge: "bg-green-900/60 text-green-400",
    },
  },
  {
    id: "comfort",
    label: "Comfort",
    icon: "☕",
    desc: "Typowy kod produkcyjny",
    theme: {
      tile: "hover:border-amber-700 hover:bg-amber-950/30",
      tileBorder: "border-zinc-700",
      tileSelected: "border-amber-500 bg-amber-950/50 ring-1 ring-amber-500",
      badge: "bg-amber-900/60 text-amber-400",
    },
  },
  {
    id: "sport",
    label: "Sport",
    icon: "🏎️",
    desc: "Wysoka wydajność",
    theme: {
      tile: "hover:border-red-700 hover:bg-red-950/30",
      tileBorder: "border-zinc-700",
      tileSelected: "border-red-500 bg-red-950/50 ring-1 ring-red-500",
      badge: "bg-red-900/60 text-red-400",
    },
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: "🏢",
    desc: "Skalowalność i testowalność",
    theme: {
      tile: "hover:border-yellow-700 hover:bg-yellow-950/30",
      tileBorder: "border-zinc-700",
      tileSelected: "border-yellow-500 bg-yellow-950/50 ring-1 ring-yellow-500",
      badge: "bg-yellow-900/60 text-yellow-400",
    },
  },
  {
    id: "security",
    label: "Security",
    icon: "🔒",
    desc: "Nacisk na bezpieczeństwo",
    theme: {
      tile: "hover:border-blue-700 hover:bg-blue-950/30",
      tileBorder: "border-zinc-700",
      tileSelected: "border-blue-500 bg-blue-950/50 ring-1 ring-blue-500",
      badge: "bg-blue-900/60 text-blue-400",
    },
  },
];

export default function ProgrammingModeView() {
  const { mode, setMode } = useMode();
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRewrite() {
    if (!code.trim() || !mode) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("http://localhost:8000/programming-mode/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, mode }),
      });
      const data = await res.json();
      setResult(data.rewritten_code);
    } catch {
      setError("Nie można połączyć się z backendem. Upewnij się że serwer działa.");
    } finally {
      setLoading(false);
    }
  }

  const selectedMeta = MODES.find((m) => m.id === mode);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Tryb programowania</h1>
        <p className="text-zinc-400 text-sm">
          Wybierz tryb — AI przepisze Twój kod zachowując funkcjonalność, ale z innym naciskiem.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {MODES.map((m) => {
          const isSelected = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(isSelected ? null : m.id)}
              className={`rounded-xl border p-4 text-left transition-all flex flex-col gap-2 ${
                isSelected
                  ? m.theme.tileSelected
                  : `${m.theme.tileBorder} ${m.theme.tile}`
              }`}
            >
              <span className="text-2xl">{m.icon}</span>
              <span className="font-medium text-sm">{m.label}</span>
              <span className="text-xs text-zinc-400 leading-tight">{m.desc}</span>
            </button>
          );
        })}
      </div>

      {mode && (
        <div className={`text-xs px-3 py-1.5 rounded-full self-start font-medium ${selectedMeta?.theme.badge}`}>
          Tryb aktywny: {selectedMeta?.icon} {selectedMeta?.label}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Wklej tutaj kod do przepisania..."
          className="w-full h-56 bg-zinc-900 border border-zinc-700 rounded-xl p-4 font-mono text-sm text-zinc-100 placeholder-zinc-600 resize-none focus:outline-none focus:border-zinc-500 transition-colors"
        />

        <button
          onClick={handleRewrite}
          disabled={loading || !code.trim() || !mode}
          className="self-start px-6 py-2.5 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
          style={
            mode
              ? {
                  backgroundColor: "var(--mode-accent)",
                }
              : {}
          }
        >
          {loading ? "Przepisuję..." : mode ? `Przepisz (${selectedMeta?.label})` : "Wybierz tryb"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Wynik:</span>
            {selectedMeta && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedMeta.theme.badge}`}>
                {selectedMeta.icon} {selectedMeta.label}
              </span>
            )}
          </div>
          <pre className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 text-sm text-zinc-200 leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
