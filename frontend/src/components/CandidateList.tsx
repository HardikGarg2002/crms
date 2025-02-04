import { useState } from "react"
import type { Candidate } from "./Dashboard"
import CandidateCard from "./CandidateCard"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"

interface CandidateListProps {
  candidates: Candidate[]
  updateStatus: (id: string, newStatus: Candidate["status"]) => void
  isLoading: boolean
}

export default function CandidateList({ candidates, updateStatus, isLoading }: CandidateListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Candidate["status"] | "All">("All")

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || candidate.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Referred Candidates</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name, job title, email, or phone"
            className="w-full p-3 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <select
            className="w-full md:w-48 p-3 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Candidate["status"] | "All")}
          >
            <option value="All">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="HIRED">Hired</option>
          </select>
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCandidates.length === 0 ? (
            <p className="text-center text-gray-500">No candidates match your search criteria.</p>
          ) : (
            filteredCandidates.map((candidate, index) => (
              <motion.div
                key={candidate._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CandidateCard candidate={candidate} updateStatus={updateStatus} />
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  )
}

