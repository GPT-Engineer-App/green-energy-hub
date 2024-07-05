import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const SolarPanelCalculator = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Solar Panel Sizing Calculator</h1>
        <p className="text-xl">Optimize your solar panel installation with our easy-to-use calculators.</p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Choose Your Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CalculatorCard
            title="Simple Calculator"
            description="Basic estimation for solar panel sizing."
            onClick={() => navigate('/design-tools/simple-calculator')}
          />
          <CalculatorCard
            title="Complex Calculator"
            description="Detailed analysis for solar panel sizing considering multiple factors."
            onClick={() => navigate('/design-tools/complex-calculator')}
          />
        </div>
      </section>
    </div>
  );
};

const CalculatorCard = ({ title, description, onClick }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <Button variant="primary" onClick={onClick} className="mt-4">Try Now</Button>
    </CardContent>
  </Card>
);

export default SolarPanelCalculator;