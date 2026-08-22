import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Next.js 16 + Shadcn UI Dashboard</h1>
      <div className="flex gap-4 mt-4">
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
