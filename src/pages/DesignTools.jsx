import { Link } from 'react-router-dom';

const DesignTools = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Design Tools</h1>
      <Link to="/solar-panel-sizing-calculator" className="text-blue-500 hover:underline p-2 border border-blue-500 rounded transition duration-300 ease-in-out transform hover:scale-105">
        Solar Panel Sizing Calculator
      </Link>
    </div>
  );
};

export default DesignTools;