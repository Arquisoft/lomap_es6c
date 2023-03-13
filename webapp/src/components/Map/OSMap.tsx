import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { addMarker } from "../../api/api";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  iconSize: [30, 30],
});

async function saveMarker(markerData: any) {
  await addMarker(markerData);
}

export function OSMap() {
  function addMarker(lat: number, lng: number) {
    const newMarker = { lat, lng };
    saveMarker(newMarker); // Llama a la función saveMarker para guardar el nuevo marcador en la base de datos.
  }

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon: markerIcon }).addTo(map);
        addMarker(lat, lng);
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "700px", borderRadius: "inherit" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
    </MapContainer>
  );
}
