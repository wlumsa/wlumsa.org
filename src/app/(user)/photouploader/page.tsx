"use client"
import DriveUploady from "drive-uploady";
import UploadButton from "@rpldy/upload-button";
export default  function DirectoryPage() {
  const clientID = process.env.GOOGLE_DRIVE_CLIENT_ID 
  return (
    <div className="flex min-h-screen flex-col">
      <div className=" flex flex-grow items-center  justify-center">
        <div className="w-full">
          <DriveUploady
            clientId="436932817736-9ucrvbf00d1qjnb7ahio0bdk364vctem.apps.googleusercontent.com"
            scope="https://www.googleapis.com/auth/drive.file"
            
          >
            <h2>Drive Uploady</h2>

            <UploadButton>Upload to Drive</UploadButton>
          </DriveUploady>
        </div>
      </div>
    </div>
  );
}
