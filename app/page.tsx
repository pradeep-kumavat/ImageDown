export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">ImageDown</h1>
      </header>
      <main className="w-full max-w-md mx-auto">
        <div className="space-y-4">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl"
          >
            Sign Up
          </button>

          <button
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-5 rounded-xl"
          >
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}
