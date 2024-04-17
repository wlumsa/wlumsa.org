
import UploadPhotoForm from "@/components/Forms/UploadPhoto";
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col  flex-grow items-center justify-center">
        <h1 className="text-center text-lg lg:text-4xl font-bold text-primary mb-20 ">
          Upload your photos and videos here!
        </h1>
        <div className="w-full flex flex-col items-center justify-center px-4">
          <UploadPhotoForm />
        </div>
      </div>
    </div>
  );
}

