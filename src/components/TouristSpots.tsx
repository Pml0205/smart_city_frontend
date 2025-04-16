import React, { useEffect, useState } from "react";
import { TouristSpot } from "../lib/types";
import { fetchTouristSpots } from "../data/api";

const TouristSpots: React.FC = () => {
  const [spots, setSpots] = useState<TouristSpot[]>([]);

  useEffect(() => {
    fetchTouristSpots().then(setSpots).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Tourist Attractions</h2>
      <ul className="space-y-2">
        {spots.map((spot) => (
          <li key={spot.id} className="border p-3 rounded shadow">
            <p className="text-lg font-bold">{spot.name}</p>
            <p>📍 Location: {spot.location}</p>
            {spot.description && <p className="text-sm text-gray-600 mt-1">{spot.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TouristSpots;
