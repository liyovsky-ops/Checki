"use client";

import { useState } from "react";

export default function TranslatorView() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!code.trim()) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("http://localhost:8000/translator/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setResult(data.response);
    } catch {
      setError("Nie można połączyć się z backendem. Upewnij się że serwer działa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Translator kodu</h1>
        <p className="text-zinc-400 text-sm">Wklej kod — dostaniesz wyjaśnienie prostym językiem.</p>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Wklej tutaj kod..."
        className="w-full h-56 bg-zinc-900 border border-zinc-700 rounded-xl p-4 font-mono text-sm text-zinc-100 placeholder-zinc-600 resize-none focus:outline-none focus:border-zinc-500 transition-colors"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        className="self-start px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
      >
        {loading ? "Tłumaczę..." : "Wytłumacz"}
      </button>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {result && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 text-sm text-zinc-200 leading-relaxed">
          {result}
        </div>
      )}
    </div>
  );
}
