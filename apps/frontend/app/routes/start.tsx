export function meta() {
  return [
    { title: "Get Started - Webelee" },
    { name: "description", content: "Start page" },
  ];
}

export default function Start() {
  return (
    <main className="flex items-center justify-center min-h-screen py-16 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">You're on the Start page</h1>
        <p className="text-gray-600 dark:text-gray-300">Let's begin your journey.</p>
      </div>
    </main>
  );
}
