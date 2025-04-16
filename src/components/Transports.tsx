import React, { useEffect, useState } from "react";
import { Transport } from "../lib/types";
import { fetchTransports } from "../data/api";

const Transports: React.FC = () => {
  const [transports, setTransports] = useState<Transport[]>([]);

  useEffect(() => {
    fetchTransports().then(setTransports).catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Transport Services</h2>
      <ul className="space-y-2">
        {transports.map((transport) => (
          <li key={transport.id} className="border p-3 rounded shadow">
            <p><strong>{transport.type}</strong></p>
            <p>🛣 Route: {transport.route}</p>
            <p>💸 Fare: ₹{transport.fare}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transports;
