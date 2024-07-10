import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const simpleCalculatorSchema = z.object({
  location: z.string().nonempty("Location is required"),
  roofArea: z.number().positive("Roof area must be a positive number"),
  panelWattage: z.union([z.enum(["350", "415", "420"]), z.number().positive("Panel wattage must be a positive number")]),
  panelEfficiency: z.union([z.enum(["20", "22"]), z.number().positive("Panel efficiency must be a positive number")]),
  panelOrientation: z.enum(["South", "South-East", "South-West", "East", "West", "North"]),
  shading: z.union([z.enum(["0", "5", "10", "15", "20"]), z.number().positive("Shading must be a positive number")]),
});

const complexCalculatorSchema = simpleCalculatorSchema.extend({
  tiltAngle: z.union([z.enum(["0", "15", "30", "45"]), z.number().positive("Tilt angle must be a positive number")]),
  localEnergyCost: z.number().positive("Local energy cost must be a positive number"),
  energyConsumption: z.number().positive("Energy consumption must be a positive number"),
  pdfUpload: z.any().optional(),
});

const SolarCalculator = () => {
  const [calculatorType, setCalculatorType] = useState("simple");
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(calculatorType === "simple" ? simpleCalculatorSchema : complexCalculatorSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast("Calculation submitted!");
  };
  return (
    <div className="space-y-8 p-4">
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

      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Solar Panel Sizing Calculator</h1>
        <p className="text-xl">Optimize your solar panel installation with our easy-to-use calculator. Input your location, roof area, and energy consumption to get personalized recommendations.</p>
      </header>

      <Tabs defaultValue="simple" onValueChange={setCalculatorType}>
        <TabsList>
          <TabsTrigger value="simple">Simple Calculator</TabsTrigger>
          <TabsTrigger value="complex">Complex Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Simple Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => <Input id="location" placeholder="Enter location" {...field} />}
                  />
                  {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                </div>
                <div>
                  <Label htmlFor="roofArea">Roof Area (m² or ft²)</Label>
                  <Controller
                    name="roofArea"
                    control={control}
                    render={({ field }) => <Input id="roofArea" placeholder="Enter roof area" type="number" {...field} />}
                  />
                  {errors.roofArea && <p className="text-red-500">{errors.roofArea.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panelWattage">Panel Wattage</Label>
                  <Controller
                    name="panelWattage"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="350">
                        <SelectTrigger>
                          <SelectValue placeholder="Select wattage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="350">350W</SelectItem>
                          <SelectItem value="415">415W</SelectItem>
                          <SelectItem value="420">420W</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.panelWattage && <p className="text-red-500">{errors.panelWattage.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panelEfficiency">Panel Efficiency</Label>
                  <Controller
                    name="panelEfficiency"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="20">
                        <SelectTrigger>
                          <SelectValue placeholder="Select efficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="22">22%</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.panelEfficiency && <p className="text-red-500">{errors.panelEfficiency.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panelOrientation">Panel Orientation</Label>
                  <Controller
                    name="panelOrientation"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="South">
                        <SelectTrigger>
                          <SelectValue placeholder="Select orientation" />
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
                  {errors.panelOrientation && <p className="text-red-500">{errors.panelOrientation.message}</p>}
                </div>
                <div>
                  <Label htmlFor="shading">Shading</Label>
                  <Controller
                    name="shading"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select shading" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0% (No shading)</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.shading && <p className="text-red-500">{errors.shading.message}</p>}
                </div>
                <Button type="submit" variant="primary">Calculate</Button>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="complex">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complex Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Include all fields from Simple Calculator */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => <Input id="location" placeholder="Enter location" {...field} />}
                  />
                  {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                </div>
                <div>
                  <Label htmlFor="roofArea">Roof Area (m² or ft²)</Label>
                  <Controller
                    name="roofArea"
                    control={control}
                    render={({ field }) => <Input id="roofArea" placeholder="Enter roof area" type="number" {...field} />}
                  />
                  {errors.roofArea && <p className="text-red-500">{errors.roofArea.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panelWattage">Panel Wattage</Label>
                  <Controller
                    name="panelWattage"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="350">
                        <SelectTrigger>
                          <SelectValue placeholder="Select wattage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="350">350W</SelectItem>
                          <SelectItem value="415">415W</SelectItem>
                          <SelectItem value="420">420W</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.panelWattage && <p className="text-red-500">{errors.panelWattage.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panelEfficiency">Panel Efficiency</Label>
                  <Controller
                    name="panelEfficiency"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="20">
                        <SelectTrigger>
                          <SelectValue placeholder="Select efficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="22%">22%</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.panelEfficiency && <p className="text-red-500">{errors.panelEfficiency.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panelOrientation">Panel Orientation</Label>
                  <Controller
                    name="panelOrientation"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="South">
                        <SelectTrigger>
                          <SelectValue placeholder="Select orientation" />
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
                  {errors.panelOrientation && <p className="text-red-500">{errors.panelOrientation.message}</p>}
                </div>
                <div>
                  <Label htmlFor="shading">Shading</Label>
                  <Controller
                    name="shading"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select shading" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0% (No shading)</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.shading && <p className="text-red-500">{errors.shading.message}</p>}
                </div>
                {/* Additional fields for Complex Calculator */}
                <div>
                  <Label htmlFor="tiltAngle">Tilt Angle</Label>
                  <Controller
                    name="tiltAngle"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="0">
                        <SelectTrigger>
                          <SelectValue placeholder="Select tilt angle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0° (Flat)</SelectItem>
                          <SelectItem value="15">15°</SelectItem>
                          <SelectItem value="30">30°</SelectItem>
                          <SelectItem value="45">45°</SelectItem>
                          <SelectItem value="manual">Manual Input</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.tiltAngle && <p className="text-red-500">{errors.tiltAngle.message}</p>}
                </div>
                <div>
                  <Label htmlFor="localEnergyCost">Local Energy Cost (per kWh)</Label>
                  <Controller
                    name="localEnergyCost"
                    control={control}
                    render={({ field }) => <Input id="localEnergyCost" placeholder="Enter local energy cost" type="number" {...field} />}
                  />
                  {errors.localEnergyCost && <p className="text-red-500">{errors.localEnergyCost.message}</p>}
                </div>
                <div>
                  <Label htmlFor="energyConsumption">Energy Consumption (kWh)</Label>
                  <Controller
                    name="energyConsumption"
                    control={control}
                    render={({ field }) => <Input id="energyConsumption" placeholder="Enter energy consumption" type="number" {...field} />}
                  />
                  {errors.energyConsumption && <p className="text-red-500">{errors.energyConsumption.message}</p>}
                </div>
                <div>
                  <Label htmlFor="pdfUpload">PDF Upload for panel specifications</Label>
                  <Controller
                    name="pdfUpload"
                    control={control}
                    render={({ field }) => <Input id="pdfUpload" type="file" {...field} />}
                  />
                  {errors.pdfUpload && <p className="text-red-500">{errors.pdfUpload.message}</p>}
                </div>
                <Button type="submit" variant="primary">Calculate</Button>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
      </Tabs>

      
    </div>
  );
};

export default SolarCalculator;