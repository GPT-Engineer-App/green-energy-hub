import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    // Handle newsletter signup logic here
    alert(`Signed up with email: ${email}`);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Eco-Electric Platform</h1>
        <p className="text-xl">Your Comprehensive Resource for Sustainable Electrical Solutions</p>
        <div className="space-x-4">
          <Button variant="primary">Explore Our Resources</Button>
          <Button variant="secondary">Try Our Design Tools</Button>
        </div>
        <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[400px]" />
      </section>

      {/* Key Features Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Educational Resources"
            description="Access a wealth of articles, videos, and interactive tutorials on sustainable electrical solutions."
          />
          <FeatureCard
            title="Design Tools"
            description="Utilize our advanced calculators for solar panel sizing and battery system optimization."
          />
          <FeatureCard
            title="Regional Adaptation"
            description="Get customized recommendations based on your local climate data and energy pricing."
          />
          <FeatureCard
            title="Content Updates"
            description="Stay informed with the latest news, trends, and innovations in eco-friendly electrical technology."
          />
        </div>
      </section>

      {/* Solar Panel Sizing Calculator Preview */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Solar Panel Sizing Calculator</h2>
        <p>Optimize your solar panel installation with our easy-to-use calculator. Input your location, roof area, and energy consumption to get personalized recommendations.</p>
        <Button variant="primary" onClick={() => navigate("/pv-calculator")}>Try Now</Button>
        <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[400px]" />
      </section>

      {/* Footer */}
      <footer className="space-y-4 text-center">
        <p>&copy; 2023 Eco-Electric Platform. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="text-muted-foreground">Facebook</a>
          <a href="#" className="text-muted-foreground">Twitter</a>
          <a href="#" className="text-muted-foreground">LinkedIn</a>
        </div>
        <form onSubmit={handleNewsletterSignup} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="primary">Sign Up</Button>
        </form>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

export default Index;