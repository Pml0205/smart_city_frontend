import React, { useEffect, useState } from "react";
import { Restaurant } from "../lib/types";
import { fetchRestaurants } from "../data/api";

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetchRestaurants().then(setRestaurants).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Restaurants</h2>
      <ul className="space-y-2">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="border p-3 rounded shadow">
            <p><strong>{restaurant.name}</strong></p>
            <p>🍽 Cuisine: {restaurant.cuisine || "Various"}</p>
            <p>📍 Address: {restaurant.address}</p>
            <p>⭐ Rating: {restaurant.rating} / 5</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurants;
