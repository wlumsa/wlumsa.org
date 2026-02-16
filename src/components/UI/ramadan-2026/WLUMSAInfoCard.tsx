import React from "react";

type WLUMSAInfoCardProps = {
  taraweehLocation: string;
  taraweehStart: string;
  iftarHref: string;
  donationHref: string;
};

export function WLUMSAInfoCard({
  taraweehLocation,
  taraweehStart,
  iftarHref,
  donationHref,
}: WLUMSAInfoCardProps) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <h2 className="text-lg font-heading font-bold text-primary">WLUMSA Community</h2>
      <div className="mt-3 space-y-2 text-sm font-body text-base-content/85">
        <p>
          <span className="font-semibold">Taraweeh:</span> {taraweehLocation}
        </p>
        <p>
          <span className="font-semibold">Start time:</span> {taraweehStart}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a className="btn btn-outline btn-primary" href={iftarHref}>
          WLUMSA Iftar Events
        </a>
        <a className="btn btn-primary" href={donationHref} target="_blank" rel="noreferrer">
          Donation
        </a>
      </div>
    </section>
  );
}
