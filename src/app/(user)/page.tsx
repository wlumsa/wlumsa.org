/**
 * Renders the home page of the application.
 * 
 * @returns The JSX element representing the home page.
 */
// import Popup from '@/components/UI/Popup';
import News from '@/components/UI/News';
import Hero from '@/components/UI/Hero';
import PrayerSection from '@/components/UI/PrayerSection';
import MemberSignup from '@/components/UI/MemberSignup';

// Data fetching functions
import { fetchInstagramPosts, fetchWeeklyEventsData, getJummahTimings, getPrayerRooms, getPrayerTimings, getMedia, fetchSocialData } from '@/Utils/datafetcher';
import { WeeklyEvents } from '@/components/UI/WeeklyEvents';
import { CheckCircle } from 'lucide-react';
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
      {/* <Popup /> */}

      {/* News and Events */}
      <News instagramPosts={instagramPosts} />
      <WeeklyEvents events={events} />
      
      {/* Signup */}
      <div className="flex w-full items-center justify-center py-8 sm:py-12">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
              <h3 className="pb-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105">
                Join Our Community!
              </h3>
              <p className="text-base-content/80 text-base sm:text-lg lg:text-xl mb-4 leading-relaxed max-w-2xl mx-auto">
                Stay connected with the latest MSA events, prayer times, and exclusive resources. Plus, get your free MSA Resource Guide!
              </p>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-2 bg-success text-success-content px-4 py-2 rounded-full text-sm sm:text-base shadow-sm">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Join 200+ students already signed up!</span>
              </div>
            </div>
          <MemberSignup />
        </div>
      </div>
    </div>
  );
}
