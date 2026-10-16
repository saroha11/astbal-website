"use client";

import { useState, useEffect } from "react";
import type { Booking } from "@/types";

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setBookings(json.bookings);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: number, status: Booking["status"]) {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!res.ok) {
      alert(json.error || "Update failed");
      return;
    }
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  if (loading) return <div className="p-8 pt-28">Loading...</div>;
  if (error) return <div className="p-8 pt-28 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-8 pt-24 sm:pt-28">
      <h1 className="text-2xl font-bold mb-6">ASTBAL Admin - Bookings</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[860px]">
          <thead className="bg-stone-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Check-in</th>
              <th className="p-3 text-left">Check-out</th>
              <th className="p-3 text-left">Guests</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t align-top">
                <td className="p-3">
                  {b.name}
                  {b.special_requests && (
                    <div className="text-xs text-stone-500 mt-1 max-w-xs">{b.special_requests}</div>
                  )}
                </td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.email}</td>
                <td className="p-3">{b.check_in}</td>
                <td className="p-3">{b.check_out}</td>
                <td className="p-3">{b.guests}</td>
                <td className="p-3">₹{b.total.toLocaleString("en-IN")}</td>
                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value as Booking["status"])}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={8} className="p-6 text-center text-stone-500">No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
