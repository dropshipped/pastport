import { useState } from "react";
import { api } from "~/utils/api";

export default function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const { data, refetch } = api.location.coordinateToCountry.useQuery(
    { lat: lat, lon: lon },
    {
      enabled: false,
    },
  );

  const handleSubmit = () => {
    refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      <input type="text" onChange={(e) => setLat(e.target.value)} value={lat} />
      <input type="text" onChange={(e) => setLon(e.target.value)} value={lon} />
      <button onClick={handleSubmit}>thank you andy</button>
      <p>{data}</p>
    </div>
  );
}
