import type { Route } from "./+types/home";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Webelee" },
    { name: "description", content: "Starting now" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen py-16 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Starting now</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Welcome to Webelee — a simple starting page.
        </p>
        <a href="/start">
          <Button size="lg">Get Started</Button>
        </a>
      </div>
    </main>
  );
}
