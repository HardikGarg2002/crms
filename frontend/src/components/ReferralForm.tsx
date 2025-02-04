import { useState } from "react"
import { User, Mail, Phone, Briefcase, FileText } from "lucide-react"

interface ReferralFormProps {
  onSubmit: (candidate: any) => void
}

export default function ReferralForm({ onSubmit }: ReferralFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resumeUrl: "", // Store the Cloudinary URL
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "resume" && files) {
      setResumeFile(files[0]) // Store file separately
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const uploadToCloudinary = async () => {
    if (!resumeFile) return
    console.log('uploading to cloudinary');
    setUploading(true)
    const formData = new FormData()
    formData.append("file", resumeFile)
    formData.append("upload_preset", "candidate_referal_ms") // Replace with your preset
    formData.append("resource_type", "raw");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dbki9mbxu/image/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      console.log('response from cloudinary',data)
      setFormData((prev) => ({ ...prev, resumeUrl: data.secure_url }))
    } catch (error) {
      console.error("Upload failed", error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.resumeUrl) {
      await uploadToCloudinary() // Ensure upload completes before submission
    }
    onSubmit(formData) // Send to backend
    setFormData({ name: "", email: "", phone: "", jobTitle: "", resumeUrl: "" })
    setResumeFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Refer a Candidate</h2>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
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
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
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
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
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
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
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
        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Resume (PDF only)</label>
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
          {uploading && <p className="text-blue-500 text-sm mt-2">Uploading...</p>}
        </div>
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md" type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Referral"}
        </button>
      </div>
    </form>
  )
}
