import type { Footer, Social } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import logo from "../../logo.png";

interface FooterProps {
  footerGroups: Footer;
  socialData: Social[];
}

const charityLinks = [
  { id: "charity-home-footer", title: "Charity Home", url: "/charity" },
  { id: "charity-week-footer", title: "Charity Week", url: "/charityweek" },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export default function FooterComponent({
  footerGroups,
  socialData,
}: FooterProps) {
  const groups = footerGroups.items;
  const existingUrls = new Set(
    groups.flatMap(({ links }) =>
      (links ?? []).map(({ url }) => url.trim().replace(/\/$/, ""))
    )
  );
  const missingLinks = charityLinks.filter(({ url }) => !existingUrls.has(url));
  const charityGroup = groups.find(
    ({ label, links }) =>
      label?.trim().toLowerCase() === "charity" ||
      links?.some(({ url }) => /^\/charity(?:week)?\/?$/.test(url.trim()))
  );
  const footerItems = charityGroup
    ? groups.map((group) =>
        group === charityGroup
          ? { ...group, links: [...(group.links ?? []), ...missingLinks] }
          : group
      )
    : [
        ...groups,
        { id: "charity-footer", label: "Charity", links: missingLinks },
      ];

  return (
    <footer
      id="footer"
      className="border-t border-base-300 bg-base-200/50 text-base-content"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] sm:py-12"
        >
          {footerItems.map(({ id, label, links }) =>
            links?.length ? (
              <div key={id ?? label} className="min-w-0">
                <h2 className="mb-3 text-sm font-semibold break-words">
                  {label}
                </h2>
                <ul className="space-y-1">
                  {links.map(({ id, title, url }) => (
                    <li key={id ?? url}>
                      <Link
                        href={url}
                        className={`inline-block rounded-sm py-1 text-sm break-words text-base-content/75 underline-offset-4 hover:text-base-content hover:underline ${focusStyle}`}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-base-300 py-5">
          <Link
            href="/"
            prefetch={false}
            className={`inline-flex items-center gap-3 rounded-sm text-sm leading-snug font-medium underline-offset-4 hover:underline ${focusStyle}`}
          >
            <Image src={logo} alt="" className="size-9 shrink-0" />
            <span>
              Wilfrid Laurier University
              <br />
              Muslim Students’ Association
            </span>
          </Link>

          <div className="flex flex-wrap gap-1">
            {socialData.map(({ id, title, link, icon }) =>
              typeof link === "object" && link?.url ? (
                <a
                  key={id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className={`grid size-11 place-items-center rounded-md text-base-content/75 hover:bg-base-300 hover:text-base-content ${focusStyle}`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 50 50"
                    className="size-6 fill-current"
                  >
                    <path d={icon} />
                  </svg>
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
