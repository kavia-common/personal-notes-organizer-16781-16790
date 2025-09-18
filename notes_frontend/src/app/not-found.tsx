import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen app-bg flex items-center justify-center p-6">
      <section className="surface max-w-lg w-full p-6 text-center" role="alert" aria-live="assertive">
        <div className="text-6xl">🫧</div>
        <h1 className="text-2xl font-semibold mt-2">404 – Page Not Found</h1>
        <p className="text-gray-600 mt-1">
          The page you’re looking for took a different current. Let’s head back home!
        </p>
        <Link href="/" className="btn btn-primary mt-4 inline-block">Go home</Link>
      </section>
    </main>
  );
}
