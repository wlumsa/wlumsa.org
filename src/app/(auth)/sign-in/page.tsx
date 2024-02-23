import { auth} from "auth";
import { redirect } from "next/navigation";
import React from "react";
import { LoginButton } from "../LoginButton";

export default async function SignInPage() {
  const session = await auth();
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginButton />
    </div>
  );
}
