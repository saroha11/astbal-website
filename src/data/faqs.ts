import pricing from "@/data/pricing.json";
import { siteConfig } from "@/data/siteConfig";

const { maxGuests } = pricing.accommodation;

// Shown on the homepage and sent to Google as FAQ structured data. Keep every answer true.
export const faqs: { q: string; a: string }[] = [
  {
    q: "How far is ASTBAL from Delhi?",
    a: "ASTBAL is a farm stay about an hour's drive from Delhi, in Haryana. You can see exactly where we are on the map on our Contact page, and we're happy to send directions on WhatsApp.",
  },
  {
    q: "Is the farm private?",
    a: "Yes. We host one group at a time, so the entire property (the container house, lawns, orchard and fields) is just for your group during your stay.",
  },
  {
    q: "How many guests can stay?",
    a: `Up to ${maxGuests} guests. Add your dates and number of guests when booking to see the price for your group.`,
  },
  {
    q: "What are the check-in and check-out times?",
    a: `Check-in is from ${siteConfig.checkIn.label} and check-out is by ${siteConfig.checkOut.label}.`,
  },
  {
    q: "Are pets allowed?",
    a: "Yes, pets are welcome. Our own friendly dogs live on the farm too.",
  },
  {
    q: "Can we celebrate a birthday or have a party?",
    a: "Yes, celebrations and parties are welcome. Tell us your plans when you book and we'll help you get set up.",
  },
  {
    q: "Can beginners go horse riding?",
    a: "Yes. Take a riding lesson in our training arena, which has the latest equipment and an experienced trainer, or enjoy a leisure ride where you sit on the horse and our trainer leads it through the fields.",
  },
  {
    q: "Are meals and activities included?",
    a: "Add-ons such as horse rides, a farm fresh breakfast, a farm-to-table dinner and bonfire nights are all optional. You can choose them while booking or add them at the farm.",
  },
  {
    q: "How do I book and pay? Can I cancel?",
    a: "Pick your dates and send a booking request. There's no payment at that point. We confirm on WhatsApp or email, then you pay by UPI or bank transfer. Cancellation is free up to 48 hours before check-in.",
  },
];
