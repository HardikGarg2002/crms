import type { Candidate } from "./Dashboard"
import { User, Briefcase, Phone, Mail } from "lucide-react"
import { Button } from "./ui/button"
interface CandidateCardProps {
  candidate: Candidate
  updateStatus: (id: string, newStatus: Candidate["status"]) => void
}

export default function CandidateCard({ candidate, updateStatus }: CandidateCardProps) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    REVIEWED: "bg-blue-100 text-blue-800",
    HIRED: "bg-green-100 text-green-800",
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <User className="mr-2" size={20} />
            {candidate.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[candidate.status]}`}>
            {candidate.status}
          </span>
        </div>
        <div className="flex items-center justify-between">
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center">
            <Briefcase className="mr-2" size={16} />
            {candidate.jobTitle}
          </p>
          <p className="flex items-center">
            <Mail className="mr-2" size={16} />
            {candidate.email}
          </p>
          <p className="flex items-center">
            <Phone className="mr-2" size={16} />
            {candidate.phone}
          </p>
        </div>
        {candidate.resumeUrl &&
          <Button variant="outline" > <a href={candidate.resumeUrl} download={candidate.name+'_resume'} target="_blank">View Resume</a></Button>
        }
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
        <label htmlFor={`status-${candidate._id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Update Status:
        </label>
        <select
          id={`status-${candidate._id}`}
          value={candidate.status}
          onChange={(e) => updateStatus(candidate._id, e.target.value as Candidate["status"])}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="PENDING">Pending</option>
          <option value="REVIEWED">Reviewed</option>
          <option value="HIRED">Hired</option>
        </select>
      </div>
    </div>
  )
}

