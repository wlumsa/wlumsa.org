import React from "react";
import type { CalculationMode, Madhab } from "@/lib/ramadan2026";

type TimeSource = "waterloo-masjid" | "api";

type MethodToggleProps = {
  timeSource: TimeSource;
  isWaterlooAvailable: boolean;
  sourceDescription?: string;
  showMadhabToggle: boolean;
  mode: CalculationMode;
  madhab: Madhab;
  onTimeSourceChange: (source: TimeSource) => void;
  onModeChange: (mode: CalculationMode) => void;
  onMadhabChange: (madhab: Madhab) => void;
};

function ToggleButton({
  label,
  isActive,
  onClick,
  disabled = false,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-3 py-1.5 text-xs font-body font-medium transition sm:text-sm ${
        isActive
          ? "bg-primary text-primary-content"
          : "bg-base-200 text-base-content hover:bg-base-300"
      }`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}

export function MethodToggle({
  timeSource,
  isWaterlooAvailable,
  sourceDescription,
  showMadhabToggle,
  mode,
  madhab,
  onTimeSourceChange,
  onModeChange,
  onMadhabChange,
}: MethodToggleProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-3 md:p-4">
      <h2 className="text-base font-heading font-bold text-primary md:text-lg">Time Source + Method</h2>

      <div className="mt-2">
        <p className="mb-1.5 text-xs font-body uppercase tracking-wide text-base-content/60">Time Source</p>
        <div className="flex flex-wrap gap-2">
          <ToggleButton
            label="Waterloo Masjid (Recommended)"
            isActive={timeSource === "waterloo-masjid"}
            onClick={() => onTimeSourceChange("waterloo-masjid")}
            disabled={!isWaterlooAvailable}
          />
          <ToggleButton
            label="Calculated API"
            isActive={timeSource === "api"}
            onClick={() => onTimeSourceChange("api")}
          />
        </div>
        {sourceDescription ? (
          <p className="mt-1.5 text-xs font-body text-base-content/65">{sourceDescription}</p>
        ) : null}
        {!isWaterlooAvailable ? (
          <p className="mt-1.5 text-xs font-body text-base-content/65">
            Waterloo Masjid source is available only for Waterloo region.
          </p>
        ) : null}
      </div>

      <div className="mt-2.5">
        <p className="mb-1.5 text-xs font-body uppercase tracking-wide text-base-content/60">Method</p>
        <div className="flex flex-wrap gap-2">
          <ToggleButton
            label="Astronomical"
            isActive={mode === "astronomical"}
            onClick={() => onModeChange("astronomical")}
          />
          <ToggleButton
            label="Moon Sighting"
            isActive={mode === "moon-sighting"}
            onClick={() => onModeChange("moon-sighting")}
          />
        </div>
      </div>

      {showMadhabToggle ? (
        <div className="mt-2.5">
          <p className="mb-1.5 text-xs font-body uppercase tracking-wide text-base-content/60">Asr Madhab</p>
          <div className="flex flex-wrap gap-2">
            <ToggleButton label="Shafi'i" isActive={madhab === "shafi"} onClick={() => onMadhabChange("shafi")} />
            <ToggleButton label="Hanafi" isActive={madhab === "hanafi"} onClick={() => onMadhabChange("hanafi")} />
          </div>
        </div>
      ) : (
        <p className="mt-2.5 text-xs font-body text-base-content/65">
          Asr follows the selected local timetable source.
        </p>
      )}
    </section>
  );
}
