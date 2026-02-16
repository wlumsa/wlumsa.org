import React from "react";

type LocationOption = {
  value: string;
  label: string;
  city: string;
  country: string;
};

type LocationSelectorProps = {
  options: LocationOption[];
  selectedValue: string;
  detectedLabel?: string;
  isDetecting: boolean;
  onChange: (value: string) => void;
  onAutoDetect: () => void;
};

export function LocationSelector({
  options,
  selectedValue,
  detectedLabel,
  isDetecting,
  onChange,
  onAutoDetect,
}: LocationSelectorProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-3 md:p-4">
      <h2 className="text-base font-heading font-bold text-primary md:text-lg">Location</h2>
      <p className="mt-1 text-sm font-body text-base-content/70">
        Prayer times are fetched once daily for the selected location.
      </p>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="ramadan-location">
          Select location
        </label>
        <select
          id="ramadan-location"
          className="select select-bordered select-sm w-full font-body md:select-md"
          value={selectedValue}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-outline btn-primary btn-sm w-full sm:w-auto md:btn-md"
          onClick={onAutoDetect}
          disabled={isDetecting}
        >
          {isDetecting ? "Detecting..." : "Auto-detect"}
        </button>
      </div>

      {detectedLabel ? (
        <p className="mt-1.5 text-xs font-body text-base-content/70">Detected: {detectedLabel}</p>
      ) : null}
    </section>
  );
}

export type { LocationOption };
