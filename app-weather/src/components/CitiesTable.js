import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './CitiesTable.css';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Fetch cities data
  const fetchCities = useCallback(async (pageNumber) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&page=${pageNumber}`
      );
      const cityData = response.data.records.map((city) => ({
        name: city.fields.name,
        country: city.fields.cou_name_en,
        timezone: city.fields.timezone,
        population: city.fields.population,
      }));

      setCities((prevCities) => [...prevCities, ...cityData]);
      setFilteredCities((prevCities) => [...prevCities, ...cityData]);
      setHasMore(response.data.records.length > 0);
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
    setLoading(false);
  }, [hasMore]);

  useEffect(() => {
    fetchCities(page);
  }, [page, fetchCities]);

  // Handle search input and filtering
  useEffect(() => {
    if (searchTerm) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  }, [searchTerm, cities]);

  // Handle sorting by columns
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedCities = [...filteredCities].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredCities(sortedCities);
  };

  // Custom styles for the city dropdown
  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#333', // Selected text is white, unselected is dark
      backgroundColor: state.isSelected ? '#007bff' : '#fff', // Selected background is blue
    }),
    singleValue: (provided) => ({
      ...provided,
      fontWeight: 'bold',
      color: '#007bff', // Dark blue color for the selected city
    }),
    label: (provided) => ({
      ...provided,
      color: '#2c3e50', // Dark color for the country name
    }),
  };

  // Autocomplete dropdown options
  const cityOptions = cities.map((city) => ({
    label: `${city.name}, ${city.country}`, // Display city and country
    value: city.name,
  }));

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    ) {
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Navigate to weather page
  const handleCityClick = (cityName) => {
    navigate(`/weather/${cityName}`);
  };

  return (
    <div className="container">
      <h2>City Table</h2>

      {/* Autocomplete Search */}
      <Select
        options={cityOptions}
        onChange={(option) => setSearchTerm(option ? option.value : '')}
        placeholder="Search city..."
        isClearable
        className="mb-3"
        styles={customSelectStyles} // Apply custom styles
      />

      {/* City Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City Name</th>
            <th onClick={() => handleSort('country')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
            <th onClick={() => handleSort('population')}>Population</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((city, index) => (
            <tr key={index}>
              <td
                className="city-name"
                onClick={() => handleCityClick(city.name)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  window.open(`/weather/${city.name}`, '_blank');
                }}
              >
                {city.name}
              </td>
              <td>{city.country}</td>
              <td>{city.timezone}</td>
              <td>{city.population}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Loading more cities...</p>}
      {!hasMore && <p>No more cities to load.</p>}
    </div>
  );
};

export default CitiesTable;
