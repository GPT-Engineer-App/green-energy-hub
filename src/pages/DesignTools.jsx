import { Link } from 'react-router-dom';

const DesignTools = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">The page is coming soon.</h1>
      <Link to="/solar-panel-sizing-calculator" className="text-blue-500 hover:underline">
        Solar Panel Sizing Calculator
      </Link>
    </div>
  );
};

export default DesignTools;