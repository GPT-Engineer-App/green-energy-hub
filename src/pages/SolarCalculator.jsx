import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SolarCalculator = () => {
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

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Simple Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Placeholder for Simple Calculator</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Complex Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Placeholder for Complex Calculator</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Placeholder for Results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Placeholder for Recommendations</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default SolarCalculator;