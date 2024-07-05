export const calculateSimple = ({ location, roofArea, energyConsumption, sunHours }) => {
  // Simple calculation logic here
  return {
    totalKwp: 5,
    annualProduction: 6000,
    annualSavings: 500,
    paybackPeriod: 5,
    co2Saved: 3000,
  };
};

export const calculateComplex = ({ location, roofArea, panelWattage, panelEfficiency, panelOrientation, shading, tiltAngle, energyCost, sunHours }) => {
  // Complex calculation logic here
  return {
    totalKwp: 10,
    annualProduction: 12000,
    annualSavings: 1000,
    paybackPeriod: 4,
    co2Saved: 6000,
  };
};