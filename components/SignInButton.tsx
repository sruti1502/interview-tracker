"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Sign In
    </button>
  );
}