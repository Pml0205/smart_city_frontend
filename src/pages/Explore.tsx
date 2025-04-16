import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import '../components/styles/Explore.css';
import { cities } from '../data/cityData';

// TypeScript interface for each entity
interface CityItem {
  id: number;
  name?: string;
  type?: string;
  description: string;
  image?: string;
  rating?: number;
  price?: number;
  fare?: number;
  address?: string;
}

const Explore = () => {
  const [selectedCity, setSelectedCity] = useState<number>(1); // Default to first city
  const [activeTab, setActiveTab] = useState<string>('hotels');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allItems, setAllItems] = useState<CityItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CityItem[]>([]);

  const BASE_URL = 'http://localhost:8080/api';

  const fetchData = useCallback(async () => {
    let endpoint = '';
    switch (activeTab) {
      case 'hotels':
        endpoint = `${BASE_URL}/hotels/city/${selectedCity}`;
        break;
      case 'places':
        endpoint = `${BASE_URL}/touristspots/city/${selectedCity}`;
        break;
      case 'restaurants':
        endpoint = `${BASE_URL}/restaurants/city/${selectedCity}`;
        break;
      case 'transport':
        endpoint = `${BASE_URL}/transport/city/${selectedCity}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setAllItems(data);
      filterItems(data, searchTerm);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllItems([]);
      setFilteredItems([]);
    }
  }, [selectedCity, activeTab, searchTerm]);

  const filterItems = (items: CityItem[], query: string) => {
    const lcQuery = query.toLowerCase();
    const filtered = items.filter(item =>
      item.name?.toLowerCase().includes(lcQuery) ||
      item.type?.toLowerCase().includes(lcQuery) ||
      item.description?.toLowerCase().includes(lcQuery)
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    filterItems(allItems, searchTerm);
  }, [searchTerm]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(Number(e.target.value));
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const getSelectedCityName = () => {
    const city = cities.find(city => city.id === selectedCity);
    return city ? city.name : 'Unknown City';
  };

  return (
    <>
      <Navbar />

      <div className="explore-container">
        <Sidebar 
          isVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className={`main-content ${sidebarVisible ? 'content-with-sidebar' : 'content-without-sidebar'}`}>
          <div className="city-selection">
            <h2>Select a City to Explore</h2>
            <select 
              className="city-selector" 
              value={selectedCity} 
              onChange={handleCityChange}
            >
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.country}
                </option>
              ))}
            </select>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            placeholder={`Search in ${activeTab}...`}
          />

          <h2 className="info-section-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} in {getSelectedCityName()}
          </h2>

          <div className="info-grid">
            {filteredItems.map(item => (
              <Card
                key={item.id}
                title={item.name || item.type || 'Untitled'}
                description={item.description}
                image={item.image || 'https://via.placeholder.com/300x200'} // Fallback image
                rating={item.rating ?? 0}
                buttonText={activeTab === 'transport' ? 'Details' : 'View'}
                onClick={() => {}}
              />
            ))}
            {filteredItems.length === 0 && (
              <p>No {activeTab} found for this search.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Explore;
