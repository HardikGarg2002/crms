import Dashboard from "../components/Dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Candidate Referral Dashboard</h1>
        <Dashboard />
      </div>
    </main>
  )
}

