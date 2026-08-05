"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function LoginButton() {
  const { data: session } =
    useSession();

  if (session) {
    return (
      <div className="flex gap-2 items-center">
        <span>
          {session.user?.name}
        </span>

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        signIn("github")
      }
      className="bg-black text-white px-3 py-2 rounded"
    >
      Login with GitHub
    </button>
  );
}