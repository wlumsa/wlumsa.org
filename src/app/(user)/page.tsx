
import Popup from '@/components/UI/Popup';
import News from '@/components/UI/News';
import Hero from '@/components/UI/Hero';
import PrayerSection from '@/components/UI/PrayerSection';
import Events from '@/components/UI/WeeklyEvents';
import MemberSignup from '@/components/UI/MemberSignup';

import { fetchInstagramPosts, fetchSocialLinks, getNavbarData,  heroUrl ,fetchPrayerRooms,fetchJummahInfo,fetchTodaysTimings,fetchEvents,getFooterData} from "@/Utils/api"

export default async function Home() {
  
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
      <News instagramPosts={instagramPosts}/>
      <PrayerSection prayerRoomsData={prayerRoomsData}  jummahInfo={jummahInfo}  timingsData={timingsData} />
      <Events events={events} />
      <MemberSignup />
      
    </main>
  )
}