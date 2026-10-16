"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError((await res.json().catch(() => null))?.error ?? "Login failed");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 pt-20">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-4">
        <h1 className="text-xl font-bold text-stone-900">ASTBAL Admin</h1>
        <input autoComplete="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:border-green-500 outline-none" />
        <input type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:border-green-500 outline-none" />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button disabled={busy || !password} className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-sm hover:bg-green-700 disabled:bg-stone-300">
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
