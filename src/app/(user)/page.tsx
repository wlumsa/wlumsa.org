/**
 * Renders the home page of the application.
 * 
 * @returns The JSX element representing the home page.
 */
import Popup from '@/components/UI/Popup';
import News from '@/components/UI/News';
import Hero from '@/components/UI/Hero';
import PrayerSection from '@/components/UI/PrayerSection';
import MemberSignup from '@/components/UI/MemberSignup';

// Data fetching functions
import { fetchInstagramPosts, fetchWeeklyEventsData, getJummahTimings, getPrayerRooms, getPrayerTimings, getMedia, fetchSocialData } from '@/Utils/datafetcher';
import { WeeklyEvents } from '@/components/UI/WeeklyEvents';
/*  
 * Next.js time-based revalidation function for caching (set to 1 hour)
 * Best practices:
 * - Use caching for static content to optimize performance
 * - Dynamic content should be revalidated periodically
 * More information can be found here: 
 * https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
*/

export default async function Home() {
  // Fetch data from database for dynamic data using destructuring to improve clarity
  const [
    events,
    instagramPosts,
    prayerRoomsData,
    jummahInfo,
    timingsData,
    mediaDocs,
    socialLinks
  ] = await Promise.all([
    fetchWeeklyEventsData(),
    fetchInstagramPosts(),
    getPrayerRooms(),
    getJummahTimings(),
    getPrayerTimings(),
    getMedia("hero"),
    fetchSocialData()
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100">
      {/* Hero Section */}
      <Hero mediaDocs={mediaDocs} socialLinks={socialLinks} />
      
      {/* Prayer Section */}
      <PrayerSection prayerRoomsData={prayerRoomsData} jummahInfo={jummahInfo} timingsData={timingsData} /> 
      
      {/* News and Events */}
      <News instagramPosts={instagramPosts} />
      <WeeklyEvents events={events} />
      
      {/* Signup */}
      <MemberSignup />
      
      {/* Popup (Commented out) */}
      {/* <Popup /> */}
    </div>
  );
}
