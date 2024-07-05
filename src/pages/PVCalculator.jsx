import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { fetchSunHours } from "@/utils/api";
import { parsePDF } from "@/utils/pdfParser";
import { calculateSimple, calculateComplex } from "@/utils/calculations";

const PVCalculator = () => {
  const [isSimple, setIsSimple] = useState(true);
  const { control, handleSubmit, watch } = useForm();
  const location = watch("location");

  const { data: sunHours, isLoading: isSunHoursLoading } = useQuery({
    queryKey: ["sunHours", location],
    queryFn: () => fetchSunHours(location),
    enabled: !!location,
  });

  const onSubmit = (data) => {
    if (isSimple) {
      const results = calculateSimple(data, sunHours);
      console.log(results);
    } else {
      const results = calculateComplex(data, sunHours);
      console.log(results);
    }
  };

  return (
    <div className="space-y-8">
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

      <h1 className="text-4xl font-bold text-center">Solar Panel Sizing Calculator</h1>
      <p className="text-xl text-center">Optimize your solar panel installation with our easy-to-use calculator. Input your location, roof area, and energy consumption to get personalized recommendations.</p>

      <div className="flex justify-center space-x-4">
        <Button variant={isSimple ? "primary" : "secondary"} onClick={() => setIsSimple(true)}>Simple Calculator</Button>
        <Button variant={!isSimple ? "primary" : "secondary"} onClick={() => setIsSimple(false)}>Complex Calculator</Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{isSimple ? "Simple Calculator" : "Complex Calculator"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Location" />
              )}
            />
            <Controller
              name="roofArea"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Roof Area (m² or ft²)" />
              )}
            />
            <Controller
              name="panelWattage"
              control={control}
              render={({ field }) => (
                <Select {...field}>
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
              )}
            />
            <Controller
              name="panelEfficiency"
              control={control}
              render={({ field }) => (
                <Select {...field}>
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
              )}
            />
            <Controller
              name="panelOrientation"
              control={control}
              render={({ field }) => (
                <Select {...field}>
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
              )}
            />
            <Controller
              name="shading"
              control={control}
              render={({ field }) => (
                <Select {...field}>
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
              )}
            />
            {!isSimple && (
              <>
                <Controller
                  name="tiltAngle"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
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
                  )}
                />
                <Controller
                  name="localEnergyCost"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Local Energy Cost (per kWh)" />
                  )}
                />
                <Controller
                  name="energyConsumption"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Energy Consumption (kWh)" />
                  )}
                />
                <Controller
                  name="pdfUpload"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="file" accept=".pdf" onChange={(e) => parsePDF(e.target.files[0])} />
                  )}
                />
              </>
            )}
          </CardContent>
        </Card>
        <Button type="submit" variant="primary">Calculate</Button>
      </form>
    </div>
  );
};

export default PVCalculator;