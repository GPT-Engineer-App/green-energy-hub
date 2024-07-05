import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DesignTools = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

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
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-green-600 text-white">
        <h1 className="text-2xl font-bold">Eco-Electric</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/educational-resources" className="hover:underline">Educational Resources</a>
          <a href="/design-tools" className="hover:underline">Design Tools</a>
          <a href="/regional-adaptation" className="hover:underline">Regional Adaptation</a>
          <a href="/content-updates" className="hover:underline">Content Updates</a>
          <a href="/sign-in" className="hover:underline">Sign In/Sign Up</a>
        </nav>
      </header>

      {/* Main Section */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Solar Panel Sizing Calculator</h2>
        <p className="text-xl">Optimize your solar panel installation with our easy-to-use calculators.</p>
      </section>

      {/* Simple Calculator Section */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-center">Simple Calculator</h3>
        <p className="text-center">Basic estimation for solar panel sizing.</p>
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate("/design-tools/simple-calculator")}>Try Now</Button>
        </div>
      </section>

      {/* Complex Calculator Section */}
      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-center">Complex Calculator</h3>
        <p className="text-center">Detailed analysis for solar panel sizing considering multiple factors.</p>
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate("/design-tools/complex-calculator")}>Try Now</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="space-y-4 text-center p-4 bg-gray-800 text-white">
        <p>&copy; 2023 Eco-Electric Platform. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">LinkedIn</a>
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

export default DesignTools;