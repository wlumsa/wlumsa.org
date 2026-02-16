import React from "react";

const items = [
  { label: "Fasting Day", className: "bg-primary/10 border-primary/20" },
  { label: "Last 10 Nights", className: "bg-accent/15 border-accent/30" },
  { label: "Odd Night", className: "bg-warning/30 border-warning/50" },
  { label: "Eid", className: "bg-secondary/30 border-secondary/50" },
];

export function Legend() {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <h3 className="text-base font-heading font-bold text-primary">Legend</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.label}
            className={`rounded-full border px-3 py-1 text-xs font-body text-base-content/80 ${item.className}`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
