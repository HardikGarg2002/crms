import { useState } from "react"
import type { Candidate } from "./Dashboard"
import { User, Mail, Phone, Briefcase, FileText } from "lucide-react"

interface ReferralFormProps {
  onSubmit: (candidate: Omit<Candidate, "id" | "status">) => void
}

export default function ReferralForm({ onSubmit }: ReferralFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "resume" && files) {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: "", email: "", phone: "", jobTitle: "", resume: null })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Refer a Candidate</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Candidate Name
          </label>
          <div className="relative">
            <input
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
            Phone Number
          </label>
          <div className="relative">
            <input
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Phone className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="jobTitle">
            Job Title
          </label>
          <div className="relative">
            <input
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="jobTitle"
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="resume">
            Resume (PDF only)
          </label>
          <div className="relative">
            <input
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="resume"
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              required
            />
            <FileText className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          type="submit"
        >
          Submit Referral
        </button>
      </div>
    </form>
  )
}

