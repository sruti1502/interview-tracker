import Link from "next/link";
import { getCurrentUser } from "@/lib/getCurrentUser";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const currentUser = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link
        href="/"
        className="text-xl font-bold"
      >
        Interview Tracker
      </Link>

      <div className="flex items-center gap-4">

        <Link href="/">Dashboard</Link>

        {currentUser && (
          <>
            <Link href="/applications">
              Applications
            </Link>

            <Link href="/kanban">
              Kanban
            </Link>

            <Link href="/calendar">
              Calendar
            </Link>

            <Link href="/analytics">
              Analytics
            </Link>
          </>
        )}

        {currentUser ? (
          <SignOutButton />
        ) : (
          <SignInButton />
        )}
        <ThemeToggle />

      </div>
    </nav>
  );
}