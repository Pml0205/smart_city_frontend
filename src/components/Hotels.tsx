import React, { useEffect, useState } from "react";
import { Hotel } from "../lib/types";
import { fetchHotels } from "../data/api";

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    fetchHotels().then(setHotels).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Hotels</h2>
      <ul className="space-y-2">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="border p-3 rounded shadow">
            <p><strong>{hotel.name}</strong> — {hotel.city}</p>
            {hotel.address && <p>📍 {hotel.address}</p>}
            <p>⭐ Rating: {hotel.rating} / 5</p>
            <p>💰 Price/Night: ₹{hotel.pricePerNight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
