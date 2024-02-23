"use client";
import { signIn } from 'next-auth/react'
import { Session } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IconSpinner, IconGoogle } from "../../components/UI/icons";
import React from "react";
interface LoginButtonProps {
  showGithubIcon?: boolean;
  text?: string;
}
export function LoginButton({
  text = "Login with Google",
  showGithubIcon = true,

  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <button
      onClick={() => {
        setIsLoading(true);
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn("google", { callbackUrl: `/` });
      }}
      disabled={isLoading}
      className="btn-primary"
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon ? (
        <IconGoogle className="mr-2" />
      ) : null}
      {text}
    </button>
  );
}
