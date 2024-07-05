import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchSunHours } from '@/utils/api';
import { calculateSimple, calculateComplex } from '@/utils/calculations';
import { parsePDF } from '@/utils/pdfParser';
import { getRecommendations } from '@/utils/aiAssistant';
import L from 'leaflet';

const SolarPanelCalculator = () => {
  const [isSimple, setIsSimple] = useState(true);
  const [location, setLocation] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [energyConsumption, setEnergyConsumption] = useState('');
  const [panelWattage, setPanelWattage] = useState('');
  const [panelEfficiency, setPanelEfficiency] = useState('');
  const [panelOrientation, setPanelOrientation] = useState('');
  const [shading, setShading] = useState('');
  const [tiltAngle, setTiltAngle] = useState('');
  const [energyCost, setEnergyCost] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [results, setResults] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const { data: sunHours } = useQuery({
    queryKey: ['sunHours', location],
    queryFn: () => fetchSunHours(location),
    enabled: !!location,
  });

  const handleCalculate = async () => {
    let calcResults;
    if (isSimple) {
      calcResults = calculateSimple({ location, roofArea, energyConsumption, sunHours });
    } else {
      const panelSpecs = pdfFile ? await parsePDF(pdfFile) : {};
      calcResults = calculateComplex({
        location,
        roofArea,
        panelWattage,
        panelEfficiency,
        panelOrientation,
        shading,
        tiltAngle,
        energyCost,
        sunHours,
        ...panelSpecs,
      });
    }
    setResults(calcResults);
    const aiRecommendations = await getRecommendations(calcResults);
    setRecommendations(aiRecommendations);
  };

  return (
    <Container>
      <Header>Solar Panel Sizing Calculator</Header>
      <ToggleContainer>
        <Button variant={isSimple ? 'primary' : 'secondary'} onClick={() => setIsSimple(true)}>
          Simple Calculator
        </Button>
        <Button variant={!isSimple ? 'primary' : 'secondary'} onClick={() => setIsSimple(false)}>
          Complex Calculator
        </Button>
      </ToggleContainer>
      <Form>
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Roof Area (m² or ft²)"
          value={roofArea}
          onChange={(e) => setRoofArea(e.target.value)}
        />
        {isSimple ? (
          <Input
            type="text"
            placeholder="Energy Consumption (kWh)"
            value={energyConsumption}
            onChange={(e) => setEnergyConsumption(e.target.value)}
          />
        ) : (
          <>
            <Input
              type="text"
              placeholder="Panel Wattage (250W, 300W, 350W, 400W, Manual Input)"
              value={panelWattage}
              onChange={(e) => setPanelWattage(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Panel Efficiency (15%, 18%, 20%, 22%, Manual Input)"
              value={panelEfficiency}
              onChange={(e) => setPanelEfficiency(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Panel Orientation (South, South-East, South-West, East, West, North)"
              value={panelOrientation}
              onChange={(e) => setPanelOrientation(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Shading (0% (No shading), 5%, 10%, 15%, 20%, Manual Input)"
              value={shading}
              onChange={(e) => setShading(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Tilt Angle (0° (Flat), 15°, 30°, 45°, Manual Input)"
              value={tiltAngle}
              onChange={(e) => setTiltAngle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Local Energy Cost (per kWh)"
              value={energyCost}
              onChange={(e) => setEnergyCost(e.target.value)}
            />
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </>
        )}
        <Button variant="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </Form>
      {results && (
        <Results>
          <Card>
            <CardHeader>
              <CardTitle>Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total kWp: {results.totalKwp}</p>
              <p>Estimated Annual Production: {results.annualProduction}</p>
              <p>Annual Savings: {results.annualSavings}</p>
              <p>Payback Period: {results.paybackPeriod}</p>
              <p>CO2 Emissions Saved: {results.co2Saved}</p>
            </CardContent>
          </Card>
        </Results>
      )}
      {recommendations && (
        <Recommendations>
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{recommendations}</p>
            </CardContent>
          </Card>
        </Recommendations>
      )}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={(e) => {
              const { layerType, layer } = e;
              if (layerType === 'polygon') {
                const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
                setRoofArea(area);
              }
            }}
            draw={{
              rectangle: false,
              circle: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Results = styled.div`
  margin-bottom: 20px;
`;

const Recommendations = styled.div`
  margin-bottom: 20px;
`;

export default SolarPanelCalculator;