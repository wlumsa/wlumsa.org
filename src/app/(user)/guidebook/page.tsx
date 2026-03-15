import MemberSignup from "@/components/UI/MemberSignup";
import { getMedia } from '@/Utils/datafetcher';
import Image from "next/image";

export default async function page() {
  const mediaDocs = await getMedia("GuideBook");

  return (
    <main className="mt-20 bg-base-100 pb-10 sm:mt-24">
      <section className="mx-auto mb-10 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="mb-4 text-balance text-4xl font-heading font-bold text-primary md:text-5xl">
              MSA Resource Guide
            </h1>

            <div className="mb-5 space-y-4 font-body text-base-content/80">
              <p className="text-lg font-semibold text-base-content md:text-xl">
                Starting at Laurier and not sure where to begin?
              </p>
              <ul className="grid gap-2.5 text-left text-[15px] leading-relaxed md:grid-cols-2">
                <li className="rounded-md border border-base-300 bg-gradient-to-b from-base-100 to-base-200/40 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.05)]">Prayer rooms on campus</li>
                <li className="rounded-md border border-base-300 bg-gradient-to-b from-base-100 to-base-200/40 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.05)]">Halal food options nearby</li>
                <li className="rounded-md border border-base-300 bg-gradient-to-b from-base-100 to-base-200/40 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.05)]">How to stay in the loop on events</li>
                <li className="rounded-md border border-base-300 bg-gradient-to-b from-base-100 to-base-200/40 px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.05)]">Accommodation tips for Muslim students</li>
              </ul>
            </div>

            <p className="max-w-xl font-body text-base leading-relaxed text-base-content/75 md:text-lg">
              We put everything in one simple guide so you can settle in faster.
            </p>
            <p className="mt-3 max-w-xl text-sm text-base-content/70">
              Sign up below and we&apos;ll email you the MSA Resource Guide instantly.
            </p>

          </div>

          <div className="flex-shrink-0">
            <Image
              src={mediaDocs[0]?.url || ''}
              alt={mediaDocs[0]?.alt || "MSA Resource Guide cover showing campus resources and Islamic accommodations"}
              className="rounded-lg border border-base-300"
              width={350}
              height={350}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <MemberSignup />
      </section>
    </main>
  );
}
