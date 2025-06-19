import React, { useState } from "react";
import MapGL, { Marker } from "react-map-gl";


const bairrosBH = {
  "centro": { latitude: -19.920830, longitude: -43.937780 },
  "barreiro": { latitude: -19.977600, longitude: -44.013200 },
  "venda nova": { latitude: -19.816700, longitude: -43.954200 },
  "pampulha": { latitude: -19.850000, longitude: -43.950000 },
  "savassi": { latitude: -19.936800, longitude: -43.933300 },

};


const policeStations = [
  { id: 1, name: "Delegacia Centro", latitude: -19.920830, longitude: -43.937780 },
  { id: 2, name: "Delegacia Barreiro", latitude: -19.977600, longitude: -44.013200 },
  { id: 3, name: "Delegacia Venda Nova", latitude: -19.816700, longitude: -43.954200 },
  { id: 4, name: "Delegacia Pampulha", latitude: -19.850000, longitude: -43.950000 },
  { id: 5, name: "Delegacia Savassi", latitude: -19.936800, longitude: -43.933300 }
];

function geocodeBairro(address, callback) {
  const bairro = address.trim().toLowerCase();
  if (bairrosBH[bairro]) {
    callback(bairrosBH[bairro]);
  } else {
    alert("Bairro não encontrado. Tente outro nome.");
  }
}

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: -19.924500,
    longitude: -43.935200,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });
  const [address, setAddress] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    geocodeBairro(address, (coords) => {
      setUserLocation(coords);
      setViewport((v) => ({
        ...v,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    });
  };

  function getNearbyStations(userLoc) {
    if (!userLoc) return [];
    return policeStations.filter(
      (station) =>
        Math.abs(station.latitude - userLoc.latitude) < 0.03 &&
        Math.abs(station.longitude - userLoc.longitude) < 0.03
    );
  }

  const nearbyStations = getNearbyStations(userLocation);

  return (
    <div>
      <form
        id="form"
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          zIndex: 1,
          background: "#fff",
          padding: 10,
          left: "50%",
          top: 10,
          transform: "translateX(-50%)",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}
      >
        <input
          id="address"
          type="text"
          placeholder="Digite o nome do bairro"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Buscar</button>
      </form>
      <MapGL
        {...viewport}
        mapboxApiAccessToken="SUA_MAPBOX_TOKEN_AQUI"
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {userLocation && (
          <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
            <div style={{ color: "red" }}>Você</div>
          </Marker>
        )}
        {nearbyStations.map((station) => (
          <Marker key={station.id} latitude={station.latitude} longitude={station.longitude}>
            <div style={{ color: "blue" }}>{station.name}</div>
          </Marker>
        ))}
      </MapGL>
    </div>
  );
}