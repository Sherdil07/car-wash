// In App.js
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CarWashForm from "./CarWashForm";
import ServiceDashboard from "./ServiceDashboard";
import { ServicePriceProvider } from "./ServicePriceContext";
import Invoice from "./Invoice";
import "./App.css";

function App() {
  return (
    <ServicePriceProvider>
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/service-dashboard">Change Amount</Link>
            <Link to="/client-records">Client Records</Link>
          </nav>

          <Routes>
            <Route path="/" element={<CarWashForm />} />
            <Route path="/service-dashboard" element={<ServiceDashboard />} />
            <Route path="/invoice" element={<Invoice />} />{" "}
            {/* Add Invoice route */}
          </Routes>
        </div>
      </Router>
    </ServicePriceProvider>
  );
}

export default App;
