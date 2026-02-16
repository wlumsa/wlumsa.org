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
    <section className="flex h-full flex-col justify-center rounded-2xl border border-base-300 bg-base-100 p-3 md:p-4">
      <h2 className="text-center text-base font-heading font-bold text-primary md:text-lg">Location</h2>
      <p className="mt-0.5 text-center text-xs font-body text-base-content/65">
        Prayer times refresh daily for your selected location.
      </p>

      <div className="mx-auto mt-2 flex max-w-md items-center justify-center gap-2">
        <label className="sr-only" htmlFor="ramadan-location">
          Select location
        </label>
        <select
          id="ramadan-location"
          className="select select-bordered select-sm w-full min-w-0 font-body md:select-md"
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
          className="btn btn-outline btn-primary btn-sm shrink-0 whitespace-nowrap px-3 md:btn-md"
          onClick={onAutoDetect}
          disabled={isDetecting}
        >
          {isDetecting ? "Detecting..." : "Auto-detect"}
        </button>
      </div>

      {detectedLabel ? (
        <p className="mt-1.5 text-center text-xs font-body text-base-content/70">Detected: {detectedLabel}</p>
      ) : null}
    </section>
  );
}

export type { LocationOption };
