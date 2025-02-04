import { useState, useEffect } from "react"
import CandidateList from "./CandidateList"
import ReferralForm from "./ReferralForm"
import MetricsDashboard from "./MetricsDashboard"
import { useToast } from "@/hooks/use-toast"

export interface Candidate {
  _id: string
  name: string
  jobTitle: string
  status: "PENDING" | "REVIEWED" | "HIRED"
  email: string
  phone: string
}

export default function Dashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      // Make an API call to the local server
      const response = await fetch("https://crms-wbio.onrender.com/api/candidates");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReferral = async (newCandidate: Omit<Candidate, "id" | "status">) => {
    try {
      const response = await fetch("https://crms-wbio.onrender.com/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCandidate),
      });
  
      if (!response.ok) {
        let errorMessage = "Operation failed.";
        
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse?.message || JSON.stringify(errorResponse);
        } catch (jsonError) {
          console.error("Error parsing response JSON:", jsonError);
        }
  
        toast({
          variant: "destructive",
          title: "Failure",
          description: errorMessage,
        });
  
        throw new Error(errorMessage);
      }
  
      const { candidate: addedCandidate, message } = await response.json();
      setCandidates([...candidates, addedCandidate]);
  
      toast({
        title: "Success",
        description: message,
      });
    } catch (error) {
      console.error("Error adding candidate:", error);
  
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    }
  };
  

  // Update candidate status via API
  const updateCandidateStatus = async (id: string, newStatus: Candidate["status"]) => {
    try {
      const response = await fetch(`https://crms-wbio.onrender.com/api/candidates/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Failed to add candidate.",
          variant: "destructive",
        }); 
        throw new Error("Failed to update candidate status");

      }

      const {candidate:updateCandidateStatus,message} = await response.json();
      setCandidates( candidates.map((candidate)=>{
        if(candidate._id===id)
        {candidate.status = updateCandidateStatus.status}
        return candidate;
      })
      );
      toast({
        title: "Success",
        description: "Candidate status updated.",
      }); 
      console.log('message',message);
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <MetricsDashboard candidates={candidates} />
        <CandidateList candidates={candidates} updateStatus={updateCandidateStatus} isLoading={isLoading} />
      </div>
      <div>
        <ReferralForm onSubmit={handleNewReferral} />
      </div>
    </div>
  )
}

