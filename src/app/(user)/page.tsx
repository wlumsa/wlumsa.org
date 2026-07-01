/**
 * Renders the home page of the application.
 *
 * @returns The JSX element representing the home page.
 */
// import Popup from '@/components/UI/Popup';
import News from "@/components/UI/News";
import Hero from "@/components/UI/Hero";
import PrayerSection from "@/components/UI/PrayerSection";
import MemberSignup from "@/components/UI/MemberSignup";

// Data fetching functions
import {
  fetchInstagramPosts,
  fetchWeeklyEventsData,
  getJummahTimings,
  getPrayerRooms,
  getPrayerTimings,
  getMedia,
  fetchSocialData,
  getWeeklyPrayerTimetable,
} from "@/Utils/datafetcher";
import { CheckCircle } from "lucide-react";
/*
 * Revalidate every 24 hours so prayer timings (and other data) stay fresh after cron updates.
 * https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 */
export const revalidate = 86400; // 24 hours

export default async function Home() {
  // Fetch data from database for dynamic data using destructuring to improve clarity
  const [
    events,
    instagramPosts,
    prayerRoomsData,
    jummahInfo,
    timingsData,
    weeklyTimetable,
    mediaDocs,
    socialLinks,
  ] = await Promise.all([
    fetchWeeklyEventsData(),
    fetchInstagramPosts(),
    getPrayerRooms(),
    getJummahTimings(),
    getPrayerTimings(),
    getWeeklyPrayerTimetable(),
    getMedia("hero"),
    fetchSocialData(),
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100">
      {/* Hero Section */}
      <Hero mediaDocs={mediaDocs} socialLinks={socialLinks} />

      {/* Prayer Section */}
      <PrayerSection
        prayerRoomsData={prayerRoomsData}
        jummahInfo={jummahInfo}
        timingsData={timingsData}
        weeklyTimetable={weeklyTimetable}
      />
      {/* <Popup /> */}

      {/* News and Events */}
      <News instagramPosts={instagramPosts} />
      {/*<WeeklyEvents events={events} />*/}

      {/* Signup */}
      <div className="flex w-full items-center justify-center py-8 sm:py-12">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h3 className="pb-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105">
              Join Our Community!
            </h3>
            <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-base-content/80 sm:text-lg lg:text-xl">
              Stay connected with the latest MSA events, prayer times, and
              exclusive resources. Plus, get your free MSA Resource Guide!
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm text-base-content/70">
              <CheckCircle className="h-4 w-4 text-primary/60" />
              <span>Trusted by 200+ WLU students</span>
            </div>
          </div>
          <MemberSignup />
        </div>
      </div>
    </div>
  );
}
