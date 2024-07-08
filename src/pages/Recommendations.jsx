import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "@/api/openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Recommendations = () => {
  const [prompt, setPrompt] = useState("");

  const { data: recommendation, refetch, isLoading, isError } = useQuery({
    queryKey: ["recommendation", prompt],
    queryFn: () => fetchRecommendations(prompt),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      refetch();
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Get Eco-Electric Recommendations</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your eco-electric question or topic"
          className="w-full"
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Fetching..." : "Get Recommendation"}
        </Button>
      </form>

      {isError && (
        <Card className="bg-red-100 border-red-300">
          <CardContent>
            <p className="text-red-700">Failed to fetch recommendation. Please try again.</p>
          </CardContent>
        </Card>
      )}

      {recommendation && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{recommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Recommendations;