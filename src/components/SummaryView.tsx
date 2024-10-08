// TODO: we'll have to get state and send to an AI model.
"use client";
import { Island_Moments } from "next/font/google";
import { useEffect, useState } from "react";

const SummaryView: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummary = async () => {
    setIsLoading(true);
    fetch("/api/summary")
    .then((res) => res.json())
    .then((data: any) => {
      setSummary(data['content'])
      setIsLoading(false)
    }
  )
    .catch((error) => console.error("Error fetching summary:", error));}


  useEffect(() => {
    // Fetch summary from API
      fetchSummary();
  }, []);


  return (
    <div className="mt-4 flex flex-col gap-[20px]">
      <p className="ml-2 font-bold">Here is a summary of your transcript:</p>
      <div className="flex rounded-xl bg-base-200 p-6 shadow-md">
      {isLoading ? (
          <div className="animate-pulse-slow">Generating...</div>
        ) : (
          summary
        )}
      </div>
    </div>
  );
};

export default SummaryView;
