import { siteConfig } from "@/data/siteConfig";

// A picture of where the farm is: the map can't be clicked, dragged or zoomed.
export default function LocationMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      <iframe
        src={siteConfig.mapEmbedUrl}
        title="Map showing where ASTBAL Farm & Retreat is"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
      />
      {/* Covers the map so clicks and touches never reach it */}
      <div className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
