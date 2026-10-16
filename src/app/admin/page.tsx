"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import type { Booking } from "@/types";
import { computeInsights } from "@/lib/insights";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const FILTERS = ["all", "pending", "confirmed", "cancelled"] as const;
type Filter = (typeof FILTERS)[number];

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-4">
      <div className="text-xs text-stone-500 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold text-stone-900 mt-1">{value}</div>
      {sub && <div className="text-xs text-stone-400 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(async (res) => {
        if (res.status === 401) return router.replace("/admin/login");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setBookings(json.bookings);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [router]);

  const insights = useMemo(() => computeInsights(bookings), [bookings]);
  const shown = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const maxReq = Math.max(1, ...insights.monthly.map((m) => m.requests));

  async function updateStatus(id: number, status: Booking["status"]) {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json.error || "Update failed");
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (loading) return <div className="p-8 pt-28">Loading...</div>;
  if (error) return <div className="p-8 pt-28 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-8 pt-24 sm:pt-28 space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">ASTBAL Admin</h1>
        <div className="flex gap-2 text-sm">
          <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer"
            className="px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50">Website traffic ↗</a>
          <button onClick={logout} className="px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50">Log out</button>
        </div>
      </div>

      {/* Insights */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Pending requests" value={insights.pendingCount} sub={`${inr(insights.pendingValue)} waiting`} />
        <Stat label="Confirmed revenue" value={inr(insights.confirmedRevenue)} sub={`${insights.confirmedCount} bookings`} />
        <Stat label="Occupancy (next 30d)" value={`${insights.occupancy30}%`} />
        <Stat label="Confirm rate" value={insights.confirmRate === null ? "—" : `${insights.confirmRate}%`} sub={`${insights.cancelledCount} cancelled`} />
        <Stat label="Avg stay" value={`${insights.avgStay} nights`} />
        <Stat label="Avg party" value={`${insights.avgGuests} guests`} />
        <Stat label="Total requests" value={insights.total} />
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-100 p-4">
          <h2 className="font-semibold text-sm mb-3">Requests by check-in month</h2>
          <div className="flex items-end gap-2 h-36">
            {insights.monthly.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] text-stone-500 mb-1">{m.requests || ""}</span>
                <div className="w-full bg-green-500 rounded-t" style={{ height: `${(m.requests / maxReq) * 100}%`, minHeight: m.requests ? 4 : 0 }}
                  title={`${m.requests} requests · ${inr(m.revenue)} confirmed`} />
                <span className="text-[10px] text-stone-400 mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-4 space-y-4">
          <div>
            <h2 className="font-semibold text-sm mb-2">Upcoming stays</h2>
            {insights.upcoming.length === 0 ? <p className="text-xs text-stone-400">None confirmed yet.</p> :
              insights.upcoming.map((b) => (
                <p key={b.id} className="text-xs text-stone-600">{b.check_in} → {b.check_out} · {b.name}</p>
              ))}
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-2">Popular add-ons</h2>
            {insights.topAddons.length === 0 ? <p className="text-xs text-stone-400">No data yet.</p> :
              insights.topAddons.map((a) => (
                <p key={a.name} className="text-xs text-stone-600 flex justify-between"><span>{a.name}</span><span>{a.count}</span></p>
              ))}
          </div>
        </div>
      </section>

      {/* Bookings */}
      <section>
        <div className="flex gap-2 mb-3 flex-wrap">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${filter === f ? "bg-green-600 text-white" : "bg-white border border-stone-200 text-stone-600"}`}>
              {f}{f !== "all" && ` (${bookings.filter((b) => b.status === f).length})`}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-stone-100">
              <tr>
                {["Guest", "Contact", "Stay", "Guests", "Total", "Requested", "Status"].map((h) => (
                  <th key={h} className="p-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((b) => (
                <tr key={b.id} className="border-t align-top">
                  <td className="p-3">
                    {b.name}
                    {b.special_requests && <div className="text-xs text-stone-500 mt-1 max-w-xs">{b.special_requests}</div>}
                    {b.addons?.length > 0 && <div className="text-xs text-green-700 mt-1">+ {b.addons.join(", ")}</div>}
                  </td>
                  <td className="p-3 text-xs">
                    <a href={`tel:${b.phone}`} className="block text-stone-700">{b.phone}</a>
                    <a href={`mailto:${b.email}`} className="block text-stone-500">{b.email}</a>
                    <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 text-green-700 mt-1"><MessageCircle className="w-3 h-3" /> WhatsApp</a>
                  </td>
                  <td className="p-3 whitespace-nowrap">{b.check_in} → {b.check_out}</td>
                  <td className="p-3">{b.guests}</td>
                  <td className="p-3">{inr(b.total)}</td>
                  <td className="p-3 text-xs text-stone-500">{new Date(b.created_at).toLocaleString("en-IN")}</td>
                  <td className="p-3">
                    <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value as Booking["status"])}
                      className="border rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-stone-500">No bookings.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
