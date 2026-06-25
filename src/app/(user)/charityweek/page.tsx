import React from "react";
import BlurFade from "@/components/UI/BlurFade";
import { EventCard } from "@/components/UI/WeeklyEvents";
import Image from "next/image";
const page = () => {
  const items = [
    {
      name: "Charity Week Boothing",
      image:
        "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bakesale.png",
      // timeLocation: "Monday, Tuesday and Friday In the Concourse",
      caption:
        "We'll be having a bake sale, and selling bubble tea during charity week to raise funds for our cause. Come by the concourse on Monday, Tuesday, and Friday to grab some delicious treats and support a great cause!",
      // link: "/forms/iftars",
      ctaText: "",
    },
    {
      name: "Charity Week Social Events",
      image:
        "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/auctionnight.png",
      timeLocation: "",
      caption:
        "We have Charity week social events aimed at bringing the community together, such as Family Feud, Scavenger Hunt, and Chai and Chill! Join us for fun activities, games, and socializing with fellow students. Stay tuned for more information on Auction night!",
      link: "",
      // ctaText: "View Schedule",
    },
    //   {
    //     name: "Charity Week Merch",
    //     image:
    //       "",
    //     timeLocation: "",
    //     caption:
    //       "Pre-order your Charity Week 2025 hoodie now! Show your support and help us reach our fundraising goal with exclusive apparel. Limited stock available, you don't miss out.",
    //     link: "wlumsa.org/resources",
    //     ctaText: "Preorder Now",
    //   },
  ];

  const causes = [
    {
      name: "Gaza, Palestine",
      image:
        "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/palestine.png",
      alt: "Palestine relief work",
      points: [
        "Improve maternal and newborn health by expanding safe childbirth services, including natural and caesarean deliveries, monthly medical follow-ups, and well-equipped health facilities.",
        "Support a life-saving program that will safely transport children to specialized care (in the UK), provide them healing, and return them home healthy.",
        "Help children restore their hearing by providing cochlear implants to children in Gaza as well as refugees residing in Jordan.",
      ],
    },
    {
      name: "Sudan",
      image:
        "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/Screenshot%202025-10-14%20at%2010.34.53%20PM.png",
      alt: "Sudan relief work",
      points: [
        "Lifesaving humanitarian assistance will be provided through food packs and shelter.",
        "Critical health care services will work to be restored by rebuilding hospital infrastructure in the maternity, surgical, and orthopaedic units.",
        "Classrooms will be rehabilitated by providing them with seating, educational materials and teacher kits.",
        "Water sources will be also rehabilitated by working on latrines, and installation of water supply system.",
      ],
    },
    {
      name: "Bangladesh",
      image:
        "https://mrucujpvbprmpznsgmfr.supabase.co/storage/v1/object/public/msa_public/Photos/bangladesh.png",
      alt: "Bangladesh relief work",
      points: [
        "Improving the living conditions by supporting construction of shelters, providing materials for repairs, and installing solar-powered street lights for displaced Rohingya families.",
        "Withdraw Rohingya children engaged in hazardous child labour and enrol them into formal schools.",
        "Monthly stipends will be given to girls for education in order to cover their tuition and school supplies.",
        "Strengthen ICT lab facilities and establish emergency medical care and vision-checking corners in selected secondary schools.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <section className="mx-auto max-w-5xl px-4 pb-8 pt-24 text-center sm:px-6 lg:px-8 lg:pb-10 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary sm:text-sm">
            Laurier MSA x Islamic Relief Canada
          </p>
          <BlurFade>
            <h1 className="font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
              Charity Week 2025
            </h1>
          </BlurFade>

          <BlurFade delay={0.5}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-base-content/80 sm:text-base">
              A global week of unity, compassion, and action.
            </p>
          </BlurFade>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:items-start lg:px-8 lg:py-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary sm:text-sm">
              Campaign
            </p>
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              What is Charity Week?
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-base-content/80 sm:text-base">
            Charity Week is an annual, international student-led campaign. Each
            year, thousands of students unite to raise funds for projects that
            give hope, dignity, and opportunity to children worldwide. This
            year, we&apos;re partnering with Islamic Relief Canada. Our goal is
            to raise $25,000 to provide essential aid and support to those in
            need around the world.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
            Impact Areas
          </p>
          <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
            What we&apos;re uniting for
          </h2>
        </div>

        <div className="mt-6 space-y-4 lg:space-y-6">
          {causes.map((cause, index) => (
            <React.Fragment key={cause.name}>
              <article className="rounded-2xl border border-base-300 bg-base-100 p-3 md:p-4 lg:hidden">
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-base-300">
                    <Image
                      src={cause.image}
                      alt={cause.alt}
                      fill
                      sizes="100vw"
                      className="rounded-lg object-cover"
                      priority={index < 2}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary md:text-2xl">
                      {cause.name}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-base-content/75 md:text-base">
                      {cause.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <div className="hero hidden h-fit bg-base-100 px-4 lg:block">
                <div
                  className={`hero-content flex-col items-start justify-start ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } lg:gap-10`}
                >
                  <div className="relative h-64 w-full flex-grow lg:w-[420px]">
                    <Image
                      src={cause.image}
                      alt={cause.alt}
                      fill
                      sizes="500px"
                      className="rounded-lg border border-base-300 object-cover"
                      priority={index < 2}
                    />
                  </div>
                  <div className="max-w-md flex-grow lg:max-w-[480px]">
                    <h3 className="font-heading pt-2 text-2xl font-bold text-primary lg:pt-1">
                      {cause.name}
                    </h3>
                    <ul className="font-body mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-base-content/75">
                      {cause.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
              Fundraising
            </p>
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              How we&apos;re fundraising
            </h2>
          </div>
          <div id="events" className="mt-6">
            {items.map((event, index) => (
              <EventCard
                key={index}
                name={event.name}
                image={event.image}
                caption={event.caption}
                timeLocation={event.timeLocation || ""}
                index={index}
                ctaText={event.ctaText}
                link={event.link}
                compact
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
