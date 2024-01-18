import { fetchYoutubeVideos } from "@/utils/api";
export default async function Page({ params }: { params: { category: string } }) {
    if(params.category == "jummah" || params.category == "halaqah" || params.category == "guestspeakers"){
        const jummahTimes = await fetchYoutubeVideos(params.category);
    }
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mt-20 flex flex-grow flex-col items-center">
        
      </div>
    </div>
  );
}
