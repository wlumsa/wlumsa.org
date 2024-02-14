
export default  function DirectoryPage() {
  const clientID = process.env.GOOGLE_DRIVE_CLIENT_ID 
  return (
    <div className="flex min-h-screen flex-col">
      <div className=" flex flex-grow items-center  justify-center">
        <div className="w-full">
        
        </div>
      </div>
    </div>
  );
}

/*
// Assuming the existence of a `session` type based on your authentication strategy
import { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, ReactElement } from "react";
import { redirect } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./page.module.css";
import { sohneBreit } from "../layout";
import DashedAnimation from "@/components/DashedAnimation/DashedAnimation";

interface FileUploadResponseMessageProps {
  file: File;
  dropped: boolean;
}

// Assuming `sohneBreit.className` is of type string. You might need to adjust based on actual usage
const FileUploadResponseMessage = ({ file, dropped }: FileUploadResponseMessageProps): ReactElement => (
  <motion.p
    initial={{ opacity: 0, y: 20, x: "-50%" }}
    animate={{ opacity: 1, y: 0, x: "-50%" }}
    exit={{ opacity: 0, y: -20, x: "-50%" }}
    transition={{ duration: 1, ease: [0, 0, 0, 0.8] }}
    className={`${sohneBreit.className} ${styles.p} ${dropped ? styles.dropped : ""}`}
  >
    Yeay, your file <em>{file.name}</em>
    <br />
    has been uploaded!
  </motion.p>
);

const UploadPage = (): ReactElement => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  }) as { data: Session }; // Assuming the session object has a specific type
  const [dropped, setDropped] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [resultMessage, setResultMessage] = useState<ReactElement | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    setDropped(true);
    setTimeout(() => setDropped(false), 5000);
    setDragging(false);
    if (e.dataTransfer?.files[0]) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = (): void => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    if (e.target?.files[0]) {
      await handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList): Promise<void> => {
    const file = files[0];

    const metadata = {
      name: file.name, // Set the desired title of the file
    };

    const body = new FormData();
    body.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    body.append("file", file);

    try {
      await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      setResultMessage(<FileUploadResponseMessage file={file} dropped={dropped} />);
    } catch (error) {
      setResultMessage(
        <motion.p
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ duration: 1, ease: [0, 0, 0, 0.8] }}
          className={`${sohneBreit.className} ${styles.p} ${dropped ? styles.dropped : ""}`}
        >
          Ouch, something went wrong <br /> Try again dropping a file
        </motion.p>
      );
    }
  };

  return (
    <>
      {session && (
        <>
          <header className={styles.header}>
            <p className={sohneBreit.className}>Welcome, {session.user.name.split(" ")[0]}</p>
            <button className={`button ${styles.headerButton}`} onClick={() => signOut()}>
              Sign Out
            </button>
          </header>
          <div className={styles.formWrapper}>
           
            </div>
            </>
          )}
        </>
      );
    };
    
    export default UploadPage;
*/