"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Booking } from "@/types";

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      setBookings(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function updateStatus(id: number, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings(bookings.map(b => b.id === id ? { ...b, status: status as any } : b));
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <h1 className="text-2xl font-bold mb-6">ASTBAL Admin - Bookings</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Check-in</th>
              <th className="p-3 text-left">Check-out</th>
              <th className="p-3 text-left">Guests</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.check_in}</td>
                <td className="p-3">{b.check_out}</td>
                <td className="p-3">{b.guests}</td>
                <td className="p-3">₹{b.total}</td>
                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
