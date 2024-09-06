import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:cityId" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
