import type { Candidate } from "./Dashboard"
import { Users, Clock, CheckCircle, UserCheck } from "lucide-react"

interface MetricsDashboardProps {
  candidates: Candidate[]
}

export default function MetricsDashboard({ candidates }: MetricsDashboardProps) {
  const totalCandidates = candidates.length
  const pendingCandidates = candidates.filter((c) => c.status === "PENDING").length
  const reviewedCandidates = candidates.filter((c) => c.status === "REVIEWED").length
  const hiredCandidates = candidates.filter((c) => c.status === "HIRED").length

  const metrics = [
    { label: "Total Candidates", value: totalCandidates, icon: Users, color: "bg-blue-100 text-blue-800" },
    { label: "Pending", value: pendingCandidates, icon: Clock, color: "bg-yellow-100 text-yellow-800" },
    { label: "Reviewed", value: reviewedCandidates, icon: CheckCircle, color: "bg-blue-100 text-blue-800" },
    { label: "Hired", value: hiredCandidates, icon: UserCheck, color: "bg-green-100 text-green-800" },
  ]

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Metrics Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.color} rounded-lg p-4 flex flex-col items-center justify-center`}
          >
            <metric.icon className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

