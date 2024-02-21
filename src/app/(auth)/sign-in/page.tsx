import { auth, signIn, signOut } from "auth";
import { Session } from "next-auth";
import Image from "next/image";
interface MySession extends Session {
  sessionToken?: string;
}
export function SignIn() {
  return (
    <div className="mt 10">
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">Sign in with google</button>
    </form>
    </div>
  );
}

export function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Page() {
  let session: MySession | null = await auth();
  let user = session?.user?.email;
  


  return (
    <section className="mt-20">
      <h1>Home</h1>
      <div>{user ? <SignOut>{`Welcome ${user} ${session?.user?.image} `}</SignOut> : <SignIn />}
      <Image src={session?.user?.image ?? ''} alt={""} width={100} height={100}></Image>      
      </div>
    </section>
  );
}