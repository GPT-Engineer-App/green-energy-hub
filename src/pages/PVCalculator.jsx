import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "react-leaflet-draw/dist/leaflet.draw.css";

const PVCalculator = () => {
  const [calculatorType, setCalculatorType] = useState("simple");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [roofArea, setRoofArea] = useState(0);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAreaDrawn = (e) => {
    const layer = e.layer;
    const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    setRoofArea(area);
  };

  return (
    <div className="space-y-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/design-tools">Design Tools</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Solar Panel Sizing Calculator</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Solar Panel Sizing Calculator</h1>
        <p className="text-xl">Optimize your solar panel installation with our easy-to-use calculator. Input your location, roof area, and energy consumption to get personalized recommendations.</p>
      </section>

      <Tabs defaultValue="simple" onValueChange={setCalculatorType}>
        <TabsList>
          <TabsTrigger value="simple">Simple Calculator</TabsTrigger>
          <TabsTrigger value="complex">Complex Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("location", { required: true })} placeholder="Location" />
            {errors.location && <span>This field is required</span>}
            <Input {...register("roofArea", { required: true })} placeholder="Roof Area (m² or ft²)" value={roofArea} readOnly />
            {errors.roofArea && <span>This field is required</span>}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Panel Wattage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="250W">250W</SelectItem>
                <SelectItem value="300W">300W</SelectItem>
                <SelectItem value="350W">350W</SelectItem>
                <SelectItem value="400W">400W</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Panel Efficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15%">15%</SelectItem>
                <SelectItem value="18%">18%</SelectItem>
                <SelectItem value="20%">20%</SelectItem>
                <SelectItem value="22%">22%</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Panel Orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="South-East">South-East</SelectItem>
                <SelectItem value="South-West">South-West</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="North">North</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Shading" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0%">0% (No shading)</SelectItem>
                <SelectItem value="5%">5%</SelectItem>
                <SelectItem value="10%">10%</SelectItem>
                <SelectItem value="15%">15%</SelectItem>
                <SelectItem value="20%">20%</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Calculate</Button>
          </form>
        </TabsContent>
        <TabsContent value="complex">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("location", { required: true })} placeholder="Location" />
            {errors.location && <span>This field is required</span>}
            <Input {...register("roofArea", { required: true })} placeholder="Roof Area (m² or ft²)" value={roofArea} readOnly />
            {errors.roofArea && <span>This field is required</span>}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Panel Wattage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="250W">250W</SelectItem>
                <SelectItem value="300W">300W</SelectItem>
                <SelectItem value="350W">350W</SelectItem>
                <SelectItem value="400W">400W</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Panel Efficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15%">15%</SelectItem>
                <SelectItem value="18%">18%</SelectItem>
                <SelectItem value="20%">20%</SelectItem>
                <SelectItem value="22%">22%</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Panel Orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="South-East">South-East</SelectItem>
                <SelectItem value="South-West">South-West</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="North">North</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Shading" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0%">0% (No shading)</SelectItem>
                <SelectItem value="5%">5%</SelectItem>
                <SelectItem value="10%">10%</SelectItem>
                <SelectItem value="15%">15%</SelectItem>
                <SelectItem value="20%">20%</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tilt Angle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0°">0° (Flat)</SelectItem>
                <SelectItem value="15°">15°</SelectItem>
                <SelectItem value="30°">30°</SelectItem>
                <SelectItem value="45°">45°</SelectItem>
                <SelectItem value="manual">Manual Input</SelectItem>
              </SelectContent>
            </Select>
            <Input {...register("localEnergyCost", { required: true })} placeholder="Local Energy Cost (per kWh)" />
            {errors.localEnergyCost && <span>This field is required</span>}
            <Input {...register("energyConsumption", { required: true })} placeholder="Energy Consumption (kWh)" />
            {errors.energyConsumption && <span>This field is required</span>}
            <Input {...register("pdfUpload", { required: true })} type="file" placeholder="PDF Upload for panel specifications" />
            {errors.pdfUpload && <span>This field is required</span>}
            <Button type="submit">Calculate</Button>
          </form>
        </TabsContent>
      </Tabs>

      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Draw Your Roof Area</h2>
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-[400px] w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handleAreaDrawn}
              draw={{
                rectangle: false,
                circle: false,
                marker: false,
                polyline: false,
                circlemarker: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </section>
    </div>
  );
};

export default PVCalculator;