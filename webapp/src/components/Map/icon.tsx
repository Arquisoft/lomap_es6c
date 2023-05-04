import L from "leaflet";

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    iconSize: [30, 30],
  });
  
export const getMarkerIcon = (type: string) => {
    switch (type) {
      case "restaurant":
        return L.icon({
          iconUrl:
            "https://img.icons8.com/color/512/restaurant-.png",
          iconSize: [30, 30],
        });
      case "monument":
        return L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/1321/1321018.png",
          iconSize: [30, 30],
        });
      case "landscape":
        return L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/2795/2795602.png",
          iconSize: [30, 30],
        });
      default:
        return markerIcon;
    }
};