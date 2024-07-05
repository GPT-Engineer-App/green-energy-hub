import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DesignTools = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Design Tools</h1>
        <p className="text-xl">Explore our advanced tools for designing sustainable electrical solutions.</p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ToolCard
            title="Solar Panel Sizing Calculator"
            description="Optimize your solar panel installation with our easy-to-use calculators."
            onClick={() => navigate('/design-tools/solar-panel-calculator')}
          />
          {/* Add more tools here */}
        </div>
      </section>
    </div>
  );
};

const ToolCard = ({ title, description, onClick }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <Button variant="primary" onClick={onClick} className="mt-4">Explore</Button>
    </CardContent>
  </Card>
);

export default DesignTools;