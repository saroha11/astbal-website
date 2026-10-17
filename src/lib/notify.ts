// Booking alerts for the owner, sent from the server right after a booking is saved.
// Each channel is optional and switches on when its environment variables are set:
//   Email (Resend, free tier):  RESEND_API_KEY, optional BOOKING_ALERT_EMAIL, optional RESEND_FROM
//   Telegram (free):            TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
import { format, parseISO } from "date-fns";
import { siteConfig, siteUrl } from "@/data/siteConfig";
import { formatPrice } from "@/lib/bookingEngine";

export interface BookingAlert {
  id: number;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  addons: string[];
  specialRequests: string;
  total: number;
}

const prettyDate = (d: string) => format(parseISO(d), "EEE, d MMM yyyy");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Guest phone as digits for wa.me / tel: links; a bare 10-digit Indian number gets the 91 prefix
function phoneDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

async function sendEmail(b: BookingAlert) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const rows: [string, string][] = [
    ["Name", b.name],
    ["Phone", b.phone],
    ["Email", b.email],
    ["Check-in", prettyDate(b.checkIn)],
    ["Check-out", `${prettyDate(b.checkOut)} (${b.nights} night${b.nights > 1 ? "s" : ""})`],
    ["Guests", String(b.guests)],
    ["Add-ons", b.addons.length ? b.addons.join(", ") : "None"],
    ["Requests", b.specialRequests || "None"],
    ["Total", formatPrice(b.total)],
  ];
  const digits = phoneDigits(b.phone);
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px">
      <h2 style="color:#15803d;margin:0 0 4px">New booking request #${b.id}</h2>
      <p style="color:#57534e;margin:0 0 16px">Status: pending. Confirm it with the guest, then mark it Confirmed in admin.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#78716c;vertical-align:top">${k}</td><td style="padding:6px 0;color:#1c1917"><b>${escapeHtml(v)}</b></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 8px">
        <a href="https://wa.me/${digits}" style="background:#25D366;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;margin-right:8px">WhatsApp guest</a>
        <a href="tel:+${digits}" style="background:#16a34a;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;margin-right:8px">Call guest</a>
        <a href="${siteUrl}/admin" style="color:#15803d">Open admin</a>
      </p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Until astbal.in is verified in Resend, its shared test sender is used (it can only email the Resend account's own address)
      from: process.env.RESEND_FROM || "ASTBAL Bookings <onboarding@resend.dev>",
      to: [process.env.BOOKING_ALERT_EMAIL || siteConfig.email],
      reply_to: b.email,
      subject: `New booking #${b.id}: ${b.name}, ${format(parseISO(b.checkIn), "d MMM")}–${format(parseISO(b.checkOut), "d MMM")} (${formatPrice(b.total)})`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function sendTelegram(b: BookingAlert) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    `🌿 New booking request #${b.id}`,
    `${b.name} · ${b.phone}`,
    `${prettyDate(b.checkIn)} → ${prettyDate(b.checkOut)} (${b.nights}n) · ${b.guests} guests`,
    `Add-ons: ${b.addons.length ? b.addons.join(", ") : "None"}`,
    b.specialRequests ? `Requests: ${b.specialRequests}` : "",
    `Total: ${formatPrice(b.total)}`,
    `WhatsApp: https://wa.me/${phoneDigits(b.phone)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}

// True when at least one server-side alert channel is set up
export function alertsConfigured() {
  return !!process.env.RESEND_API_KEY || (!!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_ID);
}

// Never throws: a failed alert must not affect the guest's booking
export async function notifyNewBooking(b: BookingAlert) {
  const results = await Promise.allSettled([sendEmail(b), sendTelegram(b)]);
  for (const r of results) if (r.status === "rejected") console.error("Booking alert failed:", r.reason);
}
