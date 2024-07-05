import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

const DesignTools = () => {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Design Tools</h1>
        <p className="text-xl">Explore our advanced design tools for sustainable electrical solutions.</p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ToolCard
            title="Solar Panel Sizing Calculator"
            description="Optimize your solar panel installation with our easy-to-use calculator."
            to="/design-tools/solar-panel-calculator"
          />
        </div>
      </section>
    </div>
  );
};

const ToolCard = ({ title, description, to }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <NavLink to={to} className="text-blue-500 hover:underline">
        Try Now
      </NavLink>
    </CardContent>
  </Card>
);

export default DesignTools;