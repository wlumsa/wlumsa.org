
/**
 * Renders the home page of the application.
 * 
 * @returns The JSX element representing the home page.
 */
import Popup from '@/components/UI/Popup';
import News from '@/components/UI/News';
import Hero from '@/components/UI/Hero';
import PrayerSection from '@/components/UI/PrayerSection';
import Events from '@/components/UI/WeeklyEvents';
import MemberSignup from '@/components/UI/MemberSignup';
import { fetchInstagramPosts, fetchSocialLinks, heroUrl, fetchPrayerRooms, fetchJummahInfo, fetchTodaysTimings, fetchEvents } from "../../Utils/datafetcher"

/*  Nextjs timebased revalidation function for cache, set to 1 hour
More information on nextjs caching, and best pratices can be found here: 
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
*/
export const revalidate = 3600

export default async function Home() {
  // Fetch data from database for dynamic data
  const socialLinks = await fetchSocialLinks()
  const heroImageUrl = heroUrl;
  const instagramPosts = await fetchInstagramPosts();
  const prayerRoomsData = await fetchPrayerRooms()
  const jummahInfo = await fetchJummahInfo();
  const timingsData = await fetchTodaysTimings();
  const events = await fetchEvents();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base-100 ">
      <Hero socialLinks={socialLinks} heroUrl={heroImageUrl} />
      <Popup />
      <News instagramPosts={instagramPosts} />
      <PrayerSection prayerRoomsData={prayerRoomsData} jummahInfo={jummahInfo} timingsData={timingsData} />
      <Events events={events} />
      <MemberSignup />
    </main>
  )
}
