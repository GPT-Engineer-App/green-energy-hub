import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

const DesignTools = () => {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Design Tools</h1>
        <p className="text-xl">Explore our advanced tools for designing sustainable electrical solutions.</p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Solar Panel Sizing Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CalculatorCard
            title="Simple Calculator"
            description="Basic estimation for solar panel sizing."
            link="/design-tools/solar-panel-calculator/simple"
          />
          <CalculatorCard
            title="Complex Calculator"
            description="Detailed analysis for solar panel sizing considering multiple factors."
            link="/design-tools/solar-panel-calculator/complex"
          />
        </div>
      </section>
    </div>
  );
};

const CalculatorCard = ({ title, description, link }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <NavLink to={link}>
        <Button variant="primary" className="mt-4">Try Now</Button>
      </NavLink>
    </CardContent>
  </Card>
);

export default DesignTools;